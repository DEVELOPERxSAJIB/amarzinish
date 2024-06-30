import { IoIosCheckmarkCircle } from "react-icons/io";
import "./SingleProduct.scss";
import { useState } from "react";

import { useEffect } from "react";

import { useParams } from "react-router-dom";
import AuctionTimer from "./../../components/Timer/AuctionTimer";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
} from "antd";
import { Skeleton } from "antd";
import timeUntil from "./../../components/Timer/TimerFunction";
import { alertMessage } from "./../../utils/Alerts/alertMessage";
import axios from "axios";
import { Select } from "antd";
import medal from "../../assets/images/emojione_1st-place-medal.png";
import {
  useAddNewBidMutation,
  useGetSingleBidByProductIdQuery,
} from "../../app/BidApi";
import { Link } from "react-router-dom";
import { useGetSingleProductQuery } from "../../app/ProductApi";
import Loader from "../../assets/images/gradient-5812_256.gif";
const SingleProduct = () => {
  const [form] = Form.useForm();
  const [funcLoading, setFuncLoading] = useState(false);
  const { id } = useParams();
  const [pendingAmount, setPendingAmount] = useState();
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [highBid, stHighBid] = useState(null);
  const userData = JSON.parse(localStorage.getItem("cognito_user"));

  const { data: bidList } = useGetSingleBidByProductIdQuery(id);
  const [productSingleThmb, setProductSingleThmb] = useState();
  const [addCustomClass, setAddCustomClass] = useState("");
  const handleSetThumbOnClick = (imageUrl) => {
    setProductSingleThmb(imageUrl);
    setAddCustomClass("custom-thumb-border");
  };
  const bkashNumberPattern =
    /^(019|018|015|016|013|017|\+88019|\+88018|\+88015|\+88017|\+88016|\+88013)\d{8}$/;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //=============handle payment
  const handlePayment = async (values) => {
    try {
      setFuncLoading(true);
      if (!bkashNumberPattern.test(values.bkashNumber)) {
        alertMessage({ type: "error", message: "Invalid bkash number." });
        setFuncLoading(false);
        return;
      }

      const bkashTokenResponse = await axios.post(
        "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-token",
        {
          app_key: import.meta.env.VITE_BKASH_APP_KEY,
          app_secret: import.meta.env.VITE_BKASH_APP_SECRET,
          username: import.meta.env.VITE_BKASH_USERNAME,
          password: import.meta.env.VITE_BKASH_PASSWORD,
        }
      );

      const bkashToken = bkashTokenResponse?.data?.id_token;
      if (!bkashToken) {
        alertMessage({
          type: "error",
          message: "Failed to retrieve Bkash token. Please try again.",
        });
        setFuncLoading(false);
        return;
      }

      const bkashPaidResponse = await axios.post(
        "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-payment",
        {
          amount: `${Number(data.price.N) + 200}`,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "MerchangtInvoiceNumber",
          payerReference: values.bkashNumber,
          merchantAssociationInfo: "MI05MID54RF09123456789",
          authorization: bkashToken,
          appKey: import.meta.env.VITE_BKASH_APP_KEY,
          callbackUrl: `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/paymentexecute?id_token=${bkashToken}&userId=${
            userData.sub
          }&productId=${id}&appKey=${
            import.meta.env.VITE_BKASH_APP_KEY
          }&type=buy`,
        }
      );

      const bkashURL = bkashPaidResponse?.data?.bkashURL;
      if (!bkashURL) {
        alertMessage({
          type: "error",
          message: "Failed to initiate Bkash payment. Please try again.",
        });
        setFuncLoading(false);
        return;
      }
      // Redirect the user to the Bkash payment URL
      window.location.href = bkashURL;
    } catch (error) {
      setFuncLoading(false);
      console.error("Error in handlePayment:", error);
      alertMessage({
        type: "error",
        message: "Please login!",
      });
    }
  };

  // handle biding
  const handleBid = async (values) => {
    try {
      setFuncLoading(true);

      // Check if all required fields are filled
      if (!values.bkashNumber || !values.price) {
        alertMessage({ type: "error", message: "All fields are required!" });
        setFuncLoading(false); // Set loading state to false
        return;
      }


      if (Number(values.price) <= Number(data.price.N)) {
        alertMessage({
          type: "error",
          message: "Price must be greater than the original price",
        });
        setFuncLoading(false); // Set loading state to false
        return;
      }
      console.log(highBid)
      if (highBid && Number(values.price) <= Number(highBid.amount.N)) {
        alertMessage({
          type: "error",
          message: "Price must be greater than the high bid.",
        });
        setFuncLoading(false); // Set loading state to false
        return;
      }



      const bkashNumberPattern = /^\+?(88)?01[3-9]\d{8}$/; // Example pattern, adjust as needed
      if (!bkashNumberPattern.test(values.bkashNumber)) {
        alertMessage({ type: "error", message: "Invalid Bkash number." });
        setFuncLoading(false); // Set loading state to false
        return;
      }

      // Fetch Bkash token
      const bkashTokenResponse = await axios.post(
        "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-token",
        {
          app_key: import.meta.env.VITE_BKASH_APP_KEY,
          app_secret: import.meta.env.VITE_BKASH_APP_SECRET,
          username: import.meta.env.VITE_BKASH_USERNAME,
          password: import.meta.env.VITE_BKASH_PASSWORD,
        }
      );

      const bkashToken = bkashTokenResponse?.data?.id_token;

      if (!bkashToken) {
        alertMessage({
          type: "error",
          message: "Failed to retrieve Bkash token. Please try again.",
        });
        setFuncLoading(false); // Set loading state to false
        return;
      }

      // Initiate Bkash payment
      const bkashPaidResponse = await axios.post(
        "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-payment",
        {
          amount: `${Number(values.price) + 200}`, // Adjust amount calculation as needed
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: "merchantInvoiceNumber", // Provide a meaningful invoice number
          payerReference: values.bkashNumber,
          merchantAssociationInfo: "MI05MID54RF09123456789", // Adjust as per your integration
          authorization: bkashToken,
          appKey: import.meta.env.VITE_BKASH_APP_KEY,
          callbackUrl: `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/paymentexecute?id_token=${bkashToken}&userId=${
            userData.sub
          }&productId=${id}&appKey=${
            import.meta.env.VITE_BKASH_APP_KEY
          }&type=bid`,
        }
      );

      const bkashURL = bkashPaidResponse?.data?.bkashURL;

      if (!bkashURL) {
        alertMessage({
          type: "error",
          message: "Failed to initiate Bkash payment. Please try again.",
        });
        setFuncLoading(false); // Set loading state to false
        return;
      }

      // Redirect to Bkash payment URL
      window.location.href = bkashURL;
    } catch (error) {
      setFuncLoading(false); // Set loading state to false
      alertMessage({
        type: "error",
        message: "Please login!", // Adjust error message as needed
      });
    }
  };

  // demo product
  const productDetails = {
    images: [
      {
        public_id: 1,
        url: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2019/05/OnePlus-7-Pro-Nebula-Blue-02.jpg",
      },
      {
        public_id: 2,
        url: "https://cdn.opstatics.com/store/20170907/assets/images/events/2019/04/18821/highlight/kv-static-m.jpg?20240408095832",
      },
      {
        public_id: 3,
        url: "https://www.techwelike.com/wp-content/uploads/2019/06/OnePlus-7-Pro-Nebula-Back-scaled.jpg",
      },
      {
        public_id: 4,
        url: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201906/OnePlus_7_Pro_Almond.png?VersionId=sgMGlVR8IE2csywe7tGVkAh5BCGOJMBt&size=690:388",
      },
    ],
  };
  //========response status and alert

  useEffect(() => {
    if (bidList?.length > 0) {
      const highestBidPrice = Math.max(
        ...bidList.map((item) => parseFloat(item?.price?.N))
      );
      const highestBid = bidList.find(
        (item) => parseFloat(item?.price?.N) === highestBidPrice
      );
      stHighBid(highestBid);
    }
  }, [bidList]);
  const [showMore, setShowMore] = useState(false);

  // Function to handle "See more" click
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Function to truncate text to a certain length
  const truncateText = (text, maxLength = 300) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    const findSinglePayment = async () => {
      const paymentData = await axios.get(
        `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/singlePaymentWithProductId?userId=${userData.sub}&productId=${id}`
      );
      console.log(paymentData);
      setPendingAmount(paymentData?.data);
    };
    findSinglePayment();
  }, [id, userData?.sub]);

  if (isLoading) {
    return (
      <div
        style={{ height: "85vh" }}
        className="d-flex w-100 container justify-content-center align-items-center"
      >
        <img style={{width:"200px"}} src={Loader} alt="" />
      </div>
    );
  }
  return (
    <>
      <div className="single-product-main">
        <div className="container">
          {pendingAmount?.status?.S === "pending" && (
            <Link
              className="mt-3 h5 text-danger d-inline-block "
              to={`/payment-success/${pendingAmount?.trxId?.S}?type=${pendingAmount?.type?.S}`}
            >
              Please complete your{" "}
              {pendingAmount?.type?.S === "bid" ? "Biding" : "Order"} click here
            </Link>
          )}
          {data?.type?.S === "auction" ? (
            <div className="row">
              <div className="large-price-sec">
                <h4 style={{ color: "white" }}>
                  ৳
                  {bidList?.some((item) => item?.userId?.S === userData?.sub)
                    ? bidList.find((item) => item?.userId?.S === userData?.sub)
                        .price?.N
                    : data?.price?.N}
                </h4>

                {bidList?.some((item) => item?.userId?.S === userData?.sub) ? (
                  <p
                    style={{
                      color: "white",
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Bid Done
                  </p>
                ) : timeUntil(data?.date?.S) > 0 ? (
                  <button onClick={showModal}>BID NOW</button>
                ) : (
                  <h4>Bid over</h4>
                )}
              </div>
              <Modal
                title="Placing Order"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
                className="my-3"
              >
                <Divider />

                <Form form={form} layout="vertical" onFinish={handleBid}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Your Biding Price" name="price">
                        <Input type="number" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Your Bkash Number" name="bkashNumber">
                        <Input type="text" />
                      </Form.Item>
                    </Col>

                    <Col
                      span={24}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#DA4F31",
                            boxShadow: "0",
                          },
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          className="ant-btn ant-btn-primary primary"
                        >
                          {funcLoading ? "...Wait please" : "BID NOW"}
                        </Button>
                      </ConfigProvider>
                    </Col>
                  </Row>
                </Form>
              </Modal>
            </div>
          ) : (
            <div className="row">
              <div className="large-price-sec">
                <h4>৳{data?.price?.N}</h4>
                <button onClick={showModal}> BUY NOW</button>
              </div>
              <Modal
                title="Placing Order"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer={null}
                className="my-3"
              >
                <Divider />

                <Form form={form} layout="vertical" onFinish={handlePayment}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Your Bkash Number" name="bkashNumber">
                        <Input placeholder="you bkash number" />
                      </Form.Item>
                    </Col>
                    <Col
                      span={24}
                      className="d-flex flex-column align-items-center justify-content-center"
                    >
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#DA4F31",
                            boxShadow: "0",
                          },
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Inter",
                            fontSize: "16px",
                            fontWeight: "700",
                            lineHeight: "19.36px",
                            textAlign: "left",
                          }}
                          className="text-center text-bold m-1"
                        >
                          Pay with bkash online. Delivery charge extra 200 BDT
                        </p>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          className="ant-btn ant-btn-primary primary"
                        >
                          {funcLoading
                            ? "...Wait please"
                            : `BKASH NOW ${Number(data?.price?.N) + 200} Taka`}
                        </Button>
                      </ConfigProvider>
                    </Col>
                  </Row>
                </Form>
              </Modal>
            </div>
          )}

          <div className="row">
            <div className="product">
              <div className="product-gallery">
                <div className="row">
                  <div className=" product-img mb-1">
                    <div className="lightbox">
                      <img
                        src={
                          productSingleThmb
                            ? productSingleThmb
                            : data?.images?.SS[0]
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {data?.images.SS?.map((image) => {
                    return (
                      <div key={image.public_id} className="col-3 mt-3">
                        <img
                          src={image}
                          alt={productDetails.title}
                          className={`active w-100 thub-image ${
                            productSingleThmb === image ? addCustomClass : ""
                          }`}
                          onClick={() => handleSetThumbOnClick(image)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="product-Description">
                {data?.type.S === "auction" && (
                  <AuctionTimer
                    endDate={data?.date?.S}
                    highestBid={highBid ?? {}}
                  />
                )}
                <h4>{data?.title?.S}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: showMore
                      ? data?.details?.S
                      : truncateText(data?.details?.S),
                  }}
                />
                {data?.details?.S?.length > 300 && (
                  <a className=" nav-link" href="#" onClick={toggleShowMore}>
                    {showMore ? "See less" : "See more"}
                  </a>
                )}
              </div>
            </div>
          </div>
          {data?.type.S === "auction" && (
            <div className="row">
              <h1 style={{ marginRight: "auto", textAlign: "center" }}>
                All Bidders
              </h1>
              <div className="bid-main">
                <div className="bid-message">
                  {bidList?.length > 0 ? (
                    bidList?.map((bid, index) => {
                      return (
                        <div key={index} className="item">
                          <div className="item-icon-area">
                            <img
                              style={{
                                width: "54px",
                                height: "54px",
                                borderRadius: "100%",
                                opacity:
                                  highBid &&
                                  highBid?.userId?.S === bid?.userId?.S
                                    ? "1"
                                    : "0",
                              }}
                              src={medal}
                              alt="medal"
                            />

                            <img
                              style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "100%",
                              }}
                              src={
                                bid?.imgUrl
                                  ? bid?.imgUrl?.S
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
                              }
                              alt={bid?.name?.S.slice(0, 2)}
                            />

                            <span>{bid?.name?.S}</span>
                          </div>
                          <h6
                            style={{
                              marginLeft: "auto",
                              textWrap: "no-wrap",
                              color: "#01AB31",
                              fontSize: "22px",
                            }}
                          >
                            Bidded for ৳ {bid?.amount?.N}
                          </h6>
                        </div>
                      );
                    })
                  ) : (
                    <p>No one bid yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="tips-main">
              <h4>Tips</h4>
              <div className="tips-message">
                <div className="item">
                  <div className="item-icon-area">
                    <IoIosCheckmarkCircle
                      className="item-icon"
                      color="#000000"
                    />
                  </div>
                  <span>
                    When you will receive the parcel then of course make an
                    uncut video
                  </span>
                </div>
                <div className="item">
                  <div className="item-icon-area">
                    <IoIosCheckmarkCircle
                      className="item-icon"
                      color="#000000"
                    />
                  </div>
                  <span>
                    Never try to find the seller because everything we are will
                    handle
                  </span>
                </div>
                <div className="item">
                  <div className="item-icon-area">
                    <IoIosCheckmarkCircle
                      className="item-icon"
                      color="#000000"
                    />
                  </div>
                  <span>Never pay outside from this amarzinish.com</span>
                </div>
                <div className="item">
                  <div className="item-icon-area">
                    <IoIosCheckmarkCircle
                      className="item-icon"
                      color="#000000"
                    />
                  </div>
                  <span>
                    If you don’t like the product then just return that
                    instantly and sends us the uncut video that you made at
                    first and will refund you
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="bottom-buy-btn">
              {data?.type?.S === "auction" ? (
                bidList?.some((item) => item?.name?.S === userData?.name) ? (
                  <p
                    style={{
                      color: "black",
                      fontSize: "22px",
                      marginTop: "10px",
                    }}
                  >
                    Already bided
                  </p>
                ) : timeUntil(data?.date?.S) > 0 ? (
                  <button onClick={showModal}>BID NOW</button>
                ) : (
                  <h4>Bid over</h4>
                )
              ) : (
                <button onClick={showModal}>Buy Now</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
