import React, {PropTypes} from 'react';
import settings from '../../../settings/settings.js';
import Card from 'material-ui/lib/card/card';
/*=styles*/
import muiPalette from '../../../settings/MuiPalette.js';

class ContactCard extends React.Component {
    static propTypes = {};

    render() {
        const company = `${settings.companyName} Realty`;
        const address = `${settings.companyAddress}, ${settings.companyCity} ${settings.companyState} ${settings.companyZip}`
        const h1 = {
            backgroundColor: muiPalette.palette.default3Color,
            fontSize: 18,
            fontWeight: 500,
            margin: 0,
            padding: 16
        }

        const card = {
            margin: '0 auto',
            maxWidth: 300,
            textAlign: 'center',
            width: 'auto'
        }

        return (
            <Card style={card}>
                <h1 style={h1}>
                    {company}
                </h1>
                <div style={{paddingTop:8}}>
                    <p>{address}</p>
                    <p>Phone: {settings.companyPhone}</p>
                    <p>Fax: {settings.companyFax}</p>
                </div>
            </Card>
        );
    }
}
export default ContactCard;
