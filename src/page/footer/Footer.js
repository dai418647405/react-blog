import React, { Component, PropTypes } from 'react';
import { Layout} from 'antd';
const LayoutFooter = Layout.Footer;

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <LayoutFooter style={{ textAlign: 'center' }}>
                ZONE
            </LayoutFooter>
        );
    }
}

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
