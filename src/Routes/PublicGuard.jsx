
import { Navigate, Outlet } from "react-router-dom";
import {useGetSingleUserQuery}from "../app/userApi"
const PublicGuard = () => {
 const userData = JSON.parse(localStorage.getItem("cognito_user"))
  const { data } = useGetSingleUserQuery(userData?.sub);

  if (localStorage.getItem("cognito_user")) {
    return data ? <Navigate to={"/"} /> : <Outlet />;
  }

  return <Outlet />;
};

export default PublicGuard;
