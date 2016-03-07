import React from 'react';
import {Link} from 'react-router';
import settings from '../../../settings/settings.js';
/*=styles*/
import styles from './FooterContent.less';

class FooterContent extends React.Component {

    render() {
        return (
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <section className={styles.section}>
                        <h3 className={styles.sectionHeader}>{settings.companyName}</h3>
                        <p>{settings.companyAddress}</p>
                        <p>{settings.companyPhone}</p>
                        <p>{settings.companyFax}</p>
                    </section>
                    <section className={styles.section}>
                        <h3 className={styles.sectionHeader}>Keep in touch</h3>
                        <p><a target="_blank" href={settings.links.facebook}>Facebook</a></p>
                        <p><a target="_blank" href={settings.links.google}>Google Plus</a></p>
                        <p><a target="_blank" href={settings.links.linkedin}>LinkedIn</a></p>
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
