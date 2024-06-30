import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;
const CLIENT_EMAIL = import.meta.env.VITE_APP_CLIENT_EMAIL;
const CLIENT_PASSWORD = import.meta.env.VITE_APP_CLIENT_PASSWORD;

export const getAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/aladdin/api/v1/issue-token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: CLIENT_EMAIL,
      password: CLIENT_PASSWORD,
      grant_type: 'password',
    },{headers: {
        'Access-Control-Allow-Origin': '*'
      }});

    if (response.status === 200) {
      return response.data.access_token;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


// export const createOrder = async (accessToken, orderDetails) => {
//   const response = await fetch(`${BASE_URL}/aladdin/api/v1/orders`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify(orderDetails),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create order');
//   }

//   const data = await response.json();
//   return data;
// };

// export const getOrderStatus = async (accessToken, consignmentId) => {
//   const response = await fetch(`${BASE_URL}/aladdin/api/v1/orders/${consignmentId}/info`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Accept': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to get order status');
//   }

//   const data = await response.json();
//   return data;
// };
