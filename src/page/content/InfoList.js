import React, {Component, PropTypes} from 'react';
import JokeCard from './JokeCard';
import { Button } from 'antd';
import Req from '../../Req';

let page = 1;

class InfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jokeList: [],
            iconLoading:true
        };
    }

    componentDidMount() {
        page = 1;
        this.loadDataFromServer(1);
    }

    // componentDidUpdate() {
    //     if (this.state.iconLoading) {
    //         console.log('sss' + this.state.iconLoading);
    //         this.setState({ iconLoading: false });
    //     }
    // }

    getMore() {
        if (page < this.props.maxPage) {
            this.loadDataFromServer(++page);
        }
    }

    loadDataFromServer(page) {
        this.setState({ iconLoading: true });
        const url = '/api/latest/joke/img?page=' + page + '&rows=20';
        Req.get(url, data => {
            // console.log(data);
            this.setState({jokeList : data.data.result, iconLoading: false});
        });
    }

    render() {
        return (
            <div style={{margin:'0 auto',textAlign:'center'}}>
            {(this.state.jokeList || [])
                .map(item =>
                    (
                        <JokeCard key={item.hashId} url={item.url} content={item.content}>
                        </JokeCard>
                    ))}
                <Button type="primary" icon="down-circle" size="large" loading={this.state.iconLoading} onClick={this.getMore.bind(this)} >
                    换一批
                </Button>
            </div>
        );
    }

}

InfoList.propTypes = {};

InfoList.defaultProps = {
    maxPage : 10
};

export default InfoList;
