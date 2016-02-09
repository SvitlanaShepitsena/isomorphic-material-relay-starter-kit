import React from 'react';
import Relay from 'react-relay';

import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './House_List.jsx';
import {isomorphicVars} from '../../scripts/isomorphicVars';

class Home_Screen extends React.Component {
    render() {
        var isoVars = isomorphicVars();
        console.log(isoVars);
        console.log(this.props.Viewer);
        return (
            <div>

                {this.props.Viewer.Houses.edges.map((edge, index) => {
                    console.log(edge);
                    return (
                        <div key={index}>
                            {edge.node.street}
                            {edge.node.price}
                        </div>
                    )
                })}

            </div>
        );
    }
}
;

export default Relay.createContainer(Home_Screen, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        Houses(first: 10) {
          edges {
            node {
              id,
              street,
              price
            },
          },
        },
      }
    `,
    },
});
