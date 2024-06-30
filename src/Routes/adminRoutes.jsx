import AdminGuard from "./AdminGuard";
import Dashboard from "./../Pages/Admin/Dashboard";
import Layout from './../components/Layout/Layout';
import NotFound from './../Pages/NotFound/NotFound';
import AllProducts from "./../Pages/Admin/AllProducts";
import AllUsers from "./../Pages/Admin/AllUsers";
import AllOrders from "./../Pages/Admin/AllOrder";
import AllPayments from "./../Pages/Admin/AllPayments";

const adminRoutes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard", 
        element: <AdminGuard />, 
        children: [
          {
            index: true, 
            element: <Dashboard />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-payments",
            element: <AllPayments />,
          },
          {
            path: "all-orders",
            element: <AllOrders />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  }
];

export default adminRoutes;
