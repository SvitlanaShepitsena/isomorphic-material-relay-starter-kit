import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import SvLink from '../../components/Shared/SvLink';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class CitiesSale extends React.Component {

    static childContextTypes:{
        location: React.PropTypes.object
        };

    getChildContext() {
        return {location: this.props.location}
    }

    render() {
        var isoVars = isomorphicVars();
        console.log(this.context);
        console.log(this.props);
        return (
            <div>
                Houses for SALE
                <ul >
                    {this.props.Viewer.Cities.edges.map((city, index)=>
                        <li key={city.node.name}>
                            <SvLink url={city.node.name} />

                        </li>
                    )}
                </ul>
                <hr/>
                <SvLink url="hoffman estates">
                    <img style={{width:200}}
                         src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Skokie,_Illinois.jpg"/>
                </SvLink>
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
