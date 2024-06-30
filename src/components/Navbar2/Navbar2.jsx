import "./Navbar2.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { useEffect } from 'react';
import{useGetSingleUserQuery} from "../../app/userApi"

const Navbar2 = () => {
  const userData =JSON.parse(localStorage.getItem("cognito_user"))
 const{data} = useGetSingleUserQuery(userData?.sub)

  const handleLogout = async () => {
    await localStorage.removeItem("cognito_user");
    window.location.reload();
  }
  const items = [
    {
      key: "1",
      label: (
        <Link to={"/my-history"} className="dropdown-item">
          Proflie
        </Link>
      ),
    },
  
    {
      key: "2",
      label: (
        <button onClick={handleLogout} className="dropdown-item">
          Logout
        </button>
      ),
    },
    
    {
      key: "3",
      label: (
        <Link to={"/dashboard"} className="dropdown-item">
        Dashboard
       </Link>
      ),
    },
  ];
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      const tokenUrl = 'https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/token';
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '1mjh8po48rgle2cs6h97m8q4q2',
        redirect_uri: 'https://amarjinis.vercel.app/', // Replace with your redirect URI
        code,
      });
  
      fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to exchange code for token');
        }
        return response.json();
      })
      .then(tokenData => {
        const accessToken = tokenData.access_token;
  
        // Fetch user data using the access token
        fetch('https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/userInfo', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(userData => {
          localStorage.setItem('cognito_user', JSON.stringify(userData));
        })
        .catch(error => console.error('Error fetching user data:', error));
      })
      .catch(error => console.error('Error exchanging code for token:', error));
    }
  }, []);

  
  return (
    <>
      <TopBar />
      <div className="container navbar d-flex justify-content-between align-items-center">
        <div className="img-area">
          <Link to={"/"}>
            <h1>SHOP.CO</h1>
          </Link>
        </div>
        <Link to="/products" className="search-box">
          <input type="text" placeholder="Search for products..." />
          <IoSearchOutline className="src-icon" />
        </Link>
        <div className="icon-area d-flex gap-3">
         
          <div className="btn-group dropstart">
          {userData&&userData?
            <Dropdown
            placement="bottomRight"
            trigger={["click"]}
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
             </Dropdown>:<button type="button" className='btn btn-dark'><Link   to={"https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/authorize?client_id=1mjh8po48rgle2cs6h97m8q4q2&response_type=code&scope=email+openid+profile&redirect_uri=https%3A%2F%2Famarjinis.vercel.app"} className="dropdown-item">
                  login
                </Link></button>
                }
          </div>
        </div>
      </div>
    </>
  );
};

const TopBar = () => {
  return (
    <div className="topbar">
      <h2>Welcome to AmarZinsh</h2>
    </div>
  );
};

export default Navbar2;
