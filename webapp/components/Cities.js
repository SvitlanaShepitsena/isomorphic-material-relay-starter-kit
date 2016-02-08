import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import House_List from './House_List.jsx';
import {isomorphicVars} from '../scripts/isomorphicVars';

class Cities extends React.Component {
    render() {
        var isoVars = isomorphicVars();
        console.log(isoVars);
        console.log(this.props.Viewer);
        return (
            <div>

                {Cities}

            </div>
        );
    }
}
;

export default Relay.createContainer(Cities, {
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
