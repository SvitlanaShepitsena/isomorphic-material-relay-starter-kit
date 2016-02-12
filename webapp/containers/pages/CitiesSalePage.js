import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import SvLink from '../../components/Shared/SvLink';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class CitiesSale extends React.Component {

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    render() {
        var isoVars = isomorphicVars();
        return (
            <div>
                <h1>
                    Houses for Sale
                </h1>

                <hr/>

                <List
                    insetSubheader={true}
                >
                    {this.props.Viewer.Cities.edges.map((city, index)=>
                        <ListItem
                            leftAvatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Skokie,_Illinois.jpg"/>}
                            secondaryText={ <p> <span style={{color: Colors.darkBlack}}  > Median Price: </span> <br/> <span >#Listings: | </span> </p> }
                            secondaryTextLines={2}
                            rightIcon={<ActionInfo />} key={city.node.name}>
                            <SvLink url={city.node.name}/>
                        </ListItem>
                    )}
                </List>
                <hr/>
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
