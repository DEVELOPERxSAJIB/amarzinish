import PrivateGuard from "./PrivateGuard";
import Layout from "./../components/Layout/Layout";
import NotFound from "./../Pages/NotFound/NotFound";
import Bkash from './../Pages/Bkash/Bkash';
import PaymentSuccess from './../Pages/payment/PaymentSuccess';
import PaymentFailed from './../Pages/payment/PaymentFailed';
import Status from "../Pages/Status/Status";
import MyHistory from "../Pages/MyHistory/MyHistory";



export const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/my-history",
            element: <MyHistory />,
          },
          {
            path: "/payment-success/:id",
            element: <PaymentSuccess />,
          },
          {
            path: "/payment-failed/:id",
            element: <PaymentFailed />,
          },
          {
            path: "/order-status/:id",
            element: <Status />,
          },        
          {
            path: "/bkash",
            element: <Bkash />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
