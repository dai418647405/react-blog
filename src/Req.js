import React, {Component, PropTypes} from 'react';

class Req extends Component {
    constructor(props) {
        super(props);
    }

    static validAny(any){
        return any !== null && any !== undefined;
    };


    static toQuery(object) {
        return Object.keys(object)
            .filter(key => Req.validAny(object[key]))
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
            .join('&');
    };
    
    static get(url, params, cb) {
        if (cb === undefined) {
            cb = params;
            params = undefined;
        }

        if (params !== undefined) {
            url = url + '?' + Req.toQuery(params);
        }

        fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(data => cb(data));
            }
        });
    };

    static post(url, params, cb) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(data => cb(data));
            }
        });
    };

    static put(url, params, cb) {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                res.json().then(data => cb(data));
            }
        });
    };
}


Req.propTypes = {};

Req.defaultProps = {};

export default Req;