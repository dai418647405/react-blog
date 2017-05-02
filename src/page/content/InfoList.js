import React, {Component, PropTypes} from 'react';
import {Card} from 'antd';
import Global from '../../Global';
import {Hex} from 'react-hui';

const token = Global.avatarDataToken;

class InfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokeList: [{content: 'a'}]
        };
    }

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadJokeFromServer() {

    }

    loadDataFromServer() {
        const url = '/api/latest/joke/img?page=1&rows=20';
        // const url = '/Joke/NewstImg?key=540fba0a7acc4c3f8ab2ba4cf3db923b&page=1&rows=10';
        Hex.get(url, data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div>ddd</div>
            // this.state.jokeList.map(item =>
            //     <div style={{margin:'0 auto'}}><Card title={item.content}>卡片内容</Card></div>
            // )
        );
    }

}

InfoList.propTypes = {};

InfoList.defaultProps = {};

export default InfoList;
