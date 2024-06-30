import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import DefaultLayout from "./DefaultLayout";
import {
  useGetPaymentQuery,
  useDeletePaymentMutation,
} from "../../app/PaymentApi";
import { alertMessage } from "./../../utils/Alerts/alertMessage";
import { Select, Skeleton } from "antd";
import Loader from "../../assets/images/gradient-5812_256.gif";
const AllPayments = () => {
  const { data, refetch, isLoading } = useGetPaymentQuery();
  const [deletePayment, { isSuccess }] = useDeletePaymentMutation();

  const handleDeleteItem = (PaymentId) => {
    deletePayment(PaymentId);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (paymentId) => <a>{paymentId?.S}</a>,
    },
    {
      title: "ProductId",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => <span>{productId?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <span>{userId?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${parseFloat(amount?.N).toFixed(2)}`,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status?.S}</span>,
    },

    {
      title: "TrxId",
      dataIndex: "trxId",
      key: "trxId",
      render: (trxId) => <span>{trxId?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${parseFloat(amount?.N).toFixed(2)}`, 
      
    },
  ];

  const [sortedProduct, setSortedProduct] = useState(null);
  useEffect(() => {
    if (data?.length > 0) {
      const sorted = [...data].sort(
        (a, b) => new Date(b.created.S) - new Date(a.created.S)
      );
      setSortedProduct(sorted);
    }
  }, [data]);
  useEffect(() => {
    if (isSuccess) {
      refetch();
      alertMessage({ type: "success", message: "Payment delete" });
    }
  }, [isSuccess, refetch]);

  if (isLoading) {
    return (
      <div
        style={{ height: "85vh" }}
        className="d-flex container justify-content-center align-items-center"
      >
        <img style={{ width: "200px" }} src={Loader} alt="" />
      </div>
    );
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>All Payments</h3>
      </div>
      {sortedProduct && (
        <Table columns={columns} dataSource={sortedProduct} bPaymented />
      )}
    </DefaultLayout>
  );
};

export default AllPayments;
