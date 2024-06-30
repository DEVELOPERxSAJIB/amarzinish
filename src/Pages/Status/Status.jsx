import { Steps } from "antd";
import "./Status.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
const Status = () => {
  const { id } = useParams();
  const [statusCode, setStatusCode] = useState(0);
  const [orderData, setOrderData] = useState(null);
const navigate = useNavigate()
  const allStatus = [
    { title: "Pickup Requested", description: "" },
    { title: "Assigned for Pickup", description: "" },
    { title: "Picked", description: "" },
    { title: "Pickup Failed", description: "" },
    { title: "Pickup Cancelled", description: "" },
    { title: "At the Sorting HUB", description: "" },
    { title: "In Transit", description: "" },
    { title: "Received at Last Mile HUB", description: "" },
    { title: "Assigned for Delivery", description: "" },
    { title: "Delivered", description: "" },
    { title: "Partial Delivery", description: "" },
    { title: "Return", description: "" },
    { title: "Delivery Failed", description: "" },
    { title: "On_Hold", description: "" },
    { title: "Payment Invoice", description: "" },
  ];

  useEffect(() => {
    const fetchData = async () => {
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

        if (pathaoTokenResponse.data.access_token) {
          const orderStatus = await statusfunc(
            id,
            pathaoTokenResponse.data.access_token
          );
          const currentStatusIndex = allStatus.findIndex(
            (item) => item.title === orderStatus.status
          );

          setStatusCode(currentStatusIndex);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, allStatus]);
  useEffect(() => {
    const fethOrderData = async () => {
      try {
        const orderDataResponse = await axios.get(
          `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/orderbyconsignmentid?consignment_id=${id}`);

       setOrderData(orderDataResponse?.data[0])
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fethOrderData();
  }, [id]);

  return (
    <div className="status-main">
      <div className="container">
        <div className="row">
          <div className="status-top">
            <div className="left-area">
              <h3 className="title">{orderData?.title?.S}</h3>
              <div className="srt-details">
                <p className="orderid">Order ID: #{id}</p>
                <p className="price">Price: {orderData?.price?.N}tk</p>
              </div>
            </div>

            <div className="right-area">
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="steps-main">
            <div>
              <Steps
                progressDot
                current={statusCode}
                direction="vertical"
                items={allStatus.map((item) => ({ title: item.title }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const statusfunc = async (consignment_id, access_token) => {
  try {
    const response = await axios.get(
      `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/pathaoorderstatus?consignment_id=${consignment_id}&access_token=${access_token}`
    );

    return {status:response.data.data.order_status,date:response.data.data.updated_at};
  } catch (error) {
    console.error("Error fetching order status:", error);
    return null;
  }
};

export default Status;
