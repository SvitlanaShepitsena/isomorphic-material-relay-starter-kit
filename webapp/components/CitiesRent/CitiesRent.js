import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import House_List from './../HouseSale/House_List.jsx';
import {isomorphicVars} from '../../scripts/isomorphicVars';

class CitiesRent extends React.Component {
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
                            <h1>Houses for Rent</h1>
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                        </div>
                    )
                })}

            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesRent, {
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