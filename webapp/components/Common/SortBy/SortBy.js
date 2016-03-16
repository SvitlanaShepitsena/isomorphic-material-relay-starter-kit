import React, {PropTypes} from 'react';

/*=materialUi*/
import SelectField from '../../../../node_modules/material-ui/lib/select-field';
import MenuItem from '../../../../node_modules/material-ui/lib/menus/menu-item';

class SortBy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div>
                <SelectField
                    floatingLabelText="Sort By:"
                    value={this.state.value}
                    onChange={this.handleChange}>
                    <MenuItem value={1} primaryText="New Listings First"/>
                    <MenuItem value={2} primaryText="Lowest Price"/>
                    <MenuItem value={3} primaryText="Highest Price"/>
                </SelectField>
            </div>
        );
    }
}

export default  SortBy;
