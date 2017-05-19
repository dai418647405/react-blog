import { Table, Button } from 'antd';
import React, {Component, PropTypes} from 'react';
import { Tabs, Switch} from 'antd';
import './css/postlist.css';
import {Hex} from 'react-hui';
import Util from '../../Util';

const TabPane = Tabs.TabPane;

const columns = [{
    title: <h3>主题</h3>,
    dataIndex: 'title',
    key: 'title',
    // width: 600,
    render: (text, record) => <h3><a target="_blank" href={record.link}>{text}</a></h3>
}, {
    title: <h3>回复/浏览</h3>,
    dataIndex: 'replyCount',
    key: 'replyCount/pageViewCount',
    render: (text, record) => <h3>{text} / {record.pageViewCount}</h3>
}, {
    title: <h3>最后回复时间</h3>,
    dataIndex: 'lastReplyTime',
    key: 'lastReplyTime',
    render: text => <h3>{Util.format(new Date(text), 'yyyy-MM-dd HH:mm')}</h3>
}, {
    title: <h3>发表时间</h3>,
    dataIndex: 'publishTime',
    key: 'publishTime',
    render: text => <h3>{Util.format(new Date(text), 'yyyy-MM-dd HH:mm')}</h3>
}];

class PostList extends Component {
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

    handleTabChange(activeKey, type) {
        console.log('handleTabChange start: activeKey=' + activeKey + '&type=' + type);
        let curTopicId = this.state.curTopicId;
        let curSortType = this.state.curSortType;
        if (type == 1) {
            this.setState({curTopicId : activeKey.split('-')[1]});
            curTopicId = activeKey.split('-')[1];
        }
        if (type == 2) {
            this.setState({curSortType : activeKey.split('-')[1]});
            curSortType = activeKey.split('-')[1];
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
                console.log('data from server' + data.data.dataList);
                this.setState({data : data.data.dataList, pagination : data.data.pager, loading: false});
            } else {
                this.setState({pagination : pager, loading: false});
            }
        });
    }

    render() {
        return (
        <div className="card-container">
            <Tabs type="card" defaultActiveKey="topic-1" onChange={(activeKey) => this.handleTabChange(activeKey, 1)}>
                <TabPane tab="湿乎乎" key="topic-1" />
                <TabPane tab="步行街" key="topic-2" />
                <TabPane tab="电影" key="topic-3" />
            </Tabs>
            <Tabs defaultActiveKey="sortType-3" className="sort_card_bar" onChange={(activeKey) => this.handleTabChange(activeKey, 2)}>
                <TabPane tab="今日最热" key="sortType-3" />
                <TabPane tab="过去三天最热" key="sortType-4" />
                <TabPane tab="最新发表" key="sortType-2" />
                <TabPane tab="最新回复" key="sortType-1" />
                <TabPane tab="过去七天最热" key="sortType-5" />
                <TabPane tab="历史最热" key="sortType-6" />
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

PostList.propTypes = {};

PostList.defaultProps = {};

export default PostList;