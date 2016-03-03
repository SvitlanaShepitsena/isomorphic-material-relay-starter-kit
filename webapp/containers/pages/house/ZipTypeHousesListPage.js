import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

/*Components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';
import HousesListTitle from '../../../components/House/HousesListTitle/HousesListTitle.js';
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import {browserHistory} from 'react-router'

class ZipTypeHousesListPage extends React.Component {
    state = {
        limit: 3,
    };

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

    componentDidMount() {
        let query = this.props.location.query;
        this.currentPage = Number(query && query.page ? query.page : 1);
        if (this.currentPage > 1) {
            browserHistory.replace(this.props.location.pathname);
        }
    }

    componentWillReceiveProps(nextProps) {
        let query = nextProps.location.query;
        this.nextPage = Number(query && query.page ? query.page : 1);
        let after = query && query.after ? query.after : null;
        let before = query && query.before ? query.before : null;

        if (this.nextPage === 1 && (after || before)) {
            browserHistory.replace(nextProps.location.pathname);
        }

        if (this.nextPage !== this.currentPage) {
            this.props.relay.setVariables({
                after: after,
                before: before
            });
        }
    }

    pageHelmet() {
        let {city, zipType} = this.props.params;
        /*Formatter*/
        const cityName = urlToText(city);
        const zipTypeFormatted = urlToText(zipType);

        const title = `${cityName}, ${zipTypeFormatted} properties for sale | North Illinois Realty`;
        const description = `✔ Browse ${cityName}, ${zipTypeFormatted} houses for sale. ☏  Call us for a free consultation and schedule a showing!`;
        const image = `${settings.cloudinaryPath}${cityName}1.jpg`;

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
        let {routes, params}= this.props;
        let {city} = this.props.params;
        let {zipType} = this.props.params;

        let typesList = this.props.Viewer.Types.edges;
        let showTypesList = zipType.match(/^\d+$/g);

        let houses = this.props.Viewer.Houses;
        let houseCount = this.props.Viewer.Houses_Count;

        let {query} = this.props.location;
        this.currentPage = Number(query && query.page ? query.page : 1);

        /*Formatter*/
        const cityFormatted = urlToText(city);

        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={routes} params={params}/>
                <HousesListTitle zipType={zipType} cityFormatted={cityFormatted} count={houseCount}/>
                {!houses && <Spinner/>}
                {houses && <HousesList list={houses} count={houseCount} cityName={cityFormatted}/>}

                {showTypesList &&
                <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />}
            </div>
        );
    }
};

export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: null, zipType: null, after: null, before: null, first: null, last: null},
    prepareVariables({city, zipType, after:after, before:before, first:first, last:last}) {
        var values = {city: zipType.match(/^\d+$/) ? null : city, zipType: zipType};
        if (after || (!before && !after)) {
            values.after = after;
            values.first = true;
            values.last = false;
        }
        if (before) {
            values.before = before;
            values.last = true;
            values.first = false;
        }

        return values;
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Types(zip: $zipType, first:100) {
                    edges {
                        node {
                            type,
                            Houses_Count(zip:$zipType)
                        }
                    }
                }
                Houses_Count(city:$city,zip:$zipType)
                Houses(city:$city,zip:$zipType,first:3,after:$after) @include(if:$first) {
                    pageInfo{
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor

                    }
                    edges{
                        cursor
                        node{
                            id
                            city{ name }
                            zip{ code }
                            type{ type }
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
                Houses(city:$city,zip:$zipType,last:3,before:$before) @skip(if:$first) {
                    pageInfo{
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor

                    }
                    edges{
                        cursor
                        node{
                            id
                            city{ name }
                            zip{ code }
                            type{ type }
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