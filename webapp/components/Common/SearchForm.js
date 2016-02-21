'use strict';
import React, {Component, PropTypes} from 'react';

/*MaterialUI*/
import Button      from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';

class SearchForm extends Component {

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
export default  SearchForm;
