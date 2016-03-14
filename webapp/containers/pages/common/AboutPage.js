import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import AboutContent from '../../../components/AppViews/About/AboutContent.js';

class AboutPage extends React.Component {

    pageHelmet() {
        let helmet = settings.metaProps;
        let {pageTitle, pageDescription} = helmet.aboutPage;
        let appUrl = helmet.appUrl;
        const pageImage = helmet.fbImage;
        const pageUrl = `${appUrl}/about`;

        return (
            <Helmet
                title={title}
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
                <AboutContent/>
            </div>
        );
    }
}
;

export default AboutPage;
