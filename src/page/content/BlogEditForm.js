import React, {Component, PropTypes} from 'react';
import { Row, Form, Icon, Button, Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class BlogEditorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    render() {
        return (
            <div>
            <Row>
                <Col span={4} offset={9}><h1>博客撰写</h1></Col>
            </Row>
            <br/>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <FormItem>
                    <Col span="2" offset={1}>
                        <FormItem>
                            <Select defaultValue="标题">
                                <Option value="Zhejiang">Zhejiang</Option>
                                <Option value="Jiangsu">Jiangsu</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem>
                            <Input placeholder="标题input" />
                        </FormItem>
                    </Col>
                    <Col span="2" offset={1}>
                        <FormItem>
                            <Input placeholder="作者" />
                        </FormItem>
                    </Col>
                    <Col span="3" offset={1}>
                        <FormItem>
                            <Select defaultValue="类型select" />
                        </FormItem>
                    </Col>
                    <Col span="1" offset={1}>
                        <FormItem>
                            <Input placeholder="序号" />
                        </FormItem>
                    </Col>
                </FormItem>
                <FormItem>
                    <Col span="7" offset={1}>
                        <Input placeholder="Token" />
                    </Col>
                </FormItem>
                <FormItem>
                    <Col span="18" offset={1}>
                        <Input type="textarea" rows={20}/>
                    </Col>
                </FormItem>
                <FormItem>
                    <Col offset={9}>
                        <Button type="primary" htmlType="submit" size="large">Register</Button>
                    </Col>
                </FormItem>
            </Form>
            </div>
        );
    }

}

BlogEditorForm.propTypes = {
};

BlogEditorForm.defaultProps = {};

export default BlogEditorForm;