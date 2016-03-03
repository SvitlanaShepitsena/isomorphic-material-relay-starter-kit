import React, {PropTypes} from 'react';
import Relay from 'react-relay';
/*=Components*/
import CitiesList from '../../../components/City/CitiesList/CitiesList.js';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

class CitiesSalePage extends React.Component {
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
        let allCities = this.props.Viewer.Cities.edges;
        let cities = allCities.length;

        return (
            <div>
                <h1> North Chicago Suburbs Houses for Sale </h1>
                <CitiesList list={allCities} itemId="name" children="Houses"/>
            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesSalePage, {
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first:100) {
                    edges{
                        node{
                            name,
                            count
                        }
                    }
                }
            }
        `,
    },
});
