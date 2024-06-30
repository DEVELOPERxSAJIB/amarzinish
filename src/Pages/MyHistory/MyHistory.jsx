import { alertMessage } from "./../../utils/Alerts/alertMessage";
import { useEffect } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import "./MyHistory.scss";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import { useAddNewProductMutation } from "../../app/ProductApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { AiOutlineClose } from "react-icons/ai";
import OrderStatus from "./../../components/Order/OrderStatus";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { useGetUserBidsQuery } from "../../app/BidApi";

const MyHistory = () => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data: bidList } = useGetUserBidsQuery(userData?.sub);
  const [form] = Form.useForm();
  const [addNewProduct, { isSuccess, isLoading, isError }] =
    useAddNewProductMutation();
  const [activeTab, setActiveTab] = useState("pills-account");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);

  const [fileList, setFileList] = useState([]);
  console.log(fileList);
  const [sellingProduct, setSellingProduct] = useState([]);
  const [buyingProduct, setBuyingProduct] = useState([]);
  const [content, setContent] = useState("");
  const [typeData, setTypeData] = useState("");
  const [date, setDate] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProductData = async (values) => {
    try {
      if(!values.title||!values.price ||!values.category||!values.type ||!content ||!values.location ||!values.phone ||!values.bkash){
        alertMessage({type:"error",message:"All fields are required!"})
        return;
      }
      const images = imagesUrl.join(",");
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : null;
      const payload = {
        title: values.title,
        category: values.category,
        type: values.type,
        price: values.price,
        location: values.location,
        phone: values.phone,
        userId: userData?.sub,
        images: images,
        bkash: values.bkash,
      };
      if (values.type === "auction") {
        payload.date = formattedDate;
      }
      if (content) {
        payload.details = content;
      }

      if (!userData) {
        alertMessage({ type: "error", message: "Please login" });
        return;
      }
      if(imagesUrl?.length>0){
        payload.images = images;
        await addNewProduct(payload);
        alertMessage({
          type: "success",
          message: "Product added successfully!",
        });
      }else{
        alertMessage({
          type: "error",
          message: "Images not uploaded yet!",
        });
        return;
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handlePreview = async (file) => {
    setFileList(fileList?.filter((item) => item !== file));
    setImagesUrl(imagesUrl?.filter((item) => item !== file));
  };
  const apiKey = import.meta.env.VITE_AWS_ACCESS_KEY;
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: apiKey,
      secretAccessKey: secretKey,
    },
  });

  const uploadImages = async (files) => {
    try {
      const uploadedImageUrls = [];

      for (const file of files) {
        const joinedFileName = file.name;

        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file);

        const params = {
          Bucket: "amarjinisimages",
          Key: `images/${joinedFileName}`,
          Body: file,
        };

        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        console.log(response);

        const imageUrl = `https://amarjinisimages.s3.eu-north-1.amazonaws.com/${params.Key}`;
        uploadedImageUrls.push(imageUrl);
      }
      setImagesUrl((prev) => [...prev, ...uploadedImageUrls]);
    setFileList((prev) => [...prev, ...uploadedImageUrls]); 
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const handleChange = async (e) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    console.log(files);
    if (files?.length > 0) {
      await uploadImages(files);
    }
  };
  const handleTypeChange = (value) => {
    setTypeData(value);
  };
  const onChange = (date, dateString) => {
    setDate(dateString);
  };
  useEffect(() => {
    if (isError) {
      alertMessage({ type: "error", message: "Something wrong" });
      setIsModalOpen(false);
    }
    if(isSuccess){
      setIsModalOpen(false)
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellingProductResponse = await axios.get(
          `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/productbyuser?userId=${userData.sub}`
        );

        setSellingProduct(sellingProductResponse.data);

        const buyingProductResponse = await axios.get(
          `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/singleuserorder?userId=${userData.sub}`
        );
        setBuyingProduct(buyingProductResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error: set state variables, show error message, etc.
      }
    };

    fetchData();
  }, [userData.sub]);

  useEffect(() => {
    const geAllUseEffect = async () => {
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
    };
    geAllUseEffect();
  }, []);
  return (
    <div className="myhistory-main">
      <div className="container">
        <div className="row history-top">
          <div className="d-flex justify-content-between">
            <h2>Hi {userData?.name}</h2>
            <div className="create-add text-end">
              <button onClick={showModal}>Create Your Add</button>
            </div>
          </div>
          <Modal
            title="Post Your Own Add"
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            footer={null}
            className="my-3"
          >
            <Divider />

            <Form form={form} layout="vertical" onFinish={handleProductData}>
              <Row gutter={16}>
                <Col span={"24"}>
                  <Form.Item label="Product Title" name="title">
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={"24"}>
                  <Form.Item label="Category" name="category">
                    <Select placeholder="Select a category">
                      <Option value="mobile">Mobile</Option>
                      <Option value="laptop">Laptop</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={"24"}>
                  <Form.Item label="Product Type" name="type">
                    <Select
                      onChange={handleTypeChange}
                      placeholder="Select a type"
                    >
                      <Option value="fixed">Fixed</Option>
                      <Option value="auction">Auction</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={"24"}>
                  {typeData === "auction" && (
                    <Form.Item label="Expire date" name="date">
                      <DatePicker className="w-100" onChange={onChange} />
                    </Form.Item>
                  )}
                </Col>
                <Col span={24}>
                  <Form.Item label="Price" name="price">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Product details" name="photos">
                    <ReactQuill
                      className="h-100"
                      theme="snow"
                      value={content}
                      onChange={setContent}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Upload Photo" name="photos">
                    <div className="d-flex gap-4 my-5">
                      {fileList.map((item, index) => {
                        return (
                          <div style={{ position: "relative",cursor:"pointer" }} key={index}>
                            <Image
                              style={{ width: "100px", height: "100px" }}
                              key={index}
                              src={item}
                            />

                            <span
                              style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "white",
                              }}
                              onClick={() => handlePreview(item)}
                            >
                              <AiOutlineClose style={{color:"red"}} className="fs-3 text-danger" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <input type="file" onChange={handleChange} multiple />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Pickup Location" name="location">
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Your Phone Number" name="phone">
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Your Bkash Number" name="bkash">
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col span={24} className="d-flex justify-content-center">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#000",
                        boxShadow: "0",
                        borderRadius: "62px",
                        colorPrimaryHover: "#333", // Hover state color
                        colorPrimaryActive: "#555", // Active state color
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="ant-btn ant-btn-primary primary"
                    >
                      {isLoading ? "Wait please..." : "POST"}
                    </Button>
                  </ConfigProvider>
                </Col>
              </Row>
            </Form>
          </Modal>

          <div className="money-box col-md-4 col-lg-4 col-sm-12">
            <div className="box-item">
              <h3 style={{ display: "flex" }}>
                ৳
                {sellingProduct?.length > 0
                  ? sellingProduct
                      ?.filter((item) => item?.mark?.S === "sold")
                      .reduce(
                        (total, item) => total + parseFloat(item?.price?.N),
                        0
                      )
                  : 0}
              </h3>
              <p>Total Earned</p>
            </div>
            <div className="box-item">
              <h3 style={{ display: "flex" }}>
                ৳
                {bidList?.length > 0
                  ? bidList?.reduce(
                      (total, item) =>
                        total + (parseFloat(item?.price?.N) || 0),
                      0
                    )
                  : 0}
              </h3>
              <p>Pending</p>
            </div>
            <div className="box-item">
              <h3 style={{ display: "flex" }}>
                ৳
                {buyingProduct?.length > 0
                  ? buyingProduct?.reduce(
                      (total, item) => total + parseFloat(item.amount?.N),

                      0
                    )
                  : 0}
              </h3>
              <p>Spend</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="title">
            <h2>All buying & Selling items</h2>
          </div>

          <div className="row custome-tabs">
            <div className="col-md-12">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-account-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-account"
                    type="button"
                    role="tab"
                    aria-controls="pills-account"
                    aria-selected={activeTab === "pills-account" ? true : false}
                    onClick={() => setActiveTab("pills-account")}
                  >
                    <i className="ti ti-user-check ti-xs me-1" />
                    Buying items
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-security-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-security"
                    type="button"
                    role="tab"
                    aria-controls="pills-security"
                    aria-selected={
                      activeTab === "pills-security" ? true : false
                    }
                    onClick={() => setActiveTab("pills-security")}
                  >
                    <i className="ti ti-lock ti-xs me-1" />
                    Selling items
                  </button>
                </li>
              </ul>

              {/* Tab Data */}
              <div className="tab-content" id="pills-tabContent">
                {/* First Tab */}

                <div
                  className={`tab-pane fade ${
                    activeTab === "pills-account" ? "show active" : ""
                  }`}
                  id="pills-accoutn"
                  role="tabpanel"
                  aria-labelledby="pills-accoutn-tab"
                >
                  <div className="row mt-5">
                    {buyingProduct.length > 0 ? (
                      buyingProduct.map((item, index) => {
                        return (
                          <div key={index} className="product-list">
                            <div className="product-item">
                              <div className="img-area">
                                <img
                                  src={
                                    item?.imgUrl?.S
                                      ? item?.imgUrl?.S
                                      : "https://feeds.abplive.com/onecms/images/uploaded-images/2023/03/03/0af5fdd4c5c249f6424bc3d03b4f8b1f1677826064753402_original.jpg"
                                  }
                                  alt=""
                                />
                              </div>

                              <div className="details-area">
                                <div className="left-area">
                                  <h3 className="name">{item?.title?.S}</h3>
                                  {item?.consignment_id?.S?.length >= 2 ? (
                                    <OrderStatus
                                      consignmentId={item.consignment_id?.S}
                                      accessToken={accessToken}
                                    />
                                  ) : (
                                    <p className="text-warning">You bided</p>
                                  )}

                                  <p className="price">
                                    Original Product Price {item?.price?.N}
                                  </p>
                                  <p className="currier">& Currier fee ৳200</p>
                                  <p className="total">{item?.amount?.N}</p>
                                </div>

                                <div className="right-area">
                                  {item.consignment_id?.S.length > 5 && (
                                    <Link
                                      to={`/order-status/${item?.consignment_id?.S}`}
                                    >
                                      Order status
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="">No buying items</p>
                    )}
                  </div>
                </div>

                {/* Second Tab */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "pills-security" ? "show active" : ""
                  }`}
                  id="pills-security"
                  role="tabpanel"
                  aria-labelledby="pills-security-tab"
                >
                  <div className="row mt-3">
                    <div className="alert text-danger text-center">
                      Remember if you cancel more 3 items then you will benned
                      and you can’t sell anymore product here
                    </div>
                    {sellingProduct.length > 0 ? (
                      sellingProduct.map((item, index) => {
                        return (
                          <div key={index} className="product-list">
                            <div className="product-item">
                              <div className="img-area">
                                <img
                                  src={
                                    item?.images?.SS[0]
                                      ? item?.images?.SS[0]
                                      : "https://feeds.abplive.com/onecms/images/uploaded-images/2023/03/03/0af5fdd4c5c249f6424bc3d03b4f8b1f1677826064753402_original.jpg"
                                  }
                                  alt=""
                                />
                              </div>

                              <div className="details-area">
                                <div className="left-area">
                                  <h3 className="name">{item?.title?.S}</h3>
                                  <p className="status">
                                    Status :{" "}
                                    <span>
                                      {item?.mark?.S === "sold"
                                        ? "Sold"
                                        : "unsold"}
                                    </span>
                                  </p>

                                  <p className="price">
                                    Original Product Price ৳
                                    {item?.price?.N ? item?.price?.N : 0}
                                  </p>
                                </div>

                                <div className="right-area">
                                  {item.status === "complete" && (
                                    <Link
                                      to={`/product-details/${item?.productId?.S}`}
                                    >
                                      preview
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="">No Selling items</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyHistory;
