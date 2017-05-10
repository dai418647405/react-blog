import React, {Component, PropTypes} from 'react';
import {Card} from 'antd';

class JokeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokeList: [{content: 'a'}]
        };
    }

    render() {
        return (
            <Card style={{ width: 280 }} bodyStyle={{ padding: 0 }}>
                <div>
                    <img alt="img" style={{display: 'block'}} width="100%" src={this.props.url} />
                </div>
                <div style={{ padding:'10px 16px' }}>
                    <h3>{this.props.content}</h3>
                </div>
            </Card>
        );
    }

}

JokeCard.propTypes = {
    url : PropTypes.string.isRequired,
    content : PropTypes.string.isRequired
};

JokeCard.defaultProps = {};

export default JokeCard;