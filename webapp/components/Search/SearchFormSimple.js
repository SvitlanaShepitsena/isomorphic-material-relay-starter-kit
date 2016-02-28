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
        return (
            <div className={styles.container}>
                <form name="form" id="form" style={{padding:"4px 8px"}}>
                    <div className={styles.row}>
                        <div className={styles.input}>
                            <AutoComplete
                                hintText={<span><i className="fa fa-search"/> <span>Address, City, Zip, #MLS</span> </span>}
                                dataSource={this.state.dataSource}
                                fullWidth={true}
                                onUpdateInput={this.handleUpdateInput}
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <RaisedButton
                                className={styles.button}
                                fullWidth={true}
                                label="Search"
                                primary={true}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default  SearchFormSimple;
