import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "./features/plan/planApiSlice";
import { ToastContainer } from "react-toastify";
import { loggedinUserInfo } from "./features/auth/authApiSlice";
import { pdfjs } from "react-pdf";
import { getLoggedInUser } from "./features/auth/authSlice";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector(getLoggedInUser);

  useEffect(() => {
    if (user?.isBan) {
      localStorage.removeItem("user");
    }
  }, [user?.isBan]);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  useEffect(() => {
    // if (localStorage.getItem("user")) {
      dispatch(loggedinUserInfo());
    // }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
