'use strict';
import React, {Component, PropTypes} from 'react';

/*MaterialUI*/
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import AutoComplete from '../../../node_modules/material-ui/lib/auto-complete';
import styles from './SearchFormSimple.less';

import {browserHistory} from 'react-router'

class SearchFormSimple extends Component {

    search = ()=> {
        if (this.state.query.length) {

            browserHistory.push({pathname: '/search/' + this.state.query});
        }
    };

    state = {
        query: ''
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
        const {search, onSearch} = this.props;
        let skokieLocation = null;

        if (process.env.BROWSER) {
            skokieLocation = new google.maps.LatLng(42.0324, -87.7416);

        }
        return (
            <div className={styles.container}>
                <form className={styles.form} name="form" id="form">
                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <input
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
export default  SearchFormSimple;
