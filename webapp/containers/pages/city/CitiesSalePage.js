import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import CitiesList from '../../../components/City/CitiesList/CitiesList.js';
import H1Header from '../../../components/Common/H1Header/H1Header.js';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

class CitiesSalePage extends React.Component {

    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route,
            params: this.props.routeParams,
        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    pageHelmet() {
        let helmetProps = settings.metaProps;
        let appUrl = helmetProps.appUrl;

        const {pageTitle, pageDescription} = helmetProps.housesForSalePage;
        const pageImage = helmetProps.fbImage;
        const pageUrl = `${appUrl}/homes-for-sale`;

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
        let allCities = this.props.Viewer.Cities.edges;
        return (
            <div>
                {this.pageHelmet()}
                <H1Header>North Chicago Suburbs Homes for Sale</H1Header>

                <CitiesList list={allCities} itemId="name" children="Houses"/>
            </div>
        );
    }
};

export default Relay.createContainer(CitiesSalePage, {
    initialVariables: {first: 100},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first:$first) {
                    edges{
                        node{
                            id
                            name,
                            count
                        }
                    }
                }
            }
        `,
    },
});
