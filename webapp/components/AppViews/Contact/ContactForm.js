import React from 'react';

/*=materialUI*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

/*=components*/
import settings from '../../../settings/settings.js';

class ContactForm extends React.Component {

    render() {
        return (
            <form >
                <Card>
                    <CardTitle title="Send a message"/>
                    <CardText>
                        <TextField fullWidth={true} floatingLabelText="Name"/> <br/>
                        <TextField fullWidth={true} floatingLabelText="Email"/> <br/>
                        <TextField fullWidth={true} multiLine={true} floatingLabelText="Message" rows={3}/>
                    </CardText>
                    <CardActions>
                        <FlatButton
                            secondary={true}
                            type="submit">
                            Submit
                        </FlatButton>
                        <FlatButton
                            type="submit">
                            Clear
                        </FlatButton>
                    </CardActions>
                    <br/>
                </Card>
            </form>
        );
    }
}
export default ContactForm;
