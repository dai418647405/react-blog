import React, { Component, PropTypes } from 'react';
import {Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';

const { SubMenu } = Menu;
const LayoutHeader = Layout.Header;
const menus = [
    {name: 'Home', path: 'home', icon: 'appstore'},
    {name: 'RemoteAPI', path: 'joke', icon: 'appstore'},
    {name: 'PostList', path: 'post', icon: 'appstore'},
    {name: 'PostListDemo', path: 'post/demo', icon: 'appstore'},
    {name: 'Stack', path: 'path3', icon: 'appstore'},
    {name: 'Stack', path: 'path4', icon: 'appstore'},
    {name: 'Stack', path: 'path5', icon: 'appstore'},
    {name: 'Stack', path: 'path6', icon: 'appstore'}
];


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <LayoutHeader className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        {this.props.menus.map(item => {
                        return (
                            <Menu.Item key={item.path}>
                                <Link to={item.path}>
                                    {item.icon ? <Icon type={item.icon}/> : false} {item.name}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                    </Menu>
                </LayoutHeader>
        );
    }
}

Header.propTypes = {};

Header.defaultProps = {menus};

export default Header;