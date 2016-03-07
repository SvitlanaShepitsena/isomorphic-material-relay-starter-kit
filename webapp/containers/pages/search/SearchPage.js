import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link, browserHistory} from 'react-router';
import HousesList from '../../../components/House/HousesList/HousesList.js';

import urlToText from '../../../utils/urlToText.js';

/*Components*/

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

    componentWillMount() {
        const currentPage = this.props.location.query.page ? Number(this.props.location.query.page) : 1;
        if (this.props.location.query.page && currentPage === 1) {
            browserHistory.replace(this.props.location.pathname);
        }
        if (currentPage !== this.state.page) {
            this.setState({page: currentPage});
            this.props.relay.setVariables({
                page: currentPage
            })
        }

    }

    componentWillReceiveProps(nextProps) {
        const currentPage = nextProps.location.query.page ? Number(nextProps.location.query.page) : 1;
        if (nextProps.location.query.page && currentPage === 1) {
            browserHistory.replace(this.props.location.pathname);
        }
        var page = nextProps.location.query.page;
        const nextPage = page ? Number(page) : 1;
        if (nextPage !== this.state.page) {
            this.setState({loading: true, page: nextPage}, ()=> {

                this.props.relay.setVariables({
                    page: nextPage
                }, state=> {
                    if (state.done) {
                        this.setState({loading: false})
                    }
                })
            });

        }

    }

    render() {
        const houses = this.props.Viewer.Houses;
        const count = Number(this.props.Viewer.Houses_Count);
        let pathname = this.props.location.pathname;

        return (
            <div>
                <div>
                    Count:{count}
                </div>
                <h2>Search Results:</h2>
                {houses && <HousesList list={houses} listType="inline" count={count}/>}
            </div>
        );
    }
};
export default Relay.createContainer(SearchPage, {
    initialVariables: {query: null, page: null},
    prepareVariables({query, page}) {
        if (!page || isNaN(page)) {
            page = 1;
        }
        return {query, page}
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(query:$query,page:$page,first:100){
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