import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
import "./layouts.css";

const { Header, Content, Footer } = Layout;


const Layouts = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/")
  };

  return (
    //  defaultSelectedKeys={key}
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" style={{width:"100%"}}>
            <Menu.Item key="1">
              <Link to="/list">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={logout} >
              Logout
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          CMS ©2018 Created by Dei Gratia
        </Footer>
      </Layout>
    </div>
  );
};

export default Layouts;


