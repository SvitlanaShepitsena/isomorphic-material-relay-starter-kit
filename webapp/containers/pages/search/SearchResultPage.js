import React, {PropTypes} from 'react';
import Relay from 'react-relay';

/*=components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';

/*=styles*/
import styles from './SearchResultPage.less';

class SearchResultPage extends React.Component {
    state = {
        page: 1,
        loading: false
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
    noListings = ()=> {
        const queryString = this.props.params.query;
        const noResult = `0 listings found`;
        return ( <div>
                <h2 className={styles.searchResults}>
                    {queryString}: <strong>{noResult}</strong>
                </h2>
            </div>
        )
    };
    searchResults = ()=> {
        const queryString = this.props.params.query;
        const houses = this.props.Viewer.Houses;
        const count = Number(this.props.Viewer.Houses_Count);
        const listingsFound = `${count} listings:`;
        return (
            <div>
                <h2 className={styles.searchResults}>
                    {`For ${queryString}:`} <strong>{listingsFound}</strong>
                </h2>
                {houses && <HousesList list={houses} listType="inline" count={count}/>}
            </div>
        )
    };

    render() {
        const count = Number(this.props.Viewer.Houses_Count);
        return count > 0 ? this.searchResults() : this.noListings()
    }
}
export default Relay.createContainer(SearchResultPage, {
    initialVariables: {query: null, page: null},
    prepareVariables({query, page}) {
        if (!page || isNaN(page)) {
            page = 1;
        }
        page = Number(page);
        return {query, page}
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(query:$query,page:$page,first:1000){
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
                Houses_Count(query:$query)
            }
        `,
    },
});