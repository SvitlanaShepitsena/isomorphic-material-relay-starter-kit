import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import CitiesList from '../../../components/City/CitiesList/CitiesList.js';
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
        let og = settings.metaProps.housesForSalePage;
        let appUrl = settings.metaProps.appUrl;
        const url = `${appUrl}/houses-for-sale`;
        const title = og.title;
        const metaDescription = og.description;
        const image = settings.metaProps.fbImage;
        return (
            <Helmet
                title={title}
                meta={[
                    {"name": "url", "content": `${url}`},
                    {"name": "description", "content": `${metaDescription}`},
                    {"name": "image", "content": `${image}`},

                    {"property": "og:url", "content": `${url}`},
                    {"property": "og:title", "content": `${title}`},
                    {"property": "og:description", "content": `${metaDescription}`},
                    {"property": "og:image", "content": `${image}`}
                ]}
            />
        );
    };

    render() {
        let allCities = this.props.Viewer.Cities.edges;
        return (
            <div>
                {this.pageHelmet()}
                <h1> North Chicago Suburbs Houses for Sale </h1>
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
