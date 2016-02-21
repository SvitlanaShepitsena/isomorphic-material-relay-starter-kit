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
import SelectMenu from './../Common/SelectMenu/SelectMenu';

class SearchFormInline extends Component {

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
                        <div className="three columns">
                            <AutoComplete
                                hintText={<span><i className="fa fa-search"/> <span>Address, City, Zip, #MLS</span> </span>}
                                dataSource={this.state.dataSource}
                                fullWidth={true}
                                onUpdateInput={this.handleUpdateInput}
                            />
                        </div>
                        <div className="nine columns">
                            <div className="two columns">
                                <SelectMenu
                                    labelText="Min Price"
                                    selectOptionText="$20,000"
                                />
                            </div>
                            <div className="two columns">
                                <SelectMenu
                                    labelText="Max Price"
                                    selectOptionText="$10,000,000"
                                />
                            </div>
                            <div className="two columns">
                                <SelectMenu
                                    labelText="Beds"
                                    selectOptionText="1+ Beds"
                                />
                            </div>
                            <div className="two columns">
                                <SelectMenu
                                    labelText="Baths"
                                    selectOptionText="1+ Baths"
                                />
                            </div>
                            <div className="one column SearchForm__button-container">
                                <RaisedButton
                                    className="SearchForm__button"
                                    label="Search" primary={true}/>
                            </div>
                        </div>
                    </div>
                </form>
            </Paper>
        );
    }
}
export default  SearchFormInline;
