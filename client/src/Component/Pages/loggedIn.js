import React, { Component } from "react";
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
import CountdownTimer from "react-component-countdown-timer";
import "react-component-countdown-timer/lib/styles.css";
import Unsplash from "react-unsplash-wrapper";
import { Calendar } from "antd";
import { List } from "antd";
import Auth from "../../utils/Auth";
import API from "../../utils/API";
const { Option } = Select;

let intervalId;

class index extends Component {
  state = {
    visible: false,
    show: false,
    totalTime: "",
    hrs: "",
    min: "",
    seconds: "",
    alarm: "00:00:00",
    isTimerPaused: true,
    todos: []
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
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) console.log(err);
      const { username, password } = values;
      if (username && password) {
        Auth.logIn(username, password, response => {
          this.context.setUser(response);
          this.props.history.push("/");
          console.log(response);
        });
      }
    });
  };

  // Login Form
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  timesUp = () => {
    if (this.state.totalTime === 0) {
      alert("times up");
    }
  };

  //  Clock

  getInitialState = () => {
    return {
      time: "00:00:00",
      amPm: "am"
    };
  };

  componentDidMount() {
    intervalId = setInterval(this.getTime, 1000);
    this.loadTodos();
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  getTime = () => {
    const takeTwelve = n => (n > 12 ? n - 12 : n),
      addZero = n => (n < 10 ? "0" + n : n);

    setInterval(() => {
      let d, h, m, s, t, amPm;

      d = new Date();
      h = addZero(takeTwelve(d.getHours()));
      m = addZero(d.getMinutes());
      s = addZero(d.getSeconds());
      t = `${h}:${m}:${s}`;

      amPm = d.getHours() >= 12 ? "pm" : "am";

      this.setState({
        time: t,
        amPm: amPm
      });
    }, 1000);
  };

  //  Logout

  logOutHandler = () => {
    Auth.logOut(() => {
      this.props.history.push("/");
    });
  };

  //Insert-Todos
  handleTodoSubmit = e => {
    e.preventDefault();
    if (this.state.item) {
      API.saveTodo({
        item: this.state.item
      })
        .then(res => this.loadTodos())
        .catch(err => console.log(err));
    }
  };

  //Load To-Dos
  loadTodos = () => {
    API.getTodos()
      .then(todos => this.setState({ todos: todos }))
      .catch(err => console.log(err));
  };

  //Delete To-Dos
  deleteTodo = id => {
    API.deleteTodo(id)
      .then(res => this.loadTodos())
      .catch(err => console.log(err));
  };

  // Clock

  render() {
    // Alarm Clock Code Below
    if (this.state.time === this.state.alarm) alert("hi");
    // Alarm Clock Code Above

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
    const { Search } = Input;

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
            <Menu.Item key="1" onClick={this.logOutHandler}>
              Logout
            </Menu.Item>

            <Menu.Item key="2">Welcome {this.username} </Menu.Item>

            <Menu.Item
              key="3"
              style={{ position: "absolute", left: "39%", width: "600px" }}
            >
              <iframe
                src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
                width="600"
                height="70"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
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
                <a className="login-form-forgot" href="">
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
              width={720}
              onClose={this.onClose}
              visible={this.state.show}
              placement="left"
              closable={true}
              width={450}
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
                      })(<Input placeholder="Please enter user name" />)}
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
                        <Select placeholder="Please choose the type">
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
                <Button onClick={this.onClose} type="primary">
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
                    <Button type="primary" block>
                      Set Alarm
                    </Button>
                  </Menu.Item>
                </SubMenu>

                <div id="alarm">
                  <div
                    className="outer"
                    style={{
                      left: "15%",
                      marginLeft: "0"
                    }}
                  >
                    <div
                      id="timerOuter"
                      className="outer"
                      style={{ marginLeft: "0", top: "-15%" }}
                    >
                      <div id="timerInner" className="most-inner">
                        <span>
                          <h1>Timer</h1>
                          {!this.state.totalTime && (
                            <CountdownTimer count={0} hideDay />
                          )}
                          {this.state.totalTime && (
                            <CountdownTimer
                              count={this.state.totalTime}
                              hideDay
                            />
                          )}
                          {/* {this.timesUp} */}
                        </span>
                      </div>
                    </div>

                    <div
                      id="alarmOuter"
                      className="outer"
                      style={{ top: "-15%" }}
                    >
                      <div id="alarmInner" className="most-inner">
                        <h1>Alarm</h1>
                        <div>{this.state.alarm}</div>
                      </div>
                    </div>

                    <div className="inner">
                      <div className="most-inner">
                        <span
                          className={
                            this.state.time === "00:00:00"
                              ? "time blink"
                              : "time"
                          }
                          style={{ top: "10%" }}
                        >
                          {" "}
                          <h1 style={{ fontSize: ".5em" }}>Current Time</h1>
                          {this.state.time}
                        </span>
                        <span className="amPm">{this.state.amPm}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: 300,
                    border: "1px solid #d9d9d9",
                    borderRadius: 4
                  }}
                >
                  <Layout
                    style={{ position: "absolute", maxHeight: 150 }}
                  ></Layout>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
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
              <Unsplash
                collectionId={8695541}
                width="800"
                style={{ opacity: "0.9" }}
              >
                {/* <Layout
                  style={{
                    height: "50%",
                    width: "70%",
                    // padding: "24px 0",
                    background: "white"
                  }}
                > */}
                <div style={{ width: "60%", background: "white" }}>
                  <h3 style={{ margin: "16px 0" }}>Todo List</h3>
                  <div>
                    {
                      <Input
                        placeholder="Enter the Habits you want to follow"
                        name="item"
                        onChange={this.handleInputChange}
                      />
                    }
                  </div>
                  <div>
                    {" "}
                    <Button type="primary" onClick={this.handleTodoSubmit}>
                      Add
                    </Button>{" "}
                  </div>
                  <List
                    size="large"
                    style={{ textAlign: "left" }}
                    dataSource={this.state.todos}
                    renderItem={todo => (
                      <List.Item>
                        <Icon
                          type="check-circle"
                          onClick={() => this.deleteTodo(todo._id)}
                        />
                        {todo.item}
                      </List.Item>
                    )}
                  />
                </div>
                {/* </Layout> */}
              </Unsplash>

              {/* <div id="container">
                <div className="outer">
                  <div id="timerOuter" className="outer">
                    <div id="timerInner" className="most-inner">
                      <span>
                        <h1>Timer</h1>
                        {!this.state.totalTime && (
                          <CountdownTimer count={0} hideDay />
                        )}
                        {this.state.totalTime && (
                          <CountdownTimer
                            count={this.state.totalTime}
                            hideDay
                          />
                        )}
                        {this.timesUp}
                      </span>
                    </div>
                  </div>

                  <div id="alarmOuter" className="outer">
                    <div id="alarmInner" className="most-inner">
                      <h1>Alarm</h1>

                      {this.state.alarm}
                    </div>
                  </div>

                  <div className="inner">
                    <div className="most-inner">
                      <span
                        className={
                          this.state.time === "00:00:00" ? "time blink" : "time"
                        }
                      >
                        {" "}
                        <h1 style={{ fontSize: ".5em" }}>Current Time</h1>
                        {this.state.time}
                      </span>
                      <span className="amPm">{this.state.amPm}</span>
                    </div>
                  </div>
                </div>
              </div> */}
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
