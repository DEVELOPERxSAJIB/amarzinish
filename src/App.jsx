import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAddNewUserMutation } from "./app/userApi";

function App() {
  const [addNewUser, { isSuccess }] = useAddNewUserMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const tokenUrl =
        "https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/token";
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "1mjh8po48rgle2cs6h97m8q4q2",
        redirect_uri: "https://amarjinis.vercel.app", // Replace with your redirect URI
        code,
      });

      fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to exchange code for token");
          }
          return response.json();
        })
        .then((tokenData) => {
          const accessToken = tokenData.access_token;
          fetch(
            "https://amarjinisdomain.auth.eu-north-1.amazoncognito.com/oauth2/userInfo",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch user data");
              }
              return response.json();
            })
            .then((userData) => {
              localStorage.setItem("cognito_user", JSON.stringify(userData));
              if (userData) {
                addNewUser({
                  name: userData.name,
                  email: userData.email,
                  imgUrl: userData.picture,
                  role: "user",
                  userId: userData.sub,
                });
                
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              // Handle the error gracefully, e.g., display a notification to the user
            });
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          // Handle the error gracefully, e.g., display a notification to the user
        });
    }
  }, [addNewUser]);

  useEffect(() => {
    if (isSuccess) {

      window.location.reload();
    }
  }, [isSuccess]);
  return (
    <>
      <ToastContainer
position="bottom-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
