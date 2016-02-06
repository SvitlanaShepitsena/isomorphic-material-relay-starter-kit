import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import TextField from 'material-ui/lib/text-field';

import ToDo_addMutation from '../mutations/ToDo_addMutation';

class ToDo_Screen extends React.Component
{
  _handleAddToDo( )
  {
    Relay.Store.commitUpdate(
      new ToDo_addMutation( {
        ToDo_Text: this.refs.addToDo.getValue( ),
        Viewer: this.props.Viewer
      } )
    );

    this.refs.addToDo.setValue( '' );
  }

  render( )
  {
    // TODO: Add button for clearing completed items
    return (
      <Card>

        <CardHeader title="TO DOs" subtitle="List of TO DOs for user" />

        { this.props.children }

        <div style={ { marginLeft: 4, marginRight: 4, } }>
          <TextField
            ref="addToDo"
            floatingLabelText="What needs to be done?"
            fullWidth={ true }
            onEnterKeyDown={ this._handleAddToDo.bind( this ) }
          />
        </div>

      </Card>
    );
  }
}

export default Relay.createContainer( ToDo_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
        ${ToDo_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
