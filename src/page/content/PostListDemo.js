import { Table, Button } from 'antd';
import React, {Component, PropTypes} from 'react';
import { Tabs, Switch} from 'antd';
import './css/postlist.css';

const TabPane = Tabs.TabPane;

const data = [{
    key: '15',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '25',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '35',
    name: 'Joe Black',
    age: 33,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '45',
    name: 'Jim Red',
    age: 34,
    address: 'London No. 2 Lake Park',
}, {
    key: '55',
    name: 'Joe Black',
    age: 36,
    address: 'Sidney No. 1 Lake Park',
}];

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions
      </a>
    </span>
    ),
}];

class PostListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTopicSectionId : 1,
            curSortType : 1,
            data: [],
            pagination: {},
            loading: false,
        };
    }

    handleChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            filters
        });
    };

    fetch(params = {}) {
        console.log('params:', params);
        this.setState({ loading: true });
        // reqwest({
        //     url: 'https://randomuser.me/api',
        //     method: 'get',
        //     data: {
        //         results: 10,
        //         ...params,
        //     },
        //     type: 'json',
        // }).then((data) => {
        //
        // });
        const pagination = this.state.pagination;
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.setState({
            loading: false,
            data: data,
            pagination
        });
    };

    componentDidMount() {
        this.fetch();
    }

    handleTabChange(activeKey) {
        console.log('blanksssss' + activeKey);
    }

    render() {
        return (
        <div className="card-container">
            <Tabs type="card" defaultActiveKey="1" onChange={this.handleTabChange.bind(this)}>
                <TabPane tab="Tab a" key="1" >
                </TabPane>
                <TabPane tab="Tab b" key="2" />
                <TabPane tab="Tab c" key="3" />
            </Tabs>
            <Tabs defaultActiveKey="11" className="sort_card_bar">
                <TabPane tab="Tab 1" key="11" />
                <TabPane tab="Tab 2" key="22" />
                <TabPane tab="Tab 3" key="33" />
            </Tabs>
            <div style={{background: 'white'}}>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handleChange.bind(this)}
                />
            </div>
        </div>
        );
    }
}

PostListDemo.propTypes = {};

PostListDemo.defaultProps = {};

export default PostListDemo;