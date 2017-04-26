import React, { Component, PropTypes } from 'react';
import { Layout } from 'antd';
import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';

class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Layout>
                <Header/>
                {this.props.children || <Home/>}
                <Footer/>
            </Layout>
        );
    }
}

Master.propTypes = {};

Master.defaultProps = {};

export default Master;
