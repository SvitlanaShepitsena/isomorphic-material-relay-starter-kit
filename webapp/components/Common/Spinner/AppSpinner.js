import React, {PropTypes} from 'react';
import Spinner from 'material-ui/lib/circular-progress';

class AppSpinner extends React.Component {
    static propTypes = {
        size: PropTypes.string
    };

    render() {
        var {size} = this.props;
        return (
            <div style={{textAlign:"center"}}>
                <Spinner size={size ? size : 1.2}/>
            </div>
        );
    }
}

export default  AppSpinner;
