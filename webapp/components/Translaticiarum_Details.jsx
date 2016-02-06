import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

export default class Translaticiarum_Details extends React.Component
{
  _handleOK( )
  {

  }

  render( )
  {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={ this._handleOK.bind( this ) }
      />,
    ];

    return(
      <Dialog
        title="Translaticiarum"
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={this.handleClose}
      >
        Open a Date Picker dialog from within a dialog.
        <DatePicker hintText="Date Picker" />
      </Dialog>
    );
  }
}
