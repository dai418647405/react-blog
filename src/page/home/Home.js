import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const menu1 = {
    menuInfo:{title:'Java', icon:'user'},
    menuItems:[
        {name: 'java_1', path: '/home/blog/1'},
        {name: 'java_2', path: '/home/blog/2'},
        {name: 'java_3', path: 'home1' },
        {name: 'java_4', path: 'home2'},
        {name: 'java_5', path: 'home3'},
        {name: 'java_6', path: 'home4'},
        {name: 'java_7', path: 'home5'},
        {name: 'java_8', path: 'home6'}
    ]
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const menuInfo1 = this.props.menu1.menuInfo;
        const menuItems1 = this.props.menu1.menuItems;

        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                <Menu.Item key="1"><Link to='/home/editor'>option1</Link></Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                            <SubMenu key={menuInfo1.title} title={<span><Icon type={menuInfo1.icon} />{menuInfo1.title}</span>}>
                                {menuItems1.map(item => {
                                    return (
                                        <Menu.Item key={item.path}>
                                            <Link to={item.path}>{item.name}</Link>
                                        </Menu.Item>);
                                    })
                                }
                            </SubMenu>
                        </Menu>
                    </Sider>
                    {this.props.children}
                </Layout>
            </Content>
        );
    }
}

Home.propTypes = {};

Home.defaultProps = {
    menu1
};

export default Home;

