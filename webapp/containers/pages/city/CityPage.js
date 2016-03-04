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

    showByZip() {
        let {city} = this.props.params;
        let cityFormatted = urlToText(city);
        let zipsList = this.props.Viewer.City.Zips.edges;
        const zipsTitle = `${cityFormatted} Homes for Sale by Zip`
        return (
            <ZipTypeList itemId="code" list={zipsList} children="Houses"
                         sectionTitle={zipsTitle}/>
        );

    }

    showByType() {
        const cityFormatted = urlToText(this.props.params.city);
        let typesList = this.props.Viewer.City.Types.edges;
        let typesTitle = `${cityFormatted} Homes for Sale by Property Type`;
        return (
            <ZipTypeList itemId="type" list={typesList} children="Houses"
                         sectionTitle={typesTitle}
            />
        );

    }

    pageHelmet() {
        /*Formatter*/
        const cityName = urlToText(this.props.params.city);
        const image = `${settings.cloudinaryPath}${cityName}1.jpg`;

        const title = `${cityName} houses for sale | North Illinois Realty`;
        const description = `✔ Browse ${cityName} homes for sale, sorted by zip code or property type. ☏  Call us for a free consultation and schedule a showing!`;

        return (
            <Helmet
                title={title}
                meta={[
                    {"name": "description", "content": `${description}`},
                    {"name": "image", "content": `${image}`},

                    {"property": "og:title", "content": `${title}`},
                    {"property": "og:description", "content": `${description}`},
                    {"property": "og:image", "content": `${image}`}
                ]}
            />
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

        const pageTitle = `
        Houses
        for Sale in ${cityFormatted}`;
        const allTitle = `All
        ${cityFormatted}
        homes
        for sale(${housesCount})`;

        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <h1> {pageTitle} </h1>
                {!(houses || zips || types) && <AppSpinner/> }
                <HousesListFiltered
                    list={newHouses}
                    cityName={cityFormatted}
                    housesNumber={housesCount}
                />
                <ButtonAll url="all" btnLabel={allTitle}/>
                {zips && this.showByZip()}
                <br/>
                { types && this.showByType()}
            </div>
        );
    }
};
export default Relay.createContainer(CityPage, {
    initialVariables: {city: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                City(city:$city){
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