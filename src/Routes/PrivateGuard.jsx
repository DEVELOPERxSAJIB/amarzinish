import { Navigate, Outlet } from "react-router-dom";

import { useGetSingleUserQuery } from "../app/userApi";
const PrivateGuard = () => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data } = useGetSingleUserQuery(userData?.sub);

  if ( data||JSON.parse(localStorage.getItem("cognito_user"))) {
    return <Outlet />;
  } else {
    return data ? <Outlet /> : <Navigate to="/*" />;
  }
};

export default PrivateGuard;
