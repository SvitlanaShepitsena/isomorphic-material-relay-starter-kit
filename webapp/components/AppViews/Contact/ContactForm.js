import React from 'react';
import Relay from 'react-relay';
import settings from '../../../settings/settings.js';
import {Link} from 'react-router';

/*MaterialUI*/
import Card from '../../../../node_modules/material-ui/lib/card/card';
import CardActions from '../../../../node_modules/material-ui/lib/card/card-actions';
import CardTitle from '../../../../node_modules/material-ui/lib/card/card-title';
import FlatButton from '../../../../node_modules/material-ui/lib/flat-button';
import CardText from '../../../../node_modules/material-ui/lib/card/card-text';
import TextField from '../../../../node_modules/material-ui/lib/text-field';

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
