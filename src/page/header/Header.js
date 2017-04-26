import React, { Component, PropTypes } from 'react';
import {Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';

const { SubMenu } = Menu;
const LayoutHeader = Layout.Header;
const menus = [
    {name: '首页', path: 'home', icon: 'mail'},
    {name: '品牌管理', path: 'brands', icon: 'mail'},
    {name: '特色标签', path: 'tags', icon: 'appstore'},
    {name: '点评摘要', path: 'summaries', icon: 'setting'},
    {name: '点评头条', path: 'articles', icon: 'setting'},
    {name: '舆情分析', path: 'opinions', icon: 'setting'},
    {name: '媒体影视', path: 'medias', icon: 'appstore'},
    {name: '明星艺人', path: 'stars', icon: 'mail'}
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