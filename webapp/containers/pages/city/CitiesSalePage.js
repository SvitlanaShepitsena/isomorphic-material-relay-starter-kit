import React, {PropTypes} from 'react';
import Relay from 'react-relay';
/*=Components*/
import settings from '../../../settings/settings.js';
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
        let helmet = settings.helmet;
        const homeType = helmet.appType;
        const homeUrl = helmet.appUrl;
        const homeDescription = helmet.appDescription;
        const homeTitle = helmet.appTitle;
        const fbImage = helmet.fbImage;
        return (
            <Helmet
                title={homeTitle}
                meta={[
                    {"name": "url", "content": `${citiesUrl}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${citiesDescription}`},
                    
                    {"property": "og:url", "content": `${citiesUrl}`},
                    {"property": "og:title", "content": `${citiesTitle}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${citiesDescription}`}
                ]}
            />
        );
    };

    render() {
        let allCities = this.props.Viewer.Cities.edges;
        let cities = allCities.length;

        return (
            <div>
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
