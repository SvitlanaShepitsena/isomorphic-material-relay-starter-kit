import React, {PropTypes} from 'react';
import Breadcrumbs from 'react-breadcrumbs';

class AppBreadcrumbs extends React.Component {

    render() {
        return (
            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <br/>
            </div>
        );
    }
}
;
export default AppBreadcrumbs;
