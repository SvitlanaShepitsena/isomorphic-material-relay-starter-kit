import React from 'react';
import Relay from 'react-relay';

import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class CitiesSale extends React.Component {
    render() {
        var isoVars = isomorphicVars();
        console.log(isoVars);
        console.log(this.props.Viewer);
        return (
            <div>
                Houses for SALE!2
                <ul>
                    {this.props.Viewer.Cities.edges.map((city,index)=>
                        <li key={city.node.id}>
                            {city.node.name}

                        </li>
                    )}
                </ul>
            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesSale, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        Cities(first: 15) {
          edges {
            node {
            id,
              name
            },
          },
        },
      }
    `,
    },
});
