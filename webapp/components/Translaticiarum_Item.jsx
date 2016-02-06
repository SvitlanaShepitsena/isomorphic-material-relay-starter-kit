import React from 'react';
import Relay from 'react-relay';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';


import ActionAccountBalance from 'material-ui/lib/svg-icons/action/account-balance'; // Speak in senate
import ActionAccessibility from 'material-ui/lib/svg-icons/action/accessibility'; // Exercise
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all'; // Get things done
import ActionTrendingUp from 'material-ui/lib/svg-icons/action/trending-up'; // Play the stock market
import ContentCreate from 'material-ui/lib/svg-icons/content/create'; // Write poems
import HardwareHeadset from 'material-ui/lib/svg-icons/hardware/headset'; // Listen to music
import ImageLandscape from 'material-ui/lib/svg-icons/image/landscape'; // Hike

import dateFromUTCString from '../scripts/dateFromUTCString'

import Translaticiarum_deleteMutation from '../mutations/Translaticiarum_deleteMutation';
import Translaticiarum_updateMutation from '../mutations/Translaticiarum_updateMutation';

import Translaticiarum_Properties from './Translaticiarum_Properties.jsx';


class Translaticiarum_Item extends React.Component
{
  _Translaticiarum_update( Translaticiarum_properties )
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_updateMutation( { Translaticiarum: this.props.Translaticiarum, ...Translaticiarum_properties } )
    );
  }

  _Translaticiarum_delete( )
  {
    Relay.Store.commitUpdate(
      new Translaticiarum_deleteMutation( { Translaticiarum: this.props.Translaticiarum, Viewer: this.props.Viewer } )
    );
  }

  _handleTouchTap( e, item )
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        this.refs.Translaticiarum_Properties._handle_Open( );
        break;
      case 'delete':
        console.log( 'delete' );
        this._Translaticiarum_delete( );
        break;
      default:
        break;
    }
  }

  render( )
  {
    const theDate = dateFromUTCString( this.props.Translaticiarum.Translaticiarum_Date );
    const theTime = dateFromUTCString( this.props.Translaticiarum.Translaticiarum_Time );
    const theDateTime = new Date( theDate.getTime( ) + theTime.getTime( ) );

    const theType = this.props.Translaticiarum.Translaticiarum_Type;
    let itemIcon;
    if( theType == 1 ) itemIcon = <ActionAccountBalance />; // Speak in senate
    else if( theType == 2 ) itemIcon = <ActionAccessibility />; // Exercise
    else if( theType == 3 ) itemIcon = <ActionDoneAll />; // Get things done
    else if( theType == 4 ) itemIcon = <ActionTrendingUp />; // Speak in senate
    else if( theType == 5 ) itemIcon = <ActionTrendingUp />; // Play the stock market
    else if( theType == 6 ) itemIcon = <ContentCreate />; // Write poems
    else if( theType == 7 ) itemIcon = <HardwareHeadset />; // Listen to music
    else if( theType == 8 ) itemIcon = <ImageLandscape />; // Hike

    const rightIconMenu = (
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
          leftIcon={ itemIcon }
          primaryText={ theDateTime.toUTCString( ) }
          rightIconButton={ rightIconMenu }
        />
        <Translaticiarum_Properties
          ref="Translaticiarum_Properties"
          Translaticiarum_Type={ this.props.Translaticiarum.Translaticiarum_Type }
          Translaticiarum_Date={ this.props.Translaticiarum.Translaticiarum_Date }
          Translaticiarum_Time={ this.props.Translaticiarum.Translaticiarum_Time }
          updateHandler={ this._Translaticiarum_update.bind( this ) }
        />
      </div>
    );
  }
}

export default Relay.createContainer( Translaticiarum_Item, {
  fragments: {
    Translaticiarum: () => Relay.QL`
      fragment on Translaticiarum {
        id,
        Translaticiarum_Date,
        Translaticiarum_Time,
        Translaticiarum_Type,
        ${Translaticiarum_deleteMutation.getFragment('Translaticiarum')},
        ${Translaticiarum_updateMutation.getFragment('Translaticiarum')},
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Translaticiarum_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
} );
