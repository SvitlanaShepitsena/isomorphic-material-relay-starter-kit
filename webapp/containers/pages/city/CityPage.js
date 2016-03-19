import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
import urlToText from '../../../utils/urlToText.js';

/*=Components*/
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import ButtonAll from '../../../components/House/ButtonAll/ButtonAll.js';
import HousesListFiltered from '../../../components/House/HousesListFiltered/HousesListFiltered.js';
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import AppSpinner from '../../../components/Common/Spinner/AppSpinner.js';

class CityPage extends React.Component {
    getChildContext() {
        return {
            location: this.props.location,
            params: this.props.routeParams,
            route: this.props.route
        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city
        })
    };

    pageHelmet() {
        /*Formatter*/
        const cityName = urlToText(this.props.params.city);
        const pageImage = `${settings.citiesPath}${cityName}2.jpg`;

        const pageTitle = `${cityName} houses for sale | North Illinois Realty`;
        const pageDescription = `✔ Browse ${cityName} homes for sale, sorted by zip code or property type. ☏  Call us for a free consultation and schedule a showing!`;

        return (
            <Helmet
                title={pageTitle}
                meta={[
                    {"name": "description", "content": `${pageDescription}`},
                    {"name": "image", "content": `${pageImage}`},

                    {"property": "og:title", "content": `${pageTitle}`},
                    {"property": "og:description", "content": `${pageDescription}`},
                    {"property": "og:image", "content": `${pageImage}`}
                ]}
            />
        );
    };

    showByZip() {
        let {city} = this.props.params;
        let cityFormatted = urlToText(city);
        let zipsList = this.props.Viewer.City.Zips.edges;
        const zipsTitle = `${cityFormatted} Homes for Sale by Zip`
        return (
            <ZipTypeList itemId="__dataID__" list={zipsList} children="Houses"
                         sectionTitle={zipsTitle}/>
        );

    }

    showByType() {
        const cityFormatted = urlToText(this.props.params.city);
        let typesList = this.props.Viewer.City.Types.edges;

        let typesTitle = `${cityFormatted} Homes for Sale by Property Type`;
        return (
            <ZipTypeList itemId="__dataID__" list={typesList} children="Houses"
                         sectionTitle={typesTitle}
            />
        );

    }

    welcomeText() {
        const cityFormatted = urlToText(this.props.params.city);
        return (
            <article style={{lostColumn:1}}>
                <h4> { `Re/Max 1st Class Realty helps you to find your dream home by offering newest listings for sale in  ${cityFormatted}.` } </h4>
                <p> { `For your best experience, we are filtering ${cityFormatted} listings for you by Home Type and City Zip.` } </p>
                <h3 style={{color: "#D32F2F"}}> { `Let us guide you, call us for a free consultation about ${cityFormatted} properties for sale: (847) 674-9797.` }
                </h3>
            </article>
        );

    };

    render() {
        let zipsList = this.props.Viewer.City.Zips.edges;
        let typesList = this.props.Viewer.City.Types.edges;
        let newHouses = this.props.Viewer.City.Houses;

        let housesCount = this.props.Viewer.City.Houses_Count;
        let zips = zipsList.length;
        let types = typesList.length;
        let houses = newHouses.length;
        const cityFormatted = urlToText(this.props.params.city);

        const pageTitle = ` Homes for Sale in ${cityFormatted}`;
        const allTitle = `All ${cityFormatted} homes for sale(${housesCount})`;

        return (
            <div>
                {this.pageHelmet()}

                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>

                <h1> {pageTitle} </h1>

                {!(houses || zips || types) && <AppSpinner/> }

                <HousesListFiltered list={newHouses} cityName={cityFormatted} housesNumber={housesCount}/>

                {this.welcomeText()}

                {zips && this.showByZip()}
                <br/>
                { types && this.showByType()}
            </div>
        );
    }
};
export default Relay.createContainer(CityPage, {
    initialVariables: {city: null},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                City(city:$city){
                    name
                    Houses_Count
                    Houses(first:2){
                        edges{
                            node{
                                id
                                city
                                zip
                                type
                                price
                                built
                                street
                                beds
                                description
                                image
                            }
                        }
                    }
                    Zips(first:100){

                        edges{
                            node{
                                code,

                                Houses_Count
                            }
                        }
                    }

                    Types(first:100){
                        edges{
                            node{
                                type,
                                Houses_Count(city:$city)
                            }
                        }
                    }
                }
            }
        `,
    },
});