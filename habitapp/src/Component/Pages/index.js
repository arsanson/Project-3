import React, { Component } from "react"
import { Layout, Menu, Breadcrumb, Icon, Drawer, Button } from 'antd'
import 'antd/dist/antd.css'

export default class index extends Component {
    state = { visible: false };

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

    render() {
        const { SubMenu } = Menu;
        const { Header, Content, Footer, Sider } = Layout;

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
                            title="Basic Drawer"
                            placement="left"
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                            style={{width: "100px"}}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
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
