import { useEffect ,useState} from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DefaultLayout from "./DefaultLayout";
import { Table } from "antd";
import { alertMessage } from "./../../utils/Alerts/alertMessage";
import { useGetUserQuery, useDeleteUserMutation } from "./../../app/userApi";
import Loader from "../../assets/images/gradient-5812_256.gif";
import { useEditUserRoleMutation } from "../../app/userApi";
import { Select, Skeleton } from "antd";

const AllUsers = () => {
  const { data, refetch, isLoading } = useGetUserQuery();
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [editUserRole, { isSuccess: isUserSuccess }] =
    useEditUserRoleMutation();
  const onChange = (value, record) => {
    editUserRole({ userId: record.userId.S, role: value });
  };

  const handleDeleteItem = (id) => {
    deleteUser(id);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId) => <a>{userId.S}</a>,
      responsive: ['lg','md'],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name?.S}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          showSearch
          placeholder="Select a role"
          optionFilterProp="children"
          onChange={(value) => onChange(value, record)}
          defaultValue={role?.S}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (name) => <span>{name?.S}</span>,
      responsive: ['lg','md'], 
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-3" style={{ cursor: "pointer" }}>
          <DeleteOutlined onClick={() => handleDeleteItem(record.userId.S)} />
        </div>
      ),
    },
  ];
  const [sortedProduct,setSortedProduct]= useState(null)
  useEffect(() => {
    if (data?.length > 0) {
      const sorted = [...data].sort((a, b) => new Date(b.created.S) - new Date(a.created.S));
      setSortedProduct(sorted);
    }
  }, [data]);
  useEffect(() => {
    if (isSuccess) {
      refetch();
      alertMessage({ type: "success", message: "Product delete" });
    }
    if (isUserSuccess) {
      refetch();
      alertMessage({ type: "success", message: "update role" });
    }
  }, [isSuccess, refetch, isUserSuccess]);
  if (isLoading) {
    return (
      <div
        style={{ height: "85vh" }}
        className="d-flex container justify-content-center align-items-center"
      >
        <img style={{width:"200px"}} src={Loader} alt="" />
      </div>
    );
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>All Users</h3>
      </div>
      <Table columns={columns} bordered dataSource={sortedProduct} />
    </DefaultLayout>
  );
};

export default AllUsers;
