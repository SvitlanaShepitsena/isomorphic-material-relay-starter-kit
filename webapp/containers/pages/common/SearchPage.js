import React from 'react';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import SearchOptions from '../../../components/Search/SearchOptions/SearchOptions.js';
import H1Header from '../../../components/Common/H1Header/H1Header.js';

class SearchPage extends React.Component {

    pageHelmet() {
        let helmetProps = settings.metaProps;
        let appUrl = helmetProps.appUrl;

        const pageTitle = "Find your dream home. Northern Illinois Homes for Sale.";
        const pageDescription = "North Chicago Suburbs Residential Real Estate. Search by city, zip or address. Call our professional brokers for a free consultation.";
        const pageImage = helmetProps.fbImage;
        const pageUrl = `${appUrl}/search`;

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
                <H1Header>
                    Northern Illinois Residential Real Estate
                </H1Header>
                <SearchOptions/>
            </div>
        );
    }
}
;

export default SearchPage;
