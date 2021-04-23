import React, { useState, useEffect } from "react";
import {
  Table,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  form,
  Popconfirm,
} from "antd";
import axios from "axios";
import Button from "./ButtonAdd";
import Layout from "../layouts/index";
import Swal from "sweetalert2";


const baseUrl = "http://localhost:5500/api";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const User = () => {
  const { Column } = Table;
  const [data, setData] = useState([]);
 const [isModalVisible, setIsModalVisible] = useState(false);
 
 const [username, setUsername] = useState("");
 const [usernameEdit, setUsernameEdit] = useState("");
 const [editingKey, setEditingKey] = useState("");
 const [type, setType] = useState("");
 const [password, setPassword] = useState("");

 const showModal = async(choose) => {
   setIsModalVisible(true);
   const req = await axios.get(`${baseUrl}/register-user/${choose}`)

   
  await setUsernameEdit(req.data.username);
   console.log("la", usernameEdit);
 };

 const handleOk = async () => {
   try {
     const user = {
       username,
       type,
       password,
     };
     // const token = localStorage.getItem("token");
     Swal.fire({
       title: "Do you want to save the changes?",
       showDenyButton: true,
       showCancelButton: true,
       confirmButtonText: `Save`,
       denyButtonText: `Don't save`,
     }).then(async (result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
         const req = await axios.post(`${baseUrl}/register-user`, user);
         await Swal.fire("Saved!", "", "success");
         setType("");
         setPassword("");
         setUsername("");
         await setIsModalVisible(false);
         window.location.reload();
       } else if (result.isDenied) {
         Swal.fire("Changes are not saved", "", "info");
       }
     });
   } catch (error) {
     return error;
   }
 };

 const handleCancel = () => {
   setIsModalVisible(false);
   setType("");
   setPassword("");
   setUsername("");
 };
 

  const delbyId = async (value) => {
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then(async(result) => {
     if (result.isConfirmed) { 
      const req = await axios.delete(`${baseUrl}/register-user/${value}`);   
      await Swal.fire("Deleted!", "Your file has been deleted.", "success") 
      window.location.reload(); 
      
     }   
   });  
  }

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}/register-user`, {
        headers: {
          "x-access-token": token,
        },
      });
      // console.log("hasil", res.data);
      if(res.status === 200){
        setData(res.data)
      }
    } catch (error) {}
  };


   useEffect(() => {
     getData()
   }, [])


 
   
  return (
    <Layout>
      <div>
        <h1>User</h1>
        <div className="buttons" style={buttons}>
          <Button />
        </div>
        <Table
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        >
          <Column title="ID" dataIndex="id" key="id" width="25%" />
          <Column
            title="NAME"
            dataIndex="username"
            key="username"
            width="25%"
          />
          <Column title="TYPE" dataIndex="type" key="id" width="25%" />
          <Column
            title="Action"
            key="action"
            width="25%"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => delbyId(record.id)}>Delete </a>
              </Space>
            )}
          />
        </Table>
        <Modal
          title="Edit User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Username" name="username">
              <input
                value={usernameEdit}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select value={type} onSelect={(event) => setType(event)}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default User;



const buttons = {
  marginBottom: "20px",
  textAlign: "right",
};
