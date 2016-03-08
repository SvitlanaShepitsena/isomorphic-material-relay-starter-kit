import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import AboutContent from '../../../components/AppViews/About/AboutContent.js';

class AboutPage extends React.Component {

    pageHelmet() {
        let og = settings.ogProps.aboutPage;
        let appUrl = settings.ogProps.appUrl;
        const url = `${appUrl}/about`;
        const title = og.title;
        const description = og.description;
        const image = settings.ogProps.fbImage;
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
                <AboutContent/>
            </div>
        );
    }
}
;

export default AboutPage;
