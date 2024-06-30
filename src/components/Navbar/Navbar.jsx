import "./Navbar.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useEffect } from "react";
("react-router-dom");
import { useGetSingleUserQuery } from "../../app/userApi";

const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data } = useGetSingleUserQuery(userData?.sub);
 

  const handleLogout = async () => {
    await localStorage.removeItem("cognito_user");
    window.location.reload();
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to={"/my-history"} className="dropdown-item">
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={handleLogout} className="dropdown-item" to="#logout">
          Logout
        </button>
      ),
    },
   
    data?.role?.S === "admin"
      ? {
          key: "3",
          label: (
            <Link to={"/dashboard"} className="dropdown-item">
              Dashboard
            </Link>
          ),
        }
      : null, 
  ].filter(Boolean);

  return (
    <>
      <TopBar />
      <div className="container navbar d-flex justify-content-between align-items-center">
        <div className="img-area">
          <Link to="/">
            <h1>AmarZinish</h1>
          </Link>
        </div>
        <div className="icon-area d-flex gap-3">
          <div className="btn-group dropstart">
            {userData&&userData ? (
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <FaRegUserCircle
                      className="nav-icon-item text-dark dropdown-toggle dropdown-bottom"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      size={24}
                      style={{ cursor: "pointer" }}
                    />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <button type="button" className="btn btn-dark">
                <Link
                  to={
                   `https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/authorize?client_id=1mjh8po48rgle2cs6h97m8q4q2&response_type=code&scope=email+openid+profile&redirect_uri=https%3A%2F%2Famarjinis.vercel.app`
                  }
                  className="dropdown-item"
                >
                  login
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
const TopBar = () => {
  return (
    <div className="topbar">
      <h2>Welcome to AmarZinsh</h2>
    </div>
  );
};
