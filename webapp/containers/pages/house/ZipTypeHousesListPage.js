import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';
import _ from "lodash";
/*Components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';
import HousesListTitle from '../../../components/House/HousesListTitle/HousesListTitle.js';
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import {browserHistory} from 'react-router'

class ZipTypeHousesListPage extends React.Component {

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
        let {city, zipType, page} = this.props.params;
        /*Formatter*/
        const cityName = urlToText(city);
        const zipTypeFormatted = urlToText(zipType);

        const title = `${cityName}, ${zipTypeFormatted} properties for sale | North Illinois Realty | Page ${page}`;
        const description = `✔ Browse ${cityName}, ${zipTypeFormatted} houses for sale. ☏  Call us for a free consultation and schedule a showing!(Page ${page})`;
        const image = `${settings.citiesPath}${cityName}2.jpg`;
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

    noHouses = ()=> {
        return (
            <div>
                <h4>Sorry, we did not find any homes that match your search.</h4>
            </div>
        );
    };

    render() {
        let {routes, params}= this.props;
        let {city, zipType} = this.props.params;

        let typesList = this.props.Viewer.Types.edges;
        let showTypesList = zipType.match(/^\d+$/g);

        let houses = this.props.Viewer.Houses;
        let houseCount = this.props.Viewer.Houses_Count;

        let currentPage = Number(_.last(this.props.location.pathname.split('/')));
        let maxPage = Math.ceil(houseCount / 10);
        let pageError = currentPage > maxPage || currentPage == 0;

        /*Formatter*/
        const cityFormatted = urlToText(city);

        return (
            <div>

                {pageError &&
                <div>

                    { this.noHouses()}
                </div>
                }
                {!pageError &&
                <div>
                    {this.pageHelmet()}
                    <Breadcrumbs routes={routes} params={params}/>
                    <HousesListTitle zipType={zipType} cityFormatted={cityFormatted} count={houseCount}/>
                    {showTypesList &&
                    <ZipTypeList
                        itemId="type"
                        list={typesList}
                        children="Houses"
                        sectionTitle={`${cityFormatted}, ${zipType} Homes for Sale by Property Type`}
                    />}
                    {!houses && <Spinner/>}
                    <HousesList list={houses} count={houseCount} cityName={cityFormatted}/>
                </div>
                }
            </div>
        );
    }
};

export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: null, zipType: null, page: 1},
    prepareVariables({city, zipType, page, type}) {
        if (!page || isNaN(page)) {
            page = 1;
        }
        console.log(page);

        if (_.last(zipType) === 's') {
            zipType = zipType.substr(0, zipType.length - 1);
            console.log(zipType);
        }
        page = Number(page);
        return {city, zipType, page}
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses_Count(city:$city,zip:$zipType)
                Types(zip: $zipType, first:100) {
                    edges {
                        node {
                            type,
                            Houses_Count(zip:$zipType)
                        }
                    }
                }
                Houses(city:$city,zip:$zipType,first:100,page:$page) {
                    edges{
                        cursor
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
                            mls
                            image
                        }
                    }
                }

            }
        `,
    },
});