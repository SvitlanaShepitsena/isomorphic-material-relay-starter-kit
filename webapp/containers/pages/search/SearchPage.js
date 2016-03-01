import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';

/*Components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';

class SearchPage extends React.Component {
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

    render() {
        const houses = this.props.Viewer.Houses.edges;

        return (
            <div>
                <h2>Search Results:</h2>
                {houses && <HousesList list={houses} listType="inline"/> }
            </div>
        );
    }
};
export default Relay.createContainer(SearchPage, {
    initialVariables: {query: null},
    prepareVariables({query}) {
        return {query}
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(query:$query, first:10){
                    pageInfo{
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges{
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