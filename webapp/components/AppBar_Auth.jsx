import React from 'react';
import Relay from 'react-relay';

import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Divider from 'material-ui/lib/divider';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import IconSocialPerson from 'material-ui/lib/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/lib/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/lib/linear-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Popover from 'material-ui/lib/popover/popover';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import { postXHR } from '../scripts/XHR';

const styles = {
  popover: {
    padding: 10,
  },
};


class AppBar_Auth extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_UserNameAndPassword_IsOpen: false,
      Dialog_LoginInProgress_IsOpen: false,
      Dialog_LoginFaulure_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    };
  }

  _handle_Open_Dialog_UserNameAndPassword( )
  {
    this.setState( {
      Dialog_UserNameAndPassword_IsOpen: true
    } );
  }

  _handleUserNameEnterKeyDown( )
  {
    this.refs.Password.focus( );
  }

  _handlePasswordEnterKeyDown( )
  {
    this._handleLogInOK( );
  }

  _handleLogInOK( )
  {
    this.setState( {
      Dialog_UserNameAndPassword_IsOpen: false,
      Dialog_LoginInProgress_IsOpen: true,
    } );

    var loc = window.location;
    var host = loc.protocol + "//" + loc.hostname + ":" + loc.port;

    postXHR(
      host + '/auth',
      {
        username: this.refs.username.getValue( ),
        password: this.refs.password.getValue( ),
      },
      ( response ) => this._handleAuthSuccess( response ),
      ( response ) => this._handleAuthFailure( response )
    );
  }

  _handleLogInCancel( )
  {
    this.setState( {
      Dialog_UserNameAndPassword_IsOpen: false
    } );
  }

  _handleLoggingInCancel( )
  {
    this.setState( {
      Dialog_LoginInProgress_IsOpen: false
    } );
  }

  _handleAuthSuccess( response )
  {
    try{
      let responseJSON = JSON.parse( response );
      if( responseJSON.success != true ) throw new Error( "Login failed" );
    } catch( err ) { _handleAuthFailure( 1 ); return; }

    location.replace( location.href );
  }

  _handleAuthFailure( response )
  {
    let message;
    try{
      let responseJSON = JSON.parse( response );
      message = responseJSON.error;
    } catch( err ) { message = "Improper server response"; }

    this.setState( {
      Dialog_LoginInProgress_IsOpen: false,
      Dialog_LoginFaulure_IsOpen: true,
      Dialog_LoginFaulure_Message: message,
    } );
  }

  _handleLogInFaulureCancel( )
  {
    this.setState( {
      Dialog_LoginFaulure_IsOpen: false
    } );
  }

  _handle_AuthorizedUserIcon_TouchTap = ( event ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  };

  _handle_Popover_AuthorizedUser_LogInAsADifferentUser = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this._handle_Open_Dialog_UserNameAndPassword( );
  };

  _handle_Popover_AuthorizedUser_LogOut = ( ) =>
  {
    // Since the cookie is an HTTP ONLY cookie, it can not be changed from the client.
    // A Request to the server will be required to log out
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.replace( location.href );
  };

  _handle_Popover_AuthorizedUser_Close = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  };

  Dialog_UserNameAndPassword( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_UserNameAndPassword_IsOpen }
        title="Log In"
        actions={ [
          <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleLogInCancel.bind( this ) } />,
          <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleLogInOK.bind( this ) } />,
        ] }
      >
        <TextField
          ref="username"
          floatingLabelText="E-Mail"
          fullWidth={ true }
          onEnterKeyDown={ this._handleUserNameEnterKeyDown.bind( this ) }
        />
        <TextField
          ref="password"
          type="password"
          floatingLabelText="Password"
          fullWidth={ true }
          onEnterKeyDown={ this._handlePasswordEnterKeyDown.bind( this ) }
        />
      Valid user name/combinations are: jack/secret jill/birthday
      </Dialog>
    );
  }

  Dialog_LoginInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LoginInProgress_IsOpen }
        title="Logging In ..."
        actions={ [
          <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleLoggingInCancel.bind( this ) } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  Dialog_LoginFaulure( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LoginFaulure_IsOpen }
        title="Login failed"
        actions={ [
          <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleLogInFaulureCancel.bind( this ) } />,
        ] }
      >
        { this.state.Dialog_LoginFaulure_Message }
      </Dialog>
    );
  }

  Popover_AuthorizedUser( )
  {
    return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
      >
        <div style={styles.popover}>
          <List subheader="Logged In as">
            <ListItem
              primaryText={ this.props.Viewer.User_DisplayName }
              leftAvatar={<Avatar src={ this.props.Viewer.User_ProfilePhoto } />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Profile" />
            <ListItem primaryText="Settings" />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="Log in as a different user" onTouchTap={ this._handle_Popover_AuthorizedUser_LogInAsADifferentUser } />
            <ListItem primaryText="Log out" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );
  }

  render( )

  {
    if( this.props.Viewer.User_IsAnonymous )
      return(
      <div>
       <spa>Sodi huy</spa>
        <IconButton key='login' tooltip="Log In"onTouchTap={ this._handle_Open_Dialog_UserNameAndPassword.bind( this ) }>
          <IconSocialPersonOutline />
          { this.Dialog_UserNameAndPassword( ) }
          { this.Dialog_LoginInProgress( ) }
          { this.Dialog_LoginFaulure( ) }
        </IconButton>
      </div>
      );
    else
      // User has already logged in
      return(
        <IconButton key='login' tooltip="Log In"onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
          <IconSocialPerson />
          { this.Popover_AuthorizedUser( ) }
          { this.Dialog_UserNameAndPassword( ) }
          { this.Dialog_LoginInProgress( ) }
          { this.Dialog_LoginFaulure( ) }
        </IconButton>
      );
  }
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Relay.createContainer( AppBar_Auth, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        User_DisplayName,
        User_ProfilePhoto,
      }
    `,
  },
});
