import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { alertMessage } from "./../../utils/Alerts/alertMessage";
import {
  useGetSingleProductQuery,
  useEditStatusMarkProductMutation,
} from "../../app/ProductApi";
import {
  useAddNewBidMutation,
  useGetSingleBidByProductIdQuery,
} from "../../app/BidApi";
import { useAddNewOrderMutation } from "../../app/OrderApi";
import { Col, ConfigProvider, Form, Input, Select, Row, Card } from "antd";
import Loader from "../../assets/images/gradient-5812_256.gif";
const PaymentSuccess = () => {
  const [seconds, setSeconds] = useState(600); // 10 minutes in seconds
  const [timeLeft, setTimeLeft] = useState("10:00"); // Initial display format

  useEffect(() => {
    const timer = setInterval(() => {
      // Decrease the seconds every second
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Convert remaining seconds to 'MM:SS' format for display
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setTimeLeft(
      `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`
    );

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [seconds]);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [allCity, setAllCity] = useState([]);
  const [allCityZone, setAllCityZone] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate();

  const { data: bidList } = useGetSingleBidByProductIdQuery(
    paymentData?.productId?.S
  );
  const { data, isLoading, isError } = useGetSingleProductQuery(
    paymentData?.productId?.S
  );
  const [highBid, setHighBid] = useState(null);

  // Function to handle bKash refund
  const bkashRefund = async () => {
    try {
      setLoading(true);

      // Make the POST request to initiate the refund
      await axios.post(
        "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-refund",
        {
          amount: paymentData?.amount.N,
          paymentID: paymentData?.paymentId.S,
          trxID: paymentData?.trxId.S,
          sku: "bkashRefundsku",
          reason: "Nothing",
          authorization: idToken,
          appKey: import.meta.env.VITE_BKASH_APP_KEY,
        }
      );

      // If the refund request is successful, update the payment status
      await axios.put(
        `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/payments/${paymentData?.paymentId?.S}`,
        { status: "refund" }
      );

      // Set loading to false and navigate
      setLoading(false);
      navigate("/");
    } catch (error) {
      // Handle errors
      console.error(
        `Error: ${error.response ? error.response.data : error.message}`
      );
      setLoading(false); // Ensure loading is stopped in case of error
    }
  };

  // Mutation hooks for API operations
  const [editStatusMarkProduct] = useEditStatusMarkProductMutation();
  const [addNewOrder, { isLoading: isOrderLoading, isSuccess }] =
    useAddNewOrderMutation();
  const [addNewBid, { isLoading: isBidLoading, isSuccess: isBiddingSuccess }] =
    useAddNewBidMutation();

  // Regular expression for bKash number validation
  const bkashNumberPattern =
    /^(019|018|015|016|013|017|\+88019|\+88018|\+88015|\+88017|\+88016|\+88013)\d{8}$/;

  // Function to handle order submission
  const handleOrder = async (values) => {
    try {
      if (
        !values.address ||
        !values.phone ||
        !values.city ||
        !values.name ||
        !values.zone
      ) {
        alertMessage({ type: "error", message: "All fields are required" });
      } else if (!userData?.sub || !id) {
        alertMessage({
          type: "error",
          message: "Please login or reload the page!",
        });
      } else if (values.address.length < 10) {
        alertMessage({
          type: "error",
          message: "Address must be at least 10 characters long.",
        });
      } else if (!bkashNumberPattern.test(values.phone)) {
        alertMessage({ type: "error", message: "Invalid phone number." });
      } else {
        if (type === "buy") {
          axios
            .post(
              "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/create-order",
              {
                store_id: import.meta.env.VITE_APP_PATHAO_STORE_ID,
                recipient_name: values.name,
                recipient_phone: values.phone,
                recipient_address: values.address,
                recipient_city: values.city,
                recipient_zone: values.zone,
                delivery_type: 48,
                item_type: 2,
                item_quantity: 1,
                item_weight: 0.5,
                amount_to_collect: 0,
                access_token: accessToken,
              }
            )
            .then((res) => {
              const orderData = {
                imgUrl: data.images.SS[0],
                title: data.title.S,
                price: data.price.N,
                productId: paymentData?.productId?.S,
                address: values.address,
                userId: userData.sub,
                amount: paymentData?.amount?.N,
                trxId: paymentData?.trxId?.S,
                consignment_id: res?.data?.data?.data?.consignment_id,
              };
              addNewOrder(orderData);
              editStatusMarkProduct({
                productId: paymentData?.productId?.S,
                mark: "sold",
              });
            })
            .catch((error) => {
              console.error("Error creating order:", error);
            });
        } else if (type === "bid") {
          if (highBid?.paymentId?.S&&highBid?.amount?.N) {
            await axios.post(
              "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-refund",
              {
                amount: highBid.amount.N,
                paymentID: highBid.paymentId.S,
                trxID: highBid.trxId.S,
                sku: "bkashRefundsku",
                reason: "Nothing",
                authorization: idToken,
                appKey: import.meta.env.VITE_BKASH_APP_KEY,
              }
            ).then(async()=>{
              await axios.put(
                `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/payments/${highBid?.paymentId?.S}`,
                { status: "refund" }
              );
            });
          }

          const orderData = {
            imgUrl: data.images.SS[0],
            title: data.title.S,
            price: data.price.N,
            productId: paymentData?.productId?.S,
            address: values.address,
            userId: userData.sub,
            amount: paymentData?.amount?.N,
            trxId: paymentData?.trxId?.S,
            consignment_id: "",
          };

          await addNewOrder(orderData);

          await editStatusMarkProduct({
            productId: paymentData?.productId?.S,
            mark: "bided",
          });
          await addNewBid({
            productId: paymentData?.productId.S,
            userId: userData?.sub,
            amount: paymentData?.amount?.N,
            imgUrl: userData?.picture,
            name: userData?.name,
            price: data?.price?.N,
            paymentId: paymentData?.paymentId?.S,
          });
        } else {
          console.error("Unknown order type:", type);
          alertMessage({ type: "error", message: "Please reload." });
        }
      }
    } catch (error) {
      console.error("Error in handleOrder:", error);
      alertMessage({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  // Function to retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("cognito_user"));

  // Effect hook to fetch transaction/payment data
  useEffect(() => {
    const getTrxPayment = async () => {
      try {
        const trxData = await axios.get(
          `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/singlepayment?trxId=${id}&userId=${userData.sub}`
        );
        setPaymentData(trxData?.data ?? null);
      } catch (error) {
        console.error("Error fetching transaction/payment data:", error);
      }
    };
    getTrxPayment();
  }, []);

  // Effect hook to fetch city data and bKash token
  useEffect(() => {
    const getAllCity = async () => {
      try {
        const pathaoTokenResponse = await axios.post(
          "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/token-pathao",
          {
            client_id: import.meta.env.VITE_APP_PATHAO_CLIENT_ID,
            client_secret: import.meta.env.VITE_APP_PATHAO_CLIENT_SECRET,
            username: import.meta.env.VITE_APP_PATHAO_CLIENT_EMAIL,
            password: import.meta.env.VITE_APP_PATHAO_CLIENT_PASSWORD,
            grant_type: "password",
          }
        );

        setAccessToken(pathaoTokenResponse.data.access_token);

        const cityResponse = await axios.get(
          `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/pathao-city?access_token=${pathaoTokenResponse.data.access_token}`
        );
        setAllCity(cityResponse.data.data);
      } catch (error) {
        console.error("Error fetching city data or bKash token:", error);
      }

      try {
        const bkashTokenResponse = await axios.post(
          "https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/bkash-token",
          {
            app_key: import.meta.env.VITE_BKASH_APP_KEY,
            app_secret: import.meta.env.VITE_BKASH_APP_SECRET,
            username: import.meta.env.VITE_BKASH_USERNAME,
            password: import.meta.env.VITE_BKASH_PASSWORD,
          }
        );
        setIdToken(bkashTokenResponse.data.id_token);
      } catch (error) {
        console.error("Error fetching bKash token:", error);
      }
    };
    getAllCity();
  }, []);

  // Effect hook to handle success message and navigate after successful order submission
  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (isSuccess) {
        try {
          if (paymentData?.paymentId?.S) {
            await axios.put(
              `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/payments/${paymentData.paymentId.S}`,
              { status: "complete" }
            );
            alertMessage({
              type: "success",
              message: "Order successfully done!",
            });
            navigate("/");
          } else {
            console.error("Invalid payment data:", paymentData);
            alertMessage({
              type: "error",
              message: "Invalid payment data. Please try again.",
            });
          }
        } catch (error) {
          console.error("Error updating payment status:", error);
          alertMessage({
            type: "error",
            message:
              "An error occurred while updating payment status. Please try again.",
          });
        }
      }
    };

    updatePaymentStatus();
  }, [isSuccess, navigate, paymentData]);

  // Effect hook to fetch and set the highest bid data
  useEffect(() => {
    const fetchHighBidder = async () => {
      try {
        if (Array.isArray(bidList) && bidList.length > 0) {
          const highPrice = Math.max(
            ...bidList.map((item) => Number(item?.price?.N))
          );
          const highBidPayment = bidList.find(
            (item) => Number(item?.price?.N) === highPrice
          );

          if (
            highBidPayment &&
            highBidPayment?.paymentId?.S &&
            paymentData?.productId?.S
          ) {
            const highBidResponse = await axios.get(
              `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/singlebidder`,
              {
                params: {
                  paymentId: highBidPayment.paymentId.S,
                  productId: paymentData?.productId.S,
                },
              }
            );
            setHighBid(highBidResponse?.data ?? null);
          } else {
            setHighBid(null);
          }
        } else {
          setHighBid(null);
        }
      } catch (error) {
        console.error("Error fetching highest bid:", error);
        setHighBid(null);
      }
    };

    fetchHighBidder();
  }, [bidList, paymentData]);

  // Function to handle city change and fetch corresponding zones
  const onCityChange = async (value) => {
    try {
      const cityZoneResponse = await axios.get(
        `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/pathao-city-zone?access_token=${accessToken}&cityId=${value}`
      );
      setAllCityZone(cityZoneResponse.data.data.data);
    } catch (error) {
      console.error("Error fetching city zones:", error);
    }
  };

  // Ant Design Select component filtering options
  const filterOption = (input, option) =>
    option?.label.toLowerCase().includes(input.toLowerCase());

  // Render loading skeletons while data is being fetched
  useEffect(() => {
    const refundAfterDelay = () => {
      console.log("Refund initiated after 10 seconds");
    };

    const timeoutId = setTimeout(refundAfterDelay, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Show alert after 10 seconds
      alertMessage({
        type: "error",
        message: "Time is over for form submission refunded your amount",
      });
      // Navigate to home page
      bkashRefund();
      navigate("/");
    }, 60000);

    // Clean up the timeout if component unmounts before 10 seconds
    return () => clearTimeout(timeoutId);
  }, [navigate, bkashRefund]);
  if (isLoading) {
    return (
      <div className="d-flex container justify-content-center align-items-center">
        <img style={{ width: "200px" }} src={Loader} alt="" />
      </div>
    );
  }
  return (
    <div className="container">
      <Card className="my-5 border-0 text-danger text-capitalize bold">
        for {type === "buy" ? "Order" : "Biding"} complete you have {timeLeft}
      </Card>
      <Card
        bordered
        className="p-4"
        title="Complete form"
        extra={
          <Card bordered>
            <button onClick={bkashRefund} className="btn btn-danger">
              {type === "buy" ? "Cancel Order" : "Cancel Bid"}
              {loading && "...wait please"}
            </button>
          </Card>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleOrder}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Your name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Your phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Your address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter your address" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please select a city" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a city"
                  onChange={onCityChange}
                  filterOption={filterOption}
                  options={allCity.map((item) => ({
                    value: item.city_id,
                    label: item.city_name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="City zone"
                name="zone"
                rules={[{ required: true, message: "Please select a zone" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a zone"
                  filterOption={filterOption}
                  options={allCityZone.map((item) => ({
                    value: item.zone_id,
                    label: item.zone_name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <ConfigProvider
                theme={{ token: { colorPrimary: "#DA4F31", boxShadow: "0" } }}
              >
                <button type="submit" className="btn btn-success">
                  Confirm your Order
                </button>
              </ConfigProvider>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
