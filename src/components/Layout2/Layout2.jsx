import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar2 from "../Navbar2/Navbar2";

const Layout2 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout2;
