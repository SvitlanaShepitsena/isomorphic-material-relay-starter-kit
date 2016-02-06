import React from 'react';
import Relay from 'react-relay';

//import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
//import Tabs from 'material-ui/lib/tabs/tabs';
//import Tab from 'material-ui/lib/tabs/tab';

import Translaticiarum_Item from './Translaticiarum_Item.jsx';

class Translaticiarum_List extends React.Component
{
  renderTranslaticiarums( )
  {
    return this.props.Viewer.Translaticiarums.edges.map(edge =>
      <Translaticiarum_Item
        key={edge.node.id}
        Translaticiarum={edge.node}
        Viewer={this.props.Viewer}
      />
    );
  }

/*
  _handleTabsChange( value )
  {
    this.context.router.push( '/Translaticiarums/' + value );
  }

  renderTabs( )
  {
    return(
      <Tabs valueLink={ { value: this.props.relay.variables.status, requestChange: this._handleTabsChange.bind( this ) } }>
        <Tab label="All" value="any" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
    );
  }
  { this.renderTabs( ) }
  */

  render( )
  {
    return (
      <div>
        <List>
          { this.renderTranslaticiarums( ) }
        </List>
      </div>
    );
  }
}

/*
Translaticiarum_List.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
*/

export default Relay.createContainer( Translaticiarum_List, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Translaticiarums(first: 2147483647) {
          edges {
            node {
              id,
              ${Translaticiarum_Item.getFragment('Translaticiarum')},
            },
          },
        },
        ${Translaticiarum_Item.getFragment('Viewer')},
      }
    `,
  },
});
