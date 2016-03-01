import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

/*Components*/
import HouseInfo from '../../../components/House/HouseInfo/HouseInfo.js';

class HousePage extends React.Component {
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route,
            params: this.props.routeParams
        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    render() {
        let {routes, params} = this.props;
        let house = this.props.Viewer.House;
        return (
            <div>
                <Breadcrumbs routes={routes} params={params}/>
                {!house &&
                <Spinner/>
                }
                {house &&
                <HouseInfo house={house}/>
                }
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: null},
    prepareVariables({id}) {


        return {id: id};
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                House(id:$id){
                    id,
                    mls,
                    type {type}
                    beds,
                    baths,
                    description,
                    price,
                    street,
                    built
                    city{name }
                    zip{code},
                    image
                }
            }
        `,
    },
});