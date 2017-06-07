import React, { Component, PropTypes } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import Req from '../../Req';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {article : ''};
    }

    componentWillReceiveProps() {
        console.log('start componentWillReceiveProps');
        this.loadBlogById(this.props.params.articleId);
    }

    loadBlogById(blogId) {
        console.log('start loadBlogById blogId=' + blogId);
        const url = '/api/blog/get/' + blogId;
        const params = {};
        Req.get(url, params ,res => {
            console.log('loadBlogById result =' + res.toString());
            if (res.code == 200) {
                const blog = res.data;
                this.setState({article : blog.htmlContent});
            }
        });
        console.log('end loadBlogById blogId=' + blogId);
    }

    render() {
        return (
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <div dangerouslySetInnerHTML={{__html: this.state.article}}></div>
            </Content>
        );
    }
}

Article.propTypes = {};

Article.defaultProps = {
};

export default Article;
