import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import SingleProduct from "../Pages/SingelProduct/SingleProduct";
import Layout from "../components/Layout/Layout";
import Layout2 from "../components/Layout2/Layout2";



export const publicRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    element: <Layout2 />,
    children: [
      {
        path: "/product-details/:id",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },

    ],
  },


];
