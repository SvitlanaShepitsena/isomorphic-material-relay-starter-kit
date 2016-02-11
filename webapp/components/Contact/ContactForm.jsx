import React from 'react';
import Relay from 'react-relay';
import settings from '../../settings/settings.js';
import {Link} from 'react-router';

/*MaterialUI*/
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';

export default class ContactForm extends React.Component {

    render() {
        return (
            <form>
                <Card className="ContactForm__Card">
                    <CardTitle title="Send a message"/>
                    <CardText>
                        <TextField style={{width:"100%"}} floatingLabelText="Name"/>
                        <br/>
                        <TextField style={{width:"100%"}} floatingLabelText="Email"/>
                        <br/>
                        <TextField style={{width:"100%"}}
                                   multiLine={true}
                                   floatingLabelText="Message"
                                   rows={3}
                        />

                    </CardText>
                    <CardActions>
                        <FlatButton
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
