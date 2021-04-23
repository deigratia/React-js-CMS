import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { FileAddOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:5500/api";

const Modals = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const showModal = () => {
    // console.log('test',open.open);
    setIsModalVisible(true);
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
      return error
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setType("");
    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <FileAddOutlined /> Add
      </Button>
      <Modal
        title="Add User"
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
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select onSelect={(event) => setType(event)}>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Modals;
