import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import ListingThumbInline from '../../components/ListingThumb/ListingThumbInline.js';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class CitiesRent extends React.Component {
    render() {
        var isoVars = isomorphicVars();
        const cityName = _.startCase(this.props.params.city);
        

        return (
            <div>
                <h1>Houses for Rent</h1>
                {this.props.Viewer.Houses.edges.map((edge, index) => {
                    return (
                        <div key="index">
                            <ListingThumbInline city={cityName}/>
                            <br/>
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