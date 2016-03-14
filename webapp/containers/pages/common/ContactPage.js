import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import ContactForm from '../../../components/AppViews/Contact/ContactForm.js';
import ContactCard from '../../../components/Common/ContactCard/ContactCard.js';
import ContactMap from '../../../components/ContactMap/ContactMap.js';

class ContactPage extends React.Component {
    pageHelmet() {
        let helmetProps = helmetProps;
        let {pageTitle, pageDescription} = helmetProps.contactPage;

        let appUrl = helmetProps.appUrl;
        const pageImage = helmetProps.fbImage;
        const pageUrl = `${appUrl}/contact`;
        return (
            <Helmet
                title={pageTitle}
                meta={[
                    {"name": "url", "content": `${pageUrl}`},
                    {"name": "description", "content": `${pageDescription}`},
                    {"name": "image", "content": `${pageImage}`},

                    {"property": "og:url", "content": `${pageUrl}`},
                    {"property": "og:title", "content": `${pageTitle}`},
                    {"property": "og:description", "content": `${pageDescription}`},
                    {"property": "og:image", "content": `${pageImage}`}
                ]}
            />
        );
    };

    render() {
        return (
            <div>
                {this.pageHelmet()}
                <ContactCard/>
                <br/>
                <ContactMap/>

                {/*                <ContactForm/>*/}
            </div>
        );
    }
}
;

export default ContactPage;
