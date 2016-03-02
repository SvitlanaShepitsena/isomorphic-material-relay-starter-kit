import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';

/*Components*/

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
        console.log(houses);

        return (
            <div>
                <h2>Search Results:</h2>

                {houses.map((edge)=> {
                    const house = edge.node;
                    return (
                        <div key={house.mls}>
                            {house.mls}
                        </div>
                    );
                })}
                <br/>
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
                Houses(query:$query,first:10){
                    edges{
                        node{
                            mls
                        }
                    }
                }
            }
        `,
    },
});