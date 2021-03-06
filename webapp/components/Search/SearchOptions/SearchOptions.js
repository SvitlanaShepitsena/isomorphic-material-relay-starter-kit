'use strict';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

/*MaterialUI*/
import RaisedButton from '../../../../node_modules/material-ui/lib/raised-button';
import AutoComplete from '../../../../node_modules/material-ui/lib/auto-complete';
import styles from './SearchOptions.less';

import {browserHistory} from 'react-router'

class SearchOptions extends Component {
    state = {query: ''};

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.search).focus();
    }

    search = ()=> {
        let searchUrl = `/search/${this.state.query}`;
        if (this.state.query.length) {
            browserHistory.push({pathname: searchUrl});
        }
    };

    handleUpdateInput = (event) => {
        this.setState({
            query: event.target.value
        });
    };

    handleKeyDown = (evt) => {
        if (evt.keyCode == 13) {
            return this.search();
        }
    };

    render() {
        let skokieLocation = null;
        if (process.env.BROWSER) {
            skokieLocation = new google.maps.LatLng(42.0324, -87.7416);
        }
        return (
            <div className={styles.container}>
                <form className={styles.form} name="form" id="form">
                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <input style={{width:"100%"}}
                                   type="text"
                                   ref="search"
                                   onKeyDown={this.handleKeyDown}
                                   onChange={this.handleUpdateInput}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <RaisedButton
                                onClick={this.search}
                                className={styles.button}
                                fullWidth={true}
                                label={<span> <i className="fa fa-search"/> <span className={styles.btnText}> Search </span> </span>}
                                primary={true}/>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}
export default  SearchOptions;
