import "./DefaultLayout.css";
import { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserSwitchOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  ProductOutlined,
} from "@ant-design/icons";
// import RingLoader from "react-spinners/RingLoader";
import {  Drawer } from "antd";

const { Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(window.innerWidth >= 992?true:false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  // const { loader } = useSelector((state) => state.product);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    setCartCount(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartCount]);
  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#8b00fd",
  };
  return (
    <Layout>
      <>
        <Drawer
          title="Amar Zinis"
          placement={"left"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"left"}
        >
          <Sider width="100%" style={siderStyle}>
            <div
              onToggle={onToggle}
              onClick={() => navigate("/dashboard")}
              className="demo-logo-vertical"
            ></div>
            <Menu
              theme="default"
              mode="inline"
              defaultSelectedKeys={location.pathname}
              items={[
                {
                  key: "/dashboard",
                  icon: <HomeOutlined className="fs-4 text-light" />,
                  label: <Link to={"/dashboard"}>Dashboard</Link>,
                },
                {
                  key: "/dashboard/all-products",
                  icon: <ProductOutlined className="fs-4 text-light" />,
                  label: <Link to={"/dashboard/all-products"}>Products</Link>,
                },
                {
                  key: "/dashboard/all-orders",
                  icon: <ShoppingCartOutlined className="fs-4 text-light" />,
                  label: <Link to={"/dashboard/all-orders"}>Orders</Link>,
                },
                {
                  key: "/dashboard/all-payments",
                  icon: <PayCircleOutlined className="fs-4 text-light" />,
                  label: <Link to={"/dashboard/all-payments"}>Payments</Link>,
                },
                {
                  key: "/dashboard/all-users",
                  icon: <UserSwitchOutlined className="fs-4 text-light" />,
                  label: <Link to={"/dashboard/all-users"}>Users</Link>,
                },
              ]}
            />
          </Sider>
        </Drawer>
      </>

      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className="hide-overflow"
        >
          <button
            style={{backgroundColor:"purple",color:"white"}}
            className="btn  mb-4"
            onClick={showDrawer}
          >
            <MenuOutlined className="fs-3"/>
          </button>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
