import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import PrivacyContent from '../../../components/AppViews/Privacy/PrivacyContent.js';

class PrivacyPage extends React.Component {
    pageHelmet() {
        let og = settings.metaProps.privacyPolicyPage;
        let appUrl = settings.metaProps.appUrl;
        const url = `${appUrl}/privacy`;
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
                <PrivacyContent/>
            </div>
        );
    }
}
;

export default PrivacyPage;