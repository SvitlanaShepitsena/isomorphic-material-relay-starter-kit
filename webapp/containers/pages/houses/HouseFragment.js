import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Spinner from '../../../../node_modules/material-ui/lib/circular-progress';

/*Components*/
import HouseInfo from '../../../components/House/HouseInfo/HouseInfo.js';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery.js';

class HouseFragment extends React.Component {
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
        <div>
            {this.props.house.id}
        </div>
    }
}
;
export default Relay.createContainer(HouseFragment, {
    fragments: {
        house: (variables) => `
            fragment on House({id}) {
                    id,

                }
            
        `,
    },
});