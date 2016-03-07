import React, {PropTypes} from 'react';

/*=MaterialUi*/
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

/*styles*/
import styles from './SelectMenu.less';
class SelectMenu extends React.Component {
    static propTypes = {
        labelText: PropTypes.string.isRequired,
        selectOptionText: PropTypes.string.isRequired
    };
    state = {value: null};

    handleChange = (event, index, value) => this.setState({value});

    render() {
        var innerDivStyle = {
            padding: "0px 10px",
            maxWidth: "50px",
            fontSize: 13

        };
        var labelText = this.props.labelText;
        var selectOptionText = this.props.selectOptionText;
        return (
            <SelectField
                autoWidth={true}
                fullWidth={true}
                floatingLabelText={<span style={{fontSize:14}} >{labelText}</span>}
                value={this.state.value}
                onChange={this.handleChange}>
                <MenuItem
                    className={styles.menuItem}
                    innerDivStyle={innerDivStyle}
                    value={1}
                    primaryText={selectOptionText}/>
            </SelectField>
        );
    }
}

export default  SelectMenu;
