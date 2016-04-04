import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';
import _ from "lodash";

/*Components*/
import HousesTable from '../../../components/House/HousesTable/HousesTable.js';
import HousesTableDescription from '../../../components/House/HousesTableDescription/HousesTableDescription.js';
import HousesListTitle from '../../../components/House/HousesListTitle/HousesListTitle.js';
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';

import styles from './ZipTypeHousesListPage.less';

class ZipTypeHousesListPage extends React.Component {

    getChildContext() {
        return {
            location: this.props.location,
            params: this.props.routeParams,
            route: this.props.route,
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
        let houseCount = this.props.Viewer.Houses_Count;

        const pageTitle = `${cityName}, ${zipTypeFormatted} homes for sale | ${cityName} brokers | Northern Illinois Realty | P.${page}`;
        const ogDescription = `✔Wish to buy ${cityName} IL, ${zipTypeFormatted} home? ${houseCount} listings for sale in ${cityName} IL, ${zipTypeFormatted}. ☏  Free consultation from ${cityName} realtors. (Page ${page})`;
        const pageImage = `${settings.citiesPath}${cityName}2.jpg`;
        return (
            <Helmet
                title={pageTitle}
                meta={[
                    {"name": "description", "content": `${ogDescription}`},
                    {"name": "image", "content": `${pageImage}`},

                    {"property": "og:title", "content": `${pageTitle}`},
                    {"property": "og:description", "content": `${ogDescription}`},
                    {"property": "og:image", "content": `${pageImage}`}
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

        const zipTypeListTitle = `${cityFormatted} ${zipType} Houses for Sale by Property Type`;
        return (
            <div>
                {pageError && <div> { this.noHouses()} </div> }

                {!pageError &&
                <div>
                    {this.pageHelmet()}
                    <Breadcrumbs routes={routes} params={params}/>
                    <HousesListTitle zipType={zipType} cityFormatted={cityFormatted} count={houseCount}/>
                    {showTypesList &&
                    <ZipTypeList
                        listClass={styles.row}
                        itemClass={styles.item}
                        itemId="type"
                        list={typesList}
                        children="Houses"
                        sectionTitle={zipTypeListTitle}
                    />}
                    {!showTypesList &&
                    <HousesTableDescription list={houses} count={houseCount} cityName={cityFormatted}/>
                    }
                    {showTypesList &&
                    <HousesTable list={houses} count={houseCount} cityName={cityFormatted}/>
                    }
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

        if (zipType.toLowerCase() === 'duplexes') {
            zipType = zipType.substr(0, zipType.length - 2);
        }
        else {
            if (_.last(zipType) === 's') {
                zipType = zipType.substr(0, zipType.length - 1);
            }
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
                            baths
                            beds
                            city
                            description
                            image
                            mls
                            price
                            built
                            street
                            since
                            type
                            zip
                        }
                    }
                }

            }
        `,
    },
});