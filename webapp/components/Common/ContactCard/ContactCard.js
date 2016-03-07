import React, {PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import plusone from 'material-ui/lib/svg-icons/social/plus-one';

/*=styles*/
import mui from '../../../settings/AppMuiTheme.js';
import settings from '../../../settings/settings.js';

class ContactCard extends React.Component {
    static propTypes = {};

    render() {
        const company = `${settings.companyName} Realty`;
        const address = `${settings.companyAddress}, ${settings.companyCity} ${settings.companyState} ${settings.companyZip}`

        return (
            <Card style={{textAlign:'center',width:"auto",maxWidth:300, margin:"0 auto"}}>
                <h3 style={{margin:0,padding:16,backgroundColor: mui.palette.default3Color,fontSize: 18,fontWeight:500}}>
                    {company}
                </h3>
                <section >
                    <p>{address}</p>
                    <p>Phone: {settings.companyPhone}</p>
                    <p>Fax: {settings.companyFax}</p>
                </section>
                <CardActions>
                    <FlatButton label="Facebook"/>
                    <FlatButton label="Google Plus"/>
                </CardActions>
            </Card>
        );
    }
}
export default ContactCard;
