import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import SvLink from '../../components/Shared/SvLink';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class HousePage extends React.Component {
    getChildContext() {
        return {location:this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };
    // componentDidMount() {
    //     this.props.relay.setVariables({
    //         id: this.props.params.street
    //     })
    // }

    render() {
        var isoVars = isomorphicVars();
        return (

            <div>
                House 1
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,

      }
    `,
    },
});