import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';

export default class AppBar_NavigationMenu extends React.Component
{
  _handleLeftMenuTouchTap( e, item )
  {
    this.context.router.push( item.key );
  }

  render( )
  {
    return(
      <IconMenu key="top-menu"
        anchorOrigin={ { vertical: "bottom" } }
        onItemTouchTap={ this._handleLeftMenuTouchTap.bind( this ) }
        iconButtonElement={
          <IconButton><NavigationMoreVert /></IconButton>
        }
      >
        <MenuItem key="/" primaryText="Home" />
        <MenuItem key="/compendiums" primaryText="Compendiums" />
        <MenuItem key="/mui" primaryText="MUI" />
        <MenuItem key="/mui/icons" primaryText="MUI Icons" />
        <MenuItem key="/ToDos" primaryText="To Do" />
        <MenuItem key="/Translaticiarums" primaryText="Translaticiarums" />
      </IconMenu>
    );
  }
}

AppBar_NavigationMenu.contextTypes = {
  router: React.PropTypes.object.isRequired
};
