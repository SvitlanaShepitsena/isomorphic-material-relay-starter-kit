import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
/*=Components*/
import CitiesList from '../../../components/City/CitiesList/CitiesList.js';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

class CitiesSalePage extends React.Component {
    componentDidMount() {
        this.props.relay.setVariables({
            first: 100
        });
    }

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
        let og = settings.ogProps.housesForSalePage;
        const url = og.url;
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
        let allCities = this.props.Viewer.Cities.edges;
        let cities = allCities.length;
        return (
            <div>
                {this.pageHelmet()}
                <h1> North Chicago Suburbs Houses for Sale </h1>
                <CitiesList list={allCities} itemId="name" children="Houses"/>
            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesSalePage, {
    initialVariables: {first: 1},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first:$first) {
                    edges{
                        node{
                            name,
                            count
                        }
                    }
                }
            }
        `,
    },
});
