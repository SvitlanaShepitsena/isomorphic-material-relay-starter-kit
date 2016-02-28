import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Spinner from '../../../../node_modules/material-ui/lib/circular-progress';
/*Components*/
import HouseInfo from '../../../components/House/HouseInfo/HouseInfo.js';
import PhotoGallery from '../../../components/PhotoGallery/PhotoGallery.js';

class HousePage extends React.Component {
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
        var house = this.props.Viewer.House;
        return (
            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <br/>
                <div>
                    {house && <HouseInfo house={house}/> }
                </div>
                <br/>
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: null},
    prepareVariables({id}) {
        var houseId;
        if (!id) {
            houseId = 'izya';
        } else {
            houseId = id;
        }

        return {id: houseId};
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