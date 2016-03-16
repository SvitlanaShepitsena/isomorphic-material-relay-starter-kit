import React from 'react';
import {Link} from 'react-router';
import settings from '../../../settings/settings.js';
/*=styles*/
import styles from './FooterContent.less';

class FooterContent extends React.Component {

    render() {
        const address1 = `${settings.companyAddress}`;
        const address2 = `${settings.companyCity} ${settings.companyState} ${settings.companyZip}`;
        const phone = `Phone: ${settings.companyPhone}`;
        const fax = `Fax: ${settings.companyFax}`;
        return (
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <section className={styles.section}>
                        <h3 className={styles.sectionHeader}>{settings.companyName}</h3>
                        <p>{address1}</p>
                        <p>{address2}</p>
                        <p>{phone}</p>
                        <p>{fax}</p>
                    </section>
                    <section className={styles.section}>
                        <h3 className={styles.sectionHeader}>Keep in touch</h3>
                        <p><a target="_blank" href={settings.links.facebook}>Facebook</a></p>
                        <p><a target="_blank" href={settings.links.google}>Google Plus</a></p>
                        <p><a target="_blank" href={settings.links.linkedin}>LinkedIn</a></p>
                        <p><a target="_blank" href={settings.links.twitter}>Twitter</a></p>
                    </section>
                    <section className={styles.section}>
                        <h3 className={styles.sectionHeader}>Do you like our
                            company?</h3>
                        <p><Link to="/about">About Us</Link></p>
                        <p><Link to="/terms">Terms of use</Link></p>
                        <p><Link to="/privacy">Privacy Policy</Link></p>
                    </section>
                </div>
            </footer>
        );
    }
}
export default FooterContent;
