import React, { Component } from "react"
import { Layout, Menu, Breadcrumb, Icon, Drawer, Form, Input, Button, Checkbox } from 'antd'
import 'antd/dist/antd.css'
import Auth from "../../utils/Auth";

class index extends Component {

    state = {
        visible: false,
        username: '',
        password: ''
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) console.log(err);
            const { username, password } = values;
            if (username && password) {
                Auth.logIn(username, password, (response) => {
                    this.context.setUser(response);
                    this.props.history.push("/");
                });
            }
        });
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { SubMenu } = Menu;
        const { Header, Content, Footer, Sider } = Layout;

        const { getFieldDecorator } = this.props.form;

        return (
            <Layout style={{ height: '100vh' }}>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1" onClick={this.showDrawer}>Login</Menu.Item>


                        <Menu.Item key="2">Create Account</Menu.Item>
                        <Menu.Item key='3' style={{ position: 'absolute', left: '50%' }}>
                            <Icon type="play-square" />
                        </Menu.Item>
                        <Menu.Item key='4' style={{ position: 'absolute', left: '52%' }}>
                            <Icon type="pause-circle" />
                        </Menu.Item>


                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
                    <Drawer
                        title="Login"
                        placement="left"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={350}
                    >

                        {/* ------ Log-in Form ------ */}
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                        name="username"
                                        onChange={this.changeHandler}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={this.changeHandler}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="http://google.com">
                                    Forgot password
                                    </a><br></br>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                    </Button>
                            </Form.Item>
                        </Form>


                    </Drawer>
                    <Layout style={{ height: '100%', padding: '24px 0', background: '#fff' }}>
                        <Sider width={300} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}>

                                <Menu>
                                    <Menu.Item key="1" >
                                        <span>
                                            <Icon type="schedule" />
                                            September 18, 2019
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
                        <Content style={{ padding: '0 24px', minHeight: 280, textAlign: 'center', fontSize: '2em' }}>Todo List</Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright © 2019 Gatech Bootcamp Project 3</Footer>
            </Layout >
        )
    }
}

export default Form.create()(index);