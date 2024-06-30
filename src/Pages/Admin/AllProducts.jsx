import {useEffect,useState} from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import DefaultLayout from "./DefaultLayout";
import { useGetProductQuery,useDeleteProductMutation,useEditStatusProductMutation } from "../../app/ProductApi";
import { alertMessage } from './../../utils/Alerts/alertMessage';

import { Select,Skeleton } from 'antd';
import Loader from "../../assets/images/gradient-5812_256.gif"
const AllProducts = () => {
  const { data,refetch,isLoading } = useGetProductQuery();
  const [deleteProduct,{isSuccess}] = useDeleteProductMutation();
const [sortedProduct,setSortedProduct]= useState(null)
  const [editStatusProduct,{isSuccess:statusIsSuccess}] = useEditStatusProductMutation();

  const handleDeleteItem = (productId) => {
    deleteProduct(productId)
  };
  const onChange = (value, record) => {
    editStatusProduct({ productId: record.productId.S, status: value });

  };
  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
      render: (productId) => <a>{productId.S}</a>,
      responsive: ['lg','md'],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title) => <span>{title?.S}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span>{phone?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "Bkash",
      dataIndex: "bkash",
      key: "bkash",
      render: (bkash) => <span>{bkash?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => <img style={{width:"50px",height:"50px"}} src={images?.SS[0]}/>,
      responsive: ['lg','md'],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <span>{type?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "Mark as",
      dataIndex: "mark",
      key: "mark",
      render: (mark) => <span className={`font-bold text-uppercase ${mark?.S==="sold"&&"text-danger"} ${mark?.S==="bided"&&"text-danger"}`}>{mark?.S}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `৳${parseFloat(price?.N).toFixed(2)}`,
      responsive: ['lg','md'],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        const items = record?.status?.S;
        return (
          <Select
            style={{
              width:"100px",
              backgroundColor: items === "cancel" && "red"||items === "complete" && "green"||items === "pending" && "yellow",
              border: items === "cancel" && "2px solid red"||items === "complete" && "2px solid green"||items === "pending" && "2px solid yellow",
            }}
            showSearch
            placeholder="Select a role"
            optionFilterProp="children"
            onChange={(value) => onChange(value, record)}
            defaultValue={status?.S}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'complete', label: 'Complete' },
              { value: 'cancel', label: 'Cancel' }
            ]}
          />
        );
      }
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category?.S}</span>,
      responsive: ['lg','md'],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3" style={{ cursor: "pointer" }}>
          <DeleteOutlined onClick={() => handleDeleteItem(record.productId.S)} />
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (data?.length > 0) {
      const sorted = [...data].sort((a, b) => new Date(b.created.S) - new Date(a.created.S));
      setSortedProduct(sorted);
    }
  }, [data]);
useEffect(()=>{
if(isSuccess){
  refetch()
  alertMessage({type:"success",message:"Product delete"})
}
if(statusIsSuccess){
  refetch()
  alertMessage({type:"success",message:"Product status updated"})
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
        <h3>All Products</h3>
      </div>
      {data && <Table  columns={columns} dataSource={sortedProduct} bordered />}
    </DefaultLayout>
  );
};

export default AllProducts;
