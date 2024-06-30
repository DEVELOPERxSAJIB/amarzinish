import {useEffect,useState} from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import DefaultLayout from "./DefaultLayout";
import { useGetOrderQuery,useDeleteOrderMutation,useEditStatusOrderMutation } from "../../app/OrderApi";
import { alertMessage } from './../../utils/Alerts/alertMessage';
import { Select,Skeleton } from 'antd';
import Loader from "../../assets/images/gradient-5812_256.gif"
const AllOrders = () => {
  const { data,refetch,isLoading } = useGetOrderQuery();
  const [deleteOrder,{isSuccess}] = useDeleteOrderMutation();

  const [editStatusOrder,{isSuccess:statusIsSuccess}] = useEditStatusOrderMutation();

  const handleDeleteItem = (OrderId) => {
    deleteOrder(OrderId)
  };
  const onChange = (value, record) => {
    editStatusOrder({ OrderId: record.OrderId.S, status: value });

  };
  const columns = [
    {
      title: "ID",
      dataIndex: "OrderId",
      key: "OrderId",
      render: (OrderId) => <a>{OrderId.S}</a>,
      responsive: ['lg','md'],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>{amount?.N}</span>,
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
      render: (address) => <span>{address?.S}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price?.N}</span>,

    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <span>{title?.S}</span>, 
      responsive: ['lg','md'],
    },
    {
      title: "TrxId",
      dataIndex: "trxId",
      key: "trxId",
      render: (trxId) => <span>{trxId?.S}</span>, 
      responsive: ['lg','md'],
    }
    
  ]
  const [sortedProduct,setSortedProduct]= useState(null)
  useEffect(() => {
    if (data?.length > 0) {
      const sorted = [...data].sort((a, b) => new Date(b.created.S) - new Date(a.created.S));
      setSortedProduct(sorted);
    }
  }, [data]);
useEffect(()=>{
if(isSuccess){
  refetch()
  alertMessage({type:"success",message:"Order delete"})
}
if(statusIsSuccess){
  refetch()
  alertMessage({type:"success",message:"Order status updated"})
}
},[isSuccess,refetch,statusIsSuccess])

if(isLoading){
  return <div style={{height:"85vh"}} className="d-flex container justify-content-center align-items-center">

   <img style={{width:"200px"}} src={Loader} alt="" />
 </div>
}
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>All Orders</h3>
      </div>
      {sortedProduct && <Table columns={columns} dataSource={sortedProduct} bordered />}
    </DefaultLayout>
  );
};

export default AllOrders;
