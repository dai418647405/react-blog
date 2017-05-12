import { Table, Button } from 'antd';
import React, {Component, PropTypes} from 'react';
import { Tabs, Switch} from 'antd';
import './css/postlist.css';
import {Hex} from 'react-hui';

const TabPane = Tabs.TabPane;

const data = [{
    key: '11',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '22',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '33',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '44',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
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
            pagination: {
                current : 1,
                pageSize : 20,
                total:200
            },
            loading: false,
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.loadPostList(this.state.curTopicSectionId, this.state.curSortType, this.state.pagination);
    }

    handlePageChange(pagination) {
        console.log('handlePageChange start, pagination=' + pagination);
        const pager = pagination;
        // this.setState({
        //     pagination: pager,
        // });
        this.loadPostList(this.state.curTopicSectionId, this.state.curSortType, pager);
        console.log('handlePageChange end');
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
            pagination : pagination
        });
    };

    handleTabChange(activeKey, type) {
        console.log('handleTabChange start: activeKey=' + activeKey + '&type=' + type);
        let curTopicSectionId = this.state.curTopicSectionId;
        let curSortType = this.state.curSortType;
        if (type == 1) {
            this.setState({curTopicSectionId : activeKey});
            curTopicSectionId = activeKey;
        }
        if (type == 2) {
            this.setState({curSortType : activeKey});
            curSortType = activeKey;
        }
        this.loadPostList(curTopicSectionId, curSortType, this.state.pagination);
        console.log('handleTabChange end');
    }

    loadPostList(curTopicSectionId, curSortType, pager) {
        console.log('loadPostList start: curTopicSectionId=' + curTopicSectionId + '&curSortType=' + curSortType + '&pager=' + pager);
        this.setState({ loading: true });
        const url = '/api/latest/joke/img?page=';
        const params = {
            sectionId : curTopicSectionId,
            sortType : curSortType,
            pager: pager
        };
        // Hex.get(url, params ,data => {
        //     console.log('result =' + data);
        //     this.setState({data : data.data.postList, pagination : data.data.pager, loading: false});
        // });
        this.setState({data : data, pagination : pager, loading: false});
    }

    render() {
        return (
        <div className="card-container">
            <Tabs type="card" defaultActiveKey="1" onChange={(activeKey) => this.handleTabChange(activeKey, 1)}>
                <TabPane tab="话题类型 a" key="1" />
                <TabPane tab="话题类型 b" key="2" />
                <TabPane tab="话题类型 c" key="3" />
            </Tabs>
            <Tabs defaultActiveKey="101" className="sort_card_bar" onChange={(activeKey) => this.handleTabChange(activeKey, 2)}>
                <TabPane tab="排序方式 1" key="101" />
                <TabPane tab="排序方式 2" key="102" />
                <TabPane tab="排序方式 3" key="103" />
            </Tabs>
            <div style={{background: 'white'}}>
                <Table columns={columns}
                       rowKey={record => record.key}
                       dataSource={data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       onChange={this.handlePageChange.bind(this)}
                />
            </div>
            {console.log('render pagination:' + this.state.pagination)}
        </div>
        );
    }
}

PostListDemo.propTypes = {};

PostListDemo.defaultProps = {};

export default PostListDemo;