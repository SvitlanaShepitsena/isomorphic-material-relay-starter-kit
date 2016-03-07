import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import ContactForm from '../../../components/AppViews/Contact/ContactForm.js';
import ContactCard from '../../../components/Common/ContactCard/ContactCard.js';
import ContactMap from '../../../components/ContactMap/ContactMap.js';

class ContactPage extends React.Component {
    pageHelmet() {
        let og = settings.ogProps.contactPage;
        const url = og.url;
        const title = og.title;
        const description = og.description;
        const image = og.fbImage;
        return (
            <Helmet
                title={title}
                meta={[
                    {"name": "url", "content": `${url}`},
                    {"name": "description", "content": `${description}`},
                    {"name": "image", "content": `${image}`},

                    {"property": "og:url", "content": `${url}`},
                    {"property": "og:title", "content": `${title}`},
                    {"property": "og:description", "content": `${description}`},
                    {"property": "og:image", "content": `${image}`}
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
