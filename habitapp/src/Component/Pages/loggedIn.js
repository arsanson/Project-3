import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "antd/dist/antd.css";
import { Calendar } from "antd";
import { List, Input } from "antd";

export default () => {
  var objDate = new Date();

  var strDate =
    objDate.toLocaleString("en", { month: "long" }) +
    " " +
    objDate.toLocaleString("en", { day: "numeric" }) +
    ", " +
    objDate.toLocaleString("en", { year: "numeric" });

  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;
  const { Search } = Input;

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires."
  ];

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Logout</Menu.Item>
          <Menu.Item key="2">Welcome!</Menu.Item>
          <Menu.Item key="3" style={{ position: "absolute", left: "50%" }}>
            <Icon type="play-square" />
          </Menu.Item>
          <Menu.Item key="4" style={{ position: "absolute", left: "52%" }}>
            <Icon type="pause-circle" />
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

        <Layout
          style={{ height: "100%", padding: "24px 0", background: "#fff" }}
        >
          <Sider width={300} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <Menu>
                <Menu.Item key="1">
                  <span>
                    <Icon type="schedule" />
                    {strDate}
                  </span>
                </Menu.Item>
              </Menu>

              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="history" />
                    Timer
                  </span>
                }
              >
                <Menu.Item key="5">11:00</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="history" />
                    Alarm
                  </span>
                }
              >
                <Menu.Item key="9">11:00 Am</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <div
            style={{ width: 300, border: "1px solid #d9d9d9", borderRadius: 4 }}
          >
            <Layout style={{ position: "absolute", maxHeight: 150 }}></Layout>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>

          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
              textAlign: "center",
              fontSize: "2em"
            }}
          >
            <div>
              <h3 style={{ margin: "16px 0" }}>Todo List</h3>
              <Search
                placeholder="input daily routines"
                enterButton="Add"
                size="large"
                onSearch={value => console.log(value)}
              />
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
            ,
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Copyright © 2019 Gatech Bootcamp Project 3
      </Footer>
    </Layout>
  );
};
