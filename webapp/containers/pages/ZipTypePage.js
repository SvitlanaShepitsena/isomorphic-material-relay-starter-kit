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

class ZipTypePage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city,
            zipType: this.props.params.zipType
        })
    }

    render() {
        var isoVars = isomorphicVars();
        return (

            <div>
                <h2>Houses for Sale </h2>
                <ul>
                    {this.props.Viewer.Houses.edges.map((edge, index) => {
                        const house = edge.node;
                        return (
                            <li key={index}>
                                <SvLink url={house.street}>
                                    {house.street}

                                </SvLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypePage, {
    initialVariables: {city: '', zipType: ''},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
         Houses(city:$city,zipType:$zipType,first:100) {
          edges {
            node {
          price
            },
          },
        },
      }
    `,
    },
});