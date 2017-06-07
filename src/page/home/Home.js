import React, { Component, PropTypes } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
import Req from '../../Req';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;


let type2TitleListVar = [];
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {type2TitleList : []};
    }

    componentWillMount() {
        console.log('start componentWillMount');
        this.loadTypeList();
    }

    loadTypeList() {
        console.log('start loadTypeList');
        let typeList = [];
        const url = '/api/blog/type/list';
        Req.get(url, {} ,res => {
            console.log('loadTypeList result =' + res.toString());
            if (res.code == 200) {
                // this.setState({typeList : res.data});
                typeList = res.data;
                typeList.map(item => {
                    type2TitleListVar[item.typeId] = {typeName : item.typeName, blogList : []};
                    }
                );
                console.log(type2TitleListVar.toString());
                this.setState({type2TitleList : type2TitleListVar});
                this.loadTitleList();
            }
        });
        console.log('end loadTypeList');
    }

    loadTitleList() {
        console.log('start loadTitleList');
        let titleList = [];
        const url = '/api/blog/title/list';
        const params = {};
        Req.get(url, params ,res => {
            console.log('loadTitleList result =' + res.toString());
            if (res.code == 200) {
                titleList = res.data;
                titleList.map(item => {
                    type2TitleListVar[item.type].blogList.push({blogId: item.blogId, blogTitle: item.title});
                    }
                );
                this.setState({type2TitleList : type2TitleListVar});
            }
            console.log(type2TitleListVar.toString());
        });
        console.log('end loadTitleList');
    }

    render() {
        return (
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                </Breadcrumb>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu mode="inline" style={{ height: '100%' }}>
                            {this.state.type2TitleList.map((item, index) => {
                                return (<SubMenu key={'subMenu-' + index} title={<span><Icon type="book" />{item.typeName}</span>}>
                                    {item.blogList.map((item) => {
                                        return (<Menu.Item key={'blog-' + item.blogId}><Link to={'/home/blog/' + item.blogId}>{item.blogTitle}</Link></Menu.Item>);
                                    })}
                                        </SubMenu>);
                                        })
                            }
                        </Menu>
                    </Sider>
                    {this.props.children || (<Content style={{ padding: '0 24px', minHeight: 200}}><div><h3>我的靴子里有条蛇～</h3></div></Content>)}
                </Layout>
                {console.log('render render render')}
            </Content>
        );
    }
}

Home.propTypes = {};

Home.defaultProps = {
};

export default Home;

