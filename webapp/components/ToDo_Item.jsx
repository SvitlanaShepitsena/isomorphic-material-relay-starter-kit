import React from 'react';
import Relay from 'react-relay';

import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

import ToDo_updateStatusMutation from '../mutations/ToDo_updateStatusMutation';
import ToDo_deleteMutation from '../mutations/ToDo_deleteMutation';
import ToDo_updateRenameMutation from '../mutations/ToDo_updateRenameMutation';

import ToDo_Properties from './ToDo_Properties.jsx';

class ToDo_Item extends React.Component
{
  _ToDo_update( ToDo_properties )
  {
    Relay.Store.commitUpdate(
      new ToDo_updateRenameMutation( { ToDo: this.props.ToDo, ...ToDo_properties } )
    );
  }

  _handleCompletedCheck( event, ToDo_Complete )
  {
    Relay.Store.commitUpdate(
      new ToDo_updateStatusMutation({
        ToDo_Complete,
        ToDo: this.props.ToDo,
        Viewer: this.props.Viewer,
      })
    );
  }

  _handleTextInputSave( ToDo_Text )
  {
    Relay.Store.commitUpdate(
      new ToDo_updateRenameMutation({ToDo: this.props.ToDo, ToDo_Text})
    );
  }

  _ToDo_delete( )
  {
    Relay.Store.commitUpdate(
      new ToDo_deleteMutation({ToDo: this.props.ToDo, Viewer: this.props.Viewer})
    );
  }

  _handleTouchTap( e, item )
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        this.refs.ToDo_Properties._handle_Open( );
        break;
      case 'delete':
        console.log( 'delete' );
        this._ToDo_delete( );
        break;
      default:
        break;
    }
  }

  render( )
  {
    let rightIconMenu = (
     <IconMenu
       iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
       onItemTouchTap={ this._handleTouchTap.bind( this ) }
      >
       <MenuItem ref="edit" index={0}>Edit</MenuItem>
       <MenuItem ref="delete" index={1}>Delete</MenuItem>
     </IconMenu>
   );

    return (
      <div>
        <ListItem
          primaryText={ this.props.ToDo.ToDo_Text }
          leftCheckbox={
            <Checkbox
              defaultChecked={ this.props.ToDo.ToDo_Complete }
              onCheck={ this._handleCompletedCheck.bind( this ) }
            />
          }
          rightIconButton={ rightIconMenu }
        />
        <ToDo_Properties
          ref="ToDo_Properties"
          ToDo_Text={ this.props.ToDo.ToDo_Text }
          updateHandler={ this._ToDo_update.bind( this ) }
        />
      </div>
    );
  }
}

export default Relay.createContainer( ToDo_Item, {
  fragments: {
    ToDo: () => Relay.QL`
      fragment on ToDo {
        ToDo_Complete,
        id,
        ToDo_Text,
        ${ToDo_updateStatusMutation.getFragment('ToDo')},
        ${ToDo_deleteMutation.getFragment('ToDo')},
        ${ToDo_updateRenameMutation.getFragment('ToDo')},
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${ToDo_updateStatusMutation.getFragment('Viewer')},
        ${ToDo_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
} );
