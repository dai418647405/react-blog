import { Table, Button } from 'antd';
import React, {Component, PropTypes} from 'react';
import { Tabs, Switch} from 'antd';
import './css/postlist.css';
import {Hex} from 'react-hui';

const TabPane = Tabs.TabPane;

const data = [];

const columns = [{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    // width: 600,
    render: (text, record) => <h3><a target="_blank" href={record.link}>{text}</a></h3>
}, {
    title: 'ReplyCount/PageViewCount',
    dataIndex: 'replyCount',
    key: 'replyCount/pageViewCount',
    render: (text, record) => <h3>{text} / {record.pageViewCount}</h3>
}, {
    title: 'LastReplyTime',
    dataIndex: 'lastReplyTime',
    key: 'lastReplyTime',
    render: text => <h3>{PostListDemo.format(new Date(text), 'yyyy-MM-dd HH:mm')}</h3>
}, {
    title: 'PublishTime',
    dataIndex: 'publishTime',
    key: 'publishTime',
    render: text => <h3>{PostListDemo.format(new Date(text), 'yyyy-MM-dd HH:mm')}</h3>
}];

class PostListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curTopicId : 1,
            curSortType : 1,
            data: [],
            pagination: {
                current : 1,
                pageSize : 15,
                total:200,
                size: 'middle'
            },
            loading: false,
        };
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.loadPostList(this.state.curTopicId, this.state.curSortType, this.state.pagination);
    }

    handlePageChange(pagination) {
        console.log('handlePageChange start, pagination=' + pagination);
        const pager = pagination;
        this.loadPostList(this.state.curTopicId, this.state.curSortType, pagination);
        console.log('handlePageChange end');
    };

    // fetch(params = {}) {
    //     console.log('params:', params);
    //     this.setState({ loading: true });
    //     // reqwest({
    //     //     url: 'https://randomuser.me/api',
    //     //     method: 'get',
    //     //     data: {
    //     //         results: 10,
    //     //         ...params,
    //     //     },
    //     //     type: 'json',
    //     // }).then((data) => {
    //     //
    //     // });
    //     const pagination = this.state.pagination;
    //     // Read total count from server
    //     // pagination.total = data.totalCount;
    //     pagination.total = 200;
    //     this.setState({
    //         loading: false,
    //         data: data,
    //         pagination : pagination
    //     });
    // };


    handleTabChange(activeKey, type) {
        console.log('handleTabChange start: activeKey=' + activeKey + '&type=' + type);
        let curTopicId = this.state.curTopicId;
        let curSortType = this.state.curSortType;
        if (type == 1) {
            this.setState({curTopicId : activeKey});
            curTopicId = activeKey;
        }
        if (type == 2) {
            this.setState({curSortType : activeKey});
            curSortType = activeKey;
        }
        this.loadPostList(curTopicId, curSortType, this.state.pagination);
        console.log('handleTabChange end');
    }

    loadPostList(curTopicId, curSortType, pager) {
        console.log('loadPostList start: curTopicId=' + curTopicId + '&curSortType=' + curSortType + '&pager=' + pager);
        this.setState({ loading: true });
        const url = '/api/hupu/list';
        const params = {
            topicId : curTopicId,
            sortType : curSortType,
            current: pager.current,
            pageSize: pager.pageSize,
            total: pager.total
        };
        Hex.get(url, params ,data => {
            // console.log('result =' + data.toSource());
            if (data.code == 200) {
                console.log('datadata' + data.data.dataList);
                this.setState({data : data.data.dataList, pagination : data.data.pager, loading: false});
            } else {
                this.setState({pagination : pager, loading: false});
            }
        });
    }

    static format(date, fmt) { //author: meizz
        let o = {
            'M+' : date.getMonth() + 1,                 //月份
            'd+' : date.getDate(),                    //日
            'H+' : date.getHours(),                   //小时
            'm+' : date.getMinutes(),                 //分
            's+' : date.getSeconds(),                 //秒
            'q+' : Math.floor((date.getMonth() + 3) / 3), //季度
            'S'  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for(let k in o) {
            if(new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
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
                       size='small'
                       rowKey={record => record.articleId}
                       dataSource={this.state.data}
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