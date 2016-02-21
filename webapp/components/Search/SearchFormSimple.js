'use strict';
import React, {Component, PropTypes} from 'react';

/*MaterialUI*/
import Paper from '../../../node_modules/material-ui/lib/paper';
import RaisedButton from '../../../node_modules/material-ui/lib/raised-button';
import AutoComplete from '../../../node_modules/material-ui/lib/auto-complete';

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
            <Paper style={{padding:16}}>
                <form name="form" id="form" style={{padding:"4px 8px"}}>
                    <div className="row">
                        <div className="eight columns">
                            <AutoComplete
                                hintText={<span><i className="fa fa-search"/> <span>Address, City, Zip, #MLS</span> </span>}
                                dataSource={this.state.dataSource}
                                fullWidth={true}
                                onUpdateInput={this.handleUpdateInput}
                            />
                        </div>
                        <div className="four columns SearchForm__button-container">
                            <RaisedButton
                                className="SearchForm__button"
                                label="Search" primary={true}/>
                        </div>
                    </div>
                </form>
            </Paper>
        );
    }
}
export default  SearchFormSimple;
