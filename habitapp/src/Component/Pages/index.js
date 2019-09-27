import React, { Component } from "react";
import UserContext from "../../context/UserContext";
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Drawer,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select
} from "antd";
import "antd/dist/antd.css";
import "../../beforeLogin.css";
import Unsplash from "react-unsplash-wrapper";
import Auth from "../../utils/Auth";
import API from "../../utils/API";
import Clock from "./clock";

const { Option } = Select;

class index extends Component {
  static contextType = UserContext;

  state = {
    visible: false,
    show: false,
    totalTime: "",
    hrs: "",
    min: "",
    seconds: "",
    alarm: "00:00:00",
    isTimerPaused: true,
    spotifyId: ""
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  accountDrawer = () => {
    this.setState({
      show: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  onClose = () => {
    this.setState({
      show: false,
      visible: false
    });
  };
  //create page submit

  handleCreateSubmit = e => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.newUserName,
        password: this.state.newPassword,
        genre: this.state.newGenre
      })
    }).then(response => console.log(response));
  };

  //login submit
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) console.log(err);
      const { username, password } = values;
      if (username && password) {
        Auth.logIn(username, password, response => {
          this.context.setUser(response);
          this.props.history.push("/");
        }).then(() =>
          API.spotify().then(res => {
            this.setState({
              spotifyId: res[0].id
            });
            this.context.setSpotifyId(res[0].id);
            console.log(res[0].id);
            console.log(this.state.spotifyId);
          })
        );
      }
    });

    // this.props.form.validateFields((err, values) => {
    //   console.log(values)
    //   if (err) console.log(err);
    const { username, password } = this.state;
    if (username && password) {
      Auth.logIn(username, password, response => {
        this.context.setUser(response);
        this.props.history.push("/login");
      });
    }
    // });

    //     this.props.form.validateFields((err, values) => {
    //       if (err) console.log(err);
    //       const { username, password } = values;
    //       if (username && password) {
    //         Auth.logIn(username, password, response => {
    //           // this.context.setUser(response);
    //           this.props.history.push("/");
    //         }).then(() =>
    //           API.spotify().then(res => console.log("res", res, res[0].uri))
    //         );
    //       }
    //     });
  };

  changeHandler = e => {
    if (e.target) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    } else {
      // special case for select
      this.setState({ newGenre: e });
    }
  };

  // Timer
  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  //   Timer
  startTimer = () => {
    this.setState({
      totalTime:
        parseInt(this.state.min) * 60 +
        parseInt(this.state.hrs) * 3600 +
        parseInt(this.state.seconds)
    });
  };

  render() {
    const { SubMenu } = Menu;
    const { Header, Content, Footer, Sider } = Layout;

    const { getFieldDecorator } = this.props.form;

    var objDate = new Date();

    var strDate =
      objDate.toLocaleString("en", { month: "long" }) +
      " " +
      objDate.toLocaleString("en", { day: "numeric" }) +
      ", " +
      objDate.toLocaleString("en", { year: "numeric" });

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
            <Menu.Item key="1" onClick={this.showDrawer}>
              Login
            </Menu.Item>

            <Menu.Item key="2" onClick={this.accountDrawer}>
              Create Account
            </Menu.Item>

            <Menu.Item
              key="3"
              style={{ position: "absolute", left: "39%", width: "600px" }}
            >
              {this.state.spotifyId ? (
                <iframe
                  src={`https://open.spotify.com/embed/playlist/${this.state.spotifyId}`}
                  width="600"
                  height="70"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              ) : null}
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <Drawer
            title="Login"
            placement="left"
            closable={true}
            onClose={this.onClose}
            visible={this.state.visible}
            width={350}
          >
            {/*Sidebar PopOut Login-Form--------------------------------------------------------------------------------------------- */}
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Username"
                    name="username"
                    onChange={this.changeHandler}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("remember", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="#">
                  Forgot password
                </a>
                <br></br>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  // href="../loggedIn"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
            {/*Sidebar PopOut Login-Form--------------------------------------------------------------------------------------------- */}

            {/* Sidebar Date/Time Set----------------------------------------------------------------------------------------------- */}
          </Drawer>
          <div>
            {/* <Button type="primary" onClick={this.accountDrawer}>
                <Icon type="plus" /> Create Account
              </Button> */}

            <Drawer
              title="Create a new account"
              onClose={this.onClose}
              visible={this.state.show}
              placement="left"
              closable={true}
              width={430}
              height={330}
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Name">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter user name"
                          }
                        ]
                      })(
                        <Input
                          placeholder="Please enter user name"
                          name="newUserName"
                          onChange={this.changeHandler}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Password">
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: "Please enter a password"
                          }
                        ]
                      })(
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Please enter a password"
                          name="newPassword"
                          onChange={this.changeHandler}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Genre">
                      {getFieldDecorator("Genre", {
                        rules: [
                          {
                            required: true,
                            message: "Please choose the Genres"
                          }
                        ]
                      })(
                        <Select
                          placeholder="Please choose the type"
                          onChange={this.changeHandler}
                        >
                          <Option value="Hip-Hop">Hip-Hop</Option>
                          <Option value="Rap">Rap</Option>
                          <Option value="Pop">Pop</Option>
                          <Option value="Study">Study</Option>
                          <Option value="Classical">Classical</Option>
                          <Option value="Bag Pipes">Bag Pipes</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}></Col>
                </Row>
              </Form>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e9e9e9",
                  padding: "10px 16px",
                  background: "#fff",
                  textAlign: "right"
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.handleCreateSubmit} type="primary">
                  Submit
                </Button>
              </div>
            </Drawer>
          </div>
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
                <Menu style={{ background: "#fff" }}>
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
                  <Menu.Item key="5">
                    <Input
                      prefix={
                        <Icon
                          type="clock-circle"
                          theme="twoTone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Hrs"
                      block
                      name="hrs"
                      onChange={this.handleInputChange}
                      style={{ width: "33%" }}
                    />
                    <Input
                      prefix={
                        <Icon
                          type="clock-circle"
                          theme="twoTone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Min"
                      block
                      name="min"
                      onChange={this.handleInputChange}
                      style={{ width: "33%" }}
                    />
                    <Input
                      prefix={
                        <Icon
                          type="clock-circle"
                          theme="twoTone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Sec"
                      block
                      name="seconds"
                      onChange={this.handleInputChange}
                      style={{ width: "33%" }}
                    />
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Button type="primary" block onClick={this.startTimer}>
                      Start TImer
                    </Button>
                  </Menu.Item>
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
                  <Menu.Item key="9">
                    <Input
                      prefix={
                        <Icon
                          type="clock-circle"
                          theme="twoTone"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="00:00"
                      block
                      name="alarm"
                      onChange={this.handleInputChange}
                    />
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Button type="primary" block onClick={this.setAlarm}>
                      Set Alarm
                    </Button>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            {/* Sidebar Date/Time Set----------------------------------------------------------------------------------------------- */}

            {/* Content------------------------------------------------------------------------------------------------------------- */}
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                textAlign: "center",
                fontSize: "2em"
              }}
            >
              <Unsplash collectionId={8695541} style={{ opacity: ".9" }}>
                <Clock
                  totalTime={this.state.totalTime}
                  alarm={this.state.alarm}
                />
              </Unsplash>
            </Content>
            {/* Content------------------------------------------------------------------------------------------------------------- */}
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © 2019 Gatech Bootcamp Project 3
        </Footer>
      </Layout>
    );
  }
}

export default Form.create()(index);
