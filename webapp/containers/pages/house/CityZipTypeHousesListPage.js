import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';

/*Components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';
import _ from "lodash";

class CityZipTypeHousesListPage extends React.Component {
    state = {compare: true};

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
        let houses = this.props.Viewer.Houses.edges;
        let housesCount = this.props.Viewer.Houses_Count;
        let {city, type, page, zipType} = this.props.params;

        /*Formatter*/
        const cityName = urlToText(city);
        const housesType = urlToText(type);

        const pageTitle = `${cityName}, ${zipType} ${housesType} listings for sale | North Illinois Realty | Page ${page}`;
        const ogDescription = `✔ Browse ${cityName}, ${zipType} ${housesType} houses for sale. ${housesCount} listings for today. ☏  Let us guide you! Call us for a free consultation and schedule a showing!  | Page ${page}`;
        const pageImage = `${settings.citiesPath}${cityName}2.jpg`;

        return (
            <Helmet
                title={pageTitle}
                meta={[
                    {"name": "description", "content": `${ogDescription}`},
                    {"name": "image", "content": `${pageImage}`},

                    {"property": "og:title", "content": `${title}`},
                    {"property": "og:description", "content": `${ogDescription}`},
                    {"property": "og:image", "content": `${pageImage}`}
                ]}
            />
        );
    };

    render() {
        let {routes, params}= this.props;
        let houses = this.props.Viewer.Houses;
        let houseCount = this.props.Viewer.Houses_Count;
        let {city, type, zipType} = this.props.params;
        /*Formatter*/
        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(type);

        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={routes} params={params}/>
                <h1>{`${typeFormatted} for Sale in ${cityFormatted}, ${zipType}`}</h1>
                {!houses && <Spinner/> }
                {houses &&
                <HousesList
                    list={houses}
                    count={houseCount}
                    cityName={cityFormatted}/>
                }
                <br/>
            </div>
        );
    }
}
;
export default Relay.createContainer(CityZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: '', page: null},
    prepareVariables({city, zip, type, page}) {
        if (_.last(type) === 's') {
            type = type.substr(0, type.length - 1);
        }
        page = Number(page);
        return {city, zip, type, page}
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses_Count(city:$city,zip:$zip,type:$type)
                Houses(city:$city,zip:$zip,type:$type, first:100,page:$page){
                    edges{
                        node{
                            id
                            city
                            zip
                            type
                            price
                            built
                            street
                            mls
                            beds
                            description
                            image
                        }
                    }
                }
            }
        `,
    },
});