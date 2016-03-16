import React, {PropTypes} from 'react';
import settings from '../../../settings/settings.js';
import Card from 'material-ui/lib/card/card';
/*=styles*/
import styles from './ContactCard.less';

class ContactCard extends React.Component {
    static propTypes = {};

    render() {
        const company = `${settings.companyName} Realty`;
        const address = `${settings.companyAddress}, ${settings.companyCity} ${settings.companyState} ${settings.companyZip}`

        return (
            <Card className={styles.card}>
                <h1 className={styles.h1}>
                    {company}
                </h1>
                <div className={styles.cardContent}>
                    <h2>{address}</h2>
                    <h3>Phone: {settings.companyPhone}</h3>
                    <h3>Fax: {settings.companyFax}</h3>
                </div>
            </Card>
        );
    }
}
export default ContactCard;
