import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
import urlToText from '../../../utils/urlToText.js';

/*=Components*/
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import ButtonAll from '../../../components/House/ButtonAll/ButtonAll.js';
import HousesListFiltered from '../../../components/House/HousesListFiltered/HousesListFiltered.js';
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import H1Header from '../../../components/Common/H1Header/H1Header.js';
import AppSpinner from '../../../components/Common/Spinner/AppSpinner.js';

/*=styles*/
import palette from '../../../settings/MuiPalette.js';
import styles from './CityPage.less';

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

    componentDidUpdate() {
        console.log('run here CityPage.js');
        ReactDOM.findDOMNode(this).scrollIntoView();
    };

    pageHelmet() {
        /*Formatter*/
        const cityName = urlToText(this.props.params.city);
        const pageImage = `${settings.citiesPath}${cityName}2.jpg`;

        const pageTitle = `${cityName} homes for sale | Buy ${cityName} home | ${cityName} Realty`;
        const pageDescription = `✔Wish to buy a home in ${cityName}? ☏  Call ${cityName} real estate professionals for a free consultation and schedule a showing!`;

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
        const zipsTitle = `${cityFormatted} Houses for Sale by Zip`
        return (
            <ZipTypeList
                listClass={styles.row}
                itemClass={styles.item}
                itemId="__dataID__" list={zipsList} children="Houses"
                sectionTitle={zipsTitle}/>
        );
    }

    welcomeText() {
        const textAccent = {
            fontSize: 20,
            margin: "0",
            color: palette.palette.accent1Color
        };
        const cityFormatted = urlToText(this.props.params.city);
        return (
            <article style={{lostColumn:1}}>
                <h3> { `Re/Max 1st Class Realty helps you to find your dream home by offering newest listings for sale in  ${cityFormatted}.` } </h3>
                <p style={{padding:0}}> { `For your best experience, we are filtering ${cityFormatted} listings by City Zip.` } </p>
                <h2 style={textAccent}> { `Let our real estate professionals guide you, call Re/Max 1st Class brokers for a free consultation about ${cityFormatted} properties for sale: (847) 674-9797.` }
                </h2>
            </article>
        );

    };

    render() {
        let zipsList = this.props.Viewer.City.Zips.edges;
        let newHouses = this.props.Viewer.City.Houses;

        let housesCount = this.props.Viewer.City.Houses_Count;
        let zips = zipsList.length;
        let houses = newHouses.length;
        const cityFormatted = urlToText(this.props.params.city);

        const pageTitle = `${cityFormatted} Homes for Sale`;
        const allTitle = `All ${cityFormatted} listings for sale(${housesCount})`;

        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>

                <H1Header> {pageTitle}</H1Header>

                <HousesListFiltered list={newHouses} cityName={cityFormatted} housesNumber={housesCount}/>

                <ButtonAll url="all" btnLabel={allTitle}/>

                {zips && this.showByZip()}

                {this.welcomeText()}


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
                    Houses(first:3){
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
                                baths
                                description
                                image
                            }
                        }
                    }
                    Zips(first:100){

                        edges{
                            node{
                                code,

                                Houses_Count(city:$city)
                            }
                        }
                    }

                }
            }
        `,
    },
});