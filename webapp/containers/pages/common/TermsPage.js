import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import TermsContent from '../../../components/AppViews/Terms/TermsContent.js';

class TermsPage extends React.Component {
    pageHelmet() {
        let og = settings.ogProps.termsOfUsePage;
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
                <TermsContent/>
            </div>
        );
    }
}
;

export default TermsPage;