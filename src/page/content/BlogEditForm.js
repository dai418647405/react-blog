import React, {Component, PropTypes} from 'react';
import { message, Alert, Row, Form, Icon, Button, Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
import Req from '../../Req';

let typeList = [];
class BlogEditorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleList : []
        };
    }

    componentWillMount() {
        console.log('start componentWillMount');
        this.loadTitleList();
        this.loadTypeList();
    }

    componentDidMount() {
        console.log('start componentDidMount');
    }

    loadTitleList() {
        console.log('start loadTitleList');
        const url = '/api/blog/title/list';
        const params = {};
        Req.get(url, params ,res => {
            console.log('loadTitleList result =' + res.toString());
            if (res.code == 200) {
                this.setState({titleList : res.data});
            }
        });
        console.log('end loadTitleList');
    }

    loadTypeList() {
        console.log('start loadTypeList');
        const url = '/api/blog/type/list';
        const params = {};
        Req.get(url, params ,res => {
            // console.log('loadTypeList result =' + res.toSource());
            if (res.code == 200) {
                // this.setState({typeList : res.data});
                typeList = res.data;
            }
        });
        console.log('end loadTypeList');
    }

    handleSelectChange(value) {
        console.log('start handleSelectChange value=' + value);
        //如果不是编辑新文章
        if (value != 0) {
            this.loadBlogById(value);
        } else {
            this.props.form.setFieldsValue({'blogId': '0', 'title': '', 'htmlContent': ''
                , 'author': '', 'seq': '', 'type': ''});
        }
        console.log('end handleSelectChange value=' + value);
    }

    loadBlogById(blogId) {
        console.log('start loadBlogById blogId=' + blogId);
        const url = '/api/blog/get/' + blogId;
        const params = {};
        Req.get(url, params ,res => {
            console.log('loadBlogById result =' + res.toString());
            if (res.code == 200) {
                const blog = res.data;
                this.props.form.setFieldsValue({'blogId': blog.blogId.toString(), 'title': blog.title, 'htmlContent': blog.htmlContent
                    , 'author': blog.author, 'seq': blog.seq, 'type': blog.type.toString()});
            }
        });
        console.log('end loadBlogById blogId=' + blogId);
    }

    handleSubmit(e) {
        console.log('start handleSubmit');
        e.preventDefault();
        this.props.form.validateFieldsAndScroll();

        const allFieldsValue = this.props.form.getFieldsValue();
        // console.log('all fields value = ' + allFieldsValue.toSource());
        let params = {
            blogId: allFieldsValue.blogId,
            title : allFieldsValue.title,
            htmlContent: allFieldsValue.htmlContent,
            author: allFieldsValue.author,
            tag: allFieldsValue.tag,
            type: allFieldsValue.type,
            seq: allFieldsValue.seq,
            publishTime: allFieldsValue.publishTime
        };
        const url = '/api/blog/add/' + allFieldsValue.token;
        Req.put(url, params, res => {
            console.log('submit result =' + res.toString());
            const blogId = res.data;
            if (res.code == 200 && blogId != -1) {
                // console.log('data from server' + res.data);
                message.success('提交成功');
                this.loadTitleList();
                this.props.form.setFieldsValue({'blogId': blogId.toString()});
            } else {
                message.error('提交失败');
            }
        });
        console.log('end handleSubmit');
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
            <Row>
                <Col span={4} offset={9}><h1>博客撰写</h1></Col>
            </Row>
            <br/>
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem>
                    <Col span="2" offset={1}>
                        <FormItem>
                            {getFieldDecorator('blogId', {rules: [{required: true}], initialValue: '0'}) (
                                <Select onSelect={this.handleSelectChange.bind(this)}>
                                    <Option value='0' key="title-0">新文章</Option>
                                    {(this.state.titleList || []).map(
                                        item => <Option value={item.blogId + ''} key={'title-' + item.blogId}>{item.title}</Option>
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem>
                            {getFieldDecorator('title', {rules: [{required: true, message: '标题不能为空'}], initialValue: ''}) (
                                <Input placeholder="标题input"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span="2" offset={1}>
                        <FormItem>
                            {getFieldDecorator('author', {initialValue: ''}) (
                                <Input placeholder="作者"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span="3" offset={1}>
                        <FormItem>
                            {getFieldDecorator('type', {rules: [{required: true, message: '类型不能为空'}], initialValue: ''}) (
                                <Select>
                                    {(typeList || []).map(
                                        item => <Option value={item.typeId + ''} key={'type-' + item.typeId}>{item.typeName}</Option>
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span="1" offset={1}>
                        <FormItem>
                            {getFieldDecorator('seq', {initialValue: ''}) (
                                <InputNumber placeholder="序号"/>
                            )}
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem>
                    <Col span="7" offset={1}>
                        {getFieldDecorator('token', {rules: [{required: true, message: 'token不能为空'}], initialValue: ''}) (
                            <Input placeholder="Token" />
                        )}
                    </Col>
                </FormItem>
                <FormItem>
                    <Col span="18" offset={1}>
                        {getFieldDecorator('htmlContent', {rules: [{required: true, message: '内容不能为空'}], initialValue: ''}) (
                            <Input type="textarea" rows={20}/>
                        )}
                    </Col>
                </FormItem>
                <FormItem>
                    <Col offset={9}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                    </Col>
                </FormItem>
            </Form>
                {console.log('render render render')}
            </div>
        );
    }

}

BlogEditorForm.propTypes = {
};

BlogEditorForm.defaultProps = {};

export default Form.create({})(BlogEditorForm);