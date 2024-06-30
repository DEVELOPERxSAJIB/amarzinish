import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderStatus = ({ consignmentId, accessToken }) => {
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await statusfunc(consignmentId, accessToken);
        setOrderStatus(response);
      } catch (error) {
        console.error("Error fetching order status:", error);
        setOrderStatus(null);
      }
    };

    if (consignmentId && consignmentId.length >= 2) {
      fetchStatus();
    }
  }, [consignmentId, accessToken]);

  const statusfunc = async (consignment_id, access_token) => {
    try {
      const response = await axios.get(
        `https://dpxh6f05d3.execute-api.eu-north-1.amazonaws.com/pathaoorderstatus?consignment_id=${consignment_id}&access_token=${access_token}`
      );

      return response.data.data.order_status;
    } catch (error) {
      console.error("Error fetching order status:", error);
      return null;
    }
  };

  return (
    <>
        <p className="status">
          Status :{' '}
          <span>
            {orderStatus === null ? 'Loading...' : orderStatus}
          </span>
        </p>
    </>
  );
};

export default OrderStatus;
