import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:5500/api";

const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const [isError, setisError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const islogin = () => setLogin(!login);
  const userLogin = async () => {
    const user = {
      username,
      password,
    };
    try {
      const req = await axios.post(`${baseUrl}/login`, user);
      console.log("hasil", req.data);
      if (req.data.auth === true) {
        localStorage.setItem("token", req.data.token);
        setUsername("");
        setPassword("");
        history.push("/list");
      }
    } catch (error) {
      console.log("err", error.response.data.auth);
      if (error.response.data.auth === false) {
        setisError(true);
        setError(error.response.data.message);
        history.push("/");
      }
    }
  };

  const userRegister = async () => {
    const user = {
      username,
      password,
      type,
    };
    try {
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
          console.log("hasil", req);
          await Swal.fire("Saved!", "", "success");
          setType("");
          setUsername("");
          setPassword("");
          window.location.reload()
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.log("err", error.response.data.auth);
    }
  };

  return (
    <div style={Container}>
      <div style={box}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <h1 style={{ marginBottom: "30px" }}>
            {login ? "Login" : "Register"}
          </h1>
          {login ? (
            <div>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
              {isError && (
                <div>
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please input your type!",
                  },
                ]}
              >
                <Select
                  style={{ position: "relative", left: "30px", width: "85%" }}
                  onSelect={(event) => setType(event)}
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
              {isError && (
                <div>
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                </div>
              )}
            </div>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ position: "relative", left: "40%" }}
              onClick={login ? userLogin : userRegister}
            >
              {login ? "Log in" : "Register"}
            </Button>
            <br />
            {login ? (
              <div>
                Or <a onClick={islogin}>register now!</a>
              </div>
            ) : (
              <a onClick={islogin}>login now!</a>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

const Container = {
  margin: "0 auto",
  height: "100vh",
  background: "#eaf4fc",
};

const box = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
  alignItems: "center",
};
