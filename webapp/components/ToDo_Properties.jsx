import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';


export default class ToDo_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
    };
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handleClose( )
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  }

  _handleOK( )
  {
    this.props.updateHandler( {
      ToDo_Text: this.refs.ToDo_Text.getValue( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  }

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="ToDo"
          actions={ [
            <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handleClose.bind( this ) } />,
            <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handleOK.bind( this ) } />,
          ] }
        >
          <TextField
            ref="ToDo_Text"
            defaultValue={ this.props.ToDo_Text }
            floatingLabelText="To Do"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}
