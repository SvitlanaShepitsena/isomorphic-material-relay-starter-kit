'use strict';
import React, {Component, PropTypes} from 'react';

/*MaterialUI*/
import Paper from '../../../node_modules/material-ui/lib/paper';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import AutoComplete from '../../../node_modules/material-ui/lib/auto-complete';
import styles from './SearchFormSimple.less';

class SearchFormSimple extends Component {

    state = {
        dataSource: [],
    };

    handleUpdateInput = (t) => {
        this.setState({
            dataSource: [t, t + t, t + t + t],
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
                                hintText={<span className={styles.hText}>Address, City, Zip, #MLS</span>}
                                dataSource={this.state.dataSource}
                                fullWidth={true}
                                onUpdateInput={this.handleUpdateInput}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <RaisedButton
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
