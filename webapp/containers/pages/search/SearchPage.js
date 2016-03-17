import React, {PropTypes} from 'react';
import Relay from 'react-relay';

/*=components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';

class SearchPage extends React.Component {
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
    noresults = ()=> {
        return ( <div>
                <h2>No results found for {this.props.params.query}</h2>

            </div>
        )
    };
    searchResults = ()=> {
        const houses = this.props.Viewer.Houses;
        const count = Number(this.props.Viewer.Houses_Count);
        return (
            <div>
                <h2>Search Results({count}):</h2>
                {houses && <HousesList list={houses} listType="inline" count={count}/>}
            </div>
        )
    };

    render() {
        const count = Number(this.props.Viewer.Houses_Count);

        return count > 0 ? this.searchResults() : this.noresults()
    }
}
export default Relay.createContainer(SearchPage, {
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