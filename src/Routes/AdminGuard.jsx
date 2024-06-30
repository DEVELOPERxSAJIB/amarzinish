import { Navigate, Outlet } from "react-router-dom";
import { useGetSingleUserQuery } from "../app/userApi";
import Loading from "../assets/images/gradient-5812_256.gif";


const AdminGuard = () => {
  const userData = JSON.parse(localStorage.getItem("cognito_user"));
  const { data, error, isLoading } = useGetSingleUserQuery(userData.sub);

  // If userData is null, navigate to login page
  if (!userData) {
    console.error("No user data found in localStorage");
    return <Navigate to="/login" />;
  }

 
  // Show loading indicator while fetching user data
  if (isLoading) {
    return <div
    style={{ height: "85vh" }}
    className="container d-flex flex-column w-100 align-items-center justify-content-center"
  >
    <img src={Loading} alt="" />
  </div>;
  }

  // Handle error state
  if (error || !data) {
    console.error("Error fetching user data or no data returned");
    return <Navigate to="/login" />;
  }

  // Log data for debugging
  console.log("User data fetched:", data);

  // Check if the user is an admin
  return data.role.S === "admin" ? <Outlet /> : <Navigate to="/not-found" />;
};

export default AdminGuard;
