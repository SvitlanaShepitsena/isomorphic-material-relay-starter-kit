import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

class Breadcrumbs extends React.Component {
    static contextTypes = {

        route: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired
        
    };

    render() {

        console.log(this.context);
        return (
            <div>
                Breadcrumbs

            </div>
        );
    }
}
export default Breadcrumbs;
