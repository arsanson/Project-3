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
  Checkbox
} from "antd";
import "antd/dist/antd.css";
import "../../beforeLogin.css";

class index extends Component {
  state = {
    visible: false,
    timerTime: "",
    timerValue: "",
    hrs: "",
    alarm: "00:00:00",
    isTimerPaused: true
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  // Timer
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Timer
  startTimer = () => {
    this.setState({ hrs: this.state.hrs });

    

    // const intervalIdhrs = setInterval(() => {
    //   console.log(this.state.hrs);
    //   if (this.state.hrs === 0) clearInterval(intervalIdhrs);
    //   else
    //     this.setState({
    //       isTimerPaused: false,
    //       hrs: this.state.hrs - 1
    //     });
    // }, 1000 * 60 * 60);

    this.setState({ timerTime: this.state.min });
    
    // const intervalIdMin = setInterval(() => {
    //   console.log(this.state.timerTime);
    //   if (this.state.timerTime === 0) clearInterval(intervalIdMin);
    //   else
    //     this.setState({
    //       isTimerPaused: false,
    //       timerTime: this.state.timerTime - 1
    //     });
    // }, 1000 * 60);

    this.setState({ timerValue: this.state.seconds });
    const intervalId = setInterval(() => {
      console.log(this.state.timerValue);
      if (this.state.timerValue === 0) {
        clearInterval(intervalId);
      } else
        this.setState({
          isTimerPaused: false,
          timerValue: this.state.timerValue - 1
        });
    }, 1000);

    if (this.state.timerValue === 0 && this.state.timerTime === 0) {
      this.setState({
        timerValue: this.state.timerValue === 0,
        timerTime: this.state.timerTime === 0
      });
    } 

    if (this.state.TimerTime===0 && this.state.timerValue===0 && this.state.hrs===1){
        alert("what")
        // this.setState({
        //     timerTime: (this.state.min=60),
        //     timerTime: (this.state.min-=1),
        //     hrs: (this.state.hrs===0)
        // })
    }
    
  };

  //  Clock

  getInitialState = () => {
    return {
      time: "00:00:00",
      amPm: "am"
    };
  };

  componentDidMount = () => {
    this.loadInterval = setInterval(this.getTime, 1000);
  };

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

  // Clock

  render() {
    if (this.state.timerValue === 0 && this.state.timerTime != 0) {
      this.setState({
        timerValue: (this.state.timerValue = 60),
        timerValue: (this.state.timerValue -= 1),
        timerTime: (this.state.min -= 1)
      });
    }
    //  if (this.state.TimerTime===0 && this.state.timerValue===0 && this.state.hrs===1){
    //     alert("is it working?")
    //     this.setState({
    //         timerTime: (this.state.min=60),
    //         timerTime: (this.state.min-=1),
    //         hrs: (this.state.hrs===0)
    //     })
    // }


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

            <Menu.Item key="2">Create Account</Menu.Item>
            <Menu.Item key="3" style={{ position: "absolute", left: "50%" }}>
              <Icon type="play-circle" theme="twoTone" />
            </Menu.Item>
            <Menu.Item key="4" style={{ position: "absolute", left: "52%" }}>
              <Icon type="pause-circle" theme="twoTone" />
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <Drawer
            title="Login"
            placement="left"
            closable={false}
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
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
            {/*Sidebar PopOut Login-Form--------------------------------------------------------------------------------------------- */}

            {/* Sidebar Date/Time Set----------------------------------------------------------------------------------------------- */}
          </Drawer>
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
              <div id="container">
                <div className="outer">
                  <div id="timerOuter" className="outer">
                    <div id="timerInner" className="most-inner">
                      <span>
                        <h1>Timer</h1>
                        {this.state.hrs}:{this.state.timerTime}:
                        {this.state.timerValue}
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
              </div>
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
