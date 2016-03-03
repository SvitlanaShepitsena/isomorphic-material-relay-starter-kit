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
        let cities = settings.ogProps.housesForSalePage;
        const citiesUrl = cities.url;
        const citiesTitle = cities.title;
        const citiesDescription = cities.description;
        const fbImage = settings.ogProps.fbImage;
        return (
            <Helmet
                title={citiesTitle}
                meta={[
                    {"name": "url", "content": `${citiesUrl}`},
                    {"name": "description", "content": `${citiesDescription}`},
                    {"name": "image", "content": `${fbImage}`},

                    {"property": "og:url", "content": `${citiesUrl}`},
                    {"property": "og:title", "content": `${citiesTitle}`},
                    {"property": "og:description", "content": `${citiesDescription}`},
                    {"property": "og:image", "content": `${fbImage}`}
                ]}
            />
        );
    };

    render() {
        let allCities = this.props.Viewer.Cities.edges;
        let cities = allCities.length;

        return (
            <div>
                {this.pageHelmet()}
                <h1> North Chicago Suburbs Houses for Sale </h1>
                {!cities && <Spinner /> }
                {cities &&
                <CitiesList list={allCities} itemId="name" children="Houses"/>
                }
            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesSalePage, {
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first :100){
                    edges{
                        node{
                            name
                            Houses_Count
                        }
                    }
                }
            }
        `,
    },
});
