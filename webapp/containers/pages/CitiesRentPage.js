import React from 'react';
import Relay from 'react-relay';

class CitiesRent extends React.Component {
    render() {
        return (
            <div>
                <h1>Houses for Rent</h1>

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