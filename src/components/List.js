import React, { useState, useEffect } from "react"
import { Button, Table } from 'antd';
import Layout from "../layouts/index"
import axios from "axios"
import moment from "moment"
import { UserOutlined } from "@ant-design/icons";

const baseUrl= "http://localhost:5500/api"

const List = () => {

  const { Column } = Table;
  const [data, setData] = useState([])
 

  const getData = async() => {
    const token = localStorage.getItem("token")
    const res = await axios.get(`${baseUrl}/list-user`, {
      headers: {
        "x-access-token": token,
      },
    });
   if (res.status === 200) {
     let result = []
     res.data.forEach(async(v,key) => {
      await result.push({
        key: key,
        id:v.id,
        username: v.username,
        checkin: moment(v.checkin).format("DD MMMM YYYY, h:mm:ss a"),
        checkout: v.checkout == null ? "null" : moment(v.checkout).format("DD MMMM YYYY, h:mm:ss a"),
      });
     })
     setData(result);
   }
    
  }

  const Check =  async() => {
    const res = await axios.post(
      `${baseUrl}/list-user/${localStorage.getItem('token')}`
    );
    if(res){   
      window.location.reload()
      // setIsCheck(true)

    }
  }

  const CheckOut = async () => {
    const res = await axios.put(
      `${baseUrl}/list-user/${localStorage.getItem("token")}`
    );
    if (res) {
      window.location.reload();
      // setIsCheck(true)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }

  // isCheck;

    return (
      <Layout>
        <div>
          <h1>View</h1>

          <div className="buttonabsen" style={buttonabsen}>
            <Button onClick={Check}>
              Checkin <UserOutlined />
            </Button>
          </div>

          <div className="buttonabsenOut" style={buttonabsenOut}>
            <Button danger onClick={CheckOut}>
              Checkout <UserOutlined />
            </Button>
          </div>

          <Table
            dataSource={data}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
          >
            <Column title="ID" dataIndex="id" key="id" width="16.6%" />
            <Column
              title="NAME"
              dataIndex="username"
              key="username"
              width="16.6%%"
            />
            <Column
              title="Checkin"
              dataIndex="checkin"
              key="checkin"
              width="16.6%%"
            />
            <Column
              title="Checkout"
              dataIndex="checkout"
              key="checkout"
              width="16.6%%"
            />
          </Table>
        </div>
      </Layout>
    );
}

export default List;

const buttonabsen = {
  width:"100%",
};

const buttonabsenOut = {
  position:"relative",
  left:120,
  bottom:32
}