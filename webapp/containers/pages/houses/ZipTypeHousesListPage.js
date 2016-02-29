import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';
import {Link} from 'react-router'
import SvLink from '../../../components/Common/SvLink'
import _ from 'lodash';

/*Components*/
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../../components/House/HousesList/HousesList.js';

class ZipTypeHousesListPage extends React.Component {
    state = {cursor: ''};

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
        let {query} = this.props.location;
        this.currentPage = Number(query && query.page ? query.page : 1);
    }



    componentWillReceiveProps(nextProps) {
        let {query} = nextProps.location;
        this.nextPage = Number(query && query.page ? query.page : 1);
        let after = query && query.after ? query.after : null;

        if (this.nextPage !== this.currentPage) {
            this.props.relay.setVariables({
                after: after
            });
        }

    }

    render() {
        const {routes, params}= this.props.routes;
        const {city} = this.props.params;

        const pageInfo = this.props.Viewer.Houses.pageInfo;
        console.log(pageInfo);

        const houses = this.props.Viewer.Houses.edges;
        const lastHouse = _.last(houses);
        const lastCursor = lastHouse && lastHouse.cursor;

        const typesList = this.props.Viewer.Types.edges;

        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(this.type);

        let {query} = this.props.location;
        this.currentPage = Number(query && query.page ? query.page : 1);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                {<ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />
                }
                {this.type &&
                <h1>{`${typeFormatted == 'All' ? 'All House' : typeFormatted}s for Sale in ${cityFormatted}`}</h1>}
                {this.zip && <h1>{`Houses for Sale in ${cityFormatted}, ${this.zip}`}</h1>}
                {pageInfo.hasNextPage &&
                <Link
                    to={{ pathname: this.props.location.pathname, query: { page: this.currentPage+1,after:lastCursor} }}>Next</Link>
                }
                {pageInfo.hasPreviousPage &&
                <div>

                    <Link
                        to={{ pathname: this.props.location.pathname, query: { page: this.currentPage-1,after:pageInfo.startCursor} }}>Prev</Link>
                </div>
                }
                {houses &&
                <HousesList

                    list={houses}
                    cityName={cityFormatted}
                    listType="inline"/>
                }
                <br/>


            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: null, zipType: null, after: null,before:null,first:null,last:null},
    prepareVariables({city, zipType, after:after,before:before,first:first,last:last}) {
        var values= {city: zipType.match(/^\d+$/) ? null : city, zipType: zipType};


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
                Houses(city:$city,zip:$zipType,first:3){
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