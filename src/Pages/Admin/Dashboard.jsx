import DefaultLayout from "./DefaultLayout";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import product from "../../assets/images/sales.png";
import profile from "../../assets/images/profile.png";
import total from "../../assets/images/total.png";
import order from "../../assets/images/order.png";
import { Divider } from "antd";
import { useGetPaymentQuery } from "../../app/PaymentApi";
import { useGetOrderQuery } from "../../app/OrderApi";
import { useGetUserQuery } from "./../../app/userApi";
import { useGetProductQuery } from "../../app/ProductApi";
import ChartComponent from "./../../components/chartComp";
import SalesChart from "./../../components/SalesChart";
const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data } = useGetUserQuery();
  const { data: bkash } = useGetPaymentQuery();
  const { data: orderdata } = useGetOrderQuery();
  const { data: productdata } = useGetProductQuery();

  return (
    <DefaultLayout>
      <h1>Hi {userData?.name}, Welcome to the Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div className="card d-flex align-items-center justify-content-center p-4 ">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <img style={{ width: "50px" }} src={profile} alt="" />
              <h3>Total Users</h3>
            </div>
            <Divider />
            <h3>{data?.length > 0 ? data?.length : 0}</h3>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div className="card w-100 d-flex align-items-center justify-content-center p-4 ">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <img style={{ width: "50px" }} src={product} alt="" />
              <h3>Total Sales</h3>
            </div>
            <Divider />
            <h3>
              {bkash
                ?.filter((item) => item.status.S === "complete")
                ?.reduce((total, item) => total + Number(item?.amount?.N), 0)}
            </h3>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
          <div className="card d-flex align-items-center justify-content-center p-4 ">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <img style={{ width: "50px" }} src={order} alt="" />
              <h3>Total Order</h3>
            </div>
            <Divider />
            <h3>{orderdata?.length > 0 ? orderdata?.length : 0}</h3>
          </div>
        </Col>
      </Row>
      <ChartComponent />
      <SalesChart />
    </DefaultLayout>
  );
};

export default Dashboard;
