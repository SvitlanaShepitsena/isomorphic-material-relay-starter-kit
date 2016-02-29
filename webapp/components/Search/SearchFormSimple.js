'use strict';
import React, {Component, PropTypes} from 'react';

/*MaterialUI*/
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import AutoComplete from '../../../node_modules/material-ui/lib/auto-complete';
import styles from './SearchFormSimple.less';

import {browserHistory} from 'react-router'

class SearchFormSimple extends Component {

    search = ()=> {
        browserHistory.push({pathname: '/search/' + this.state.query});
    };

    state = {
        dataSource: [],
        query: ''
    };

    handleUpdateInput = (t) => {
        console.log(t);
        this.setState({
            query: t,
            dataSource: [t + t, t + t + t]
        });
    };

    render() {
        const {search, onSearch} = this.props;
        return (
            <div className={styles.container}>
                <form className={styles.form} name="form" id="form" style={{padding:"4px 8px"}}>
                    <div className={styles.row}>
                        <div className={styles.inputContainer}>
                            <AutoComplete
                                hintText='Address, City, Zip, #MLS'
                                dataSource={this.state.dataSource}
                                fullWidth={true}
                                onUpdateInput={this.handleUpdateInput}
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
