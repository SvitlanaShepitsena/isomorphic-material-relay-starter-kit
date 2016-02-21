import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'react-breadcrumbs';
import Spinner from 'material-ui/lib/circular-progress';

/*Components*/
import HouseInfo from '../../components/House/HouseInfo/HouseInfo.js';

class HousePage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            id: this.props.params.street
        })
    }

    render() {
        var house = this.props.Viewer.House;

        return (
            <div className="HousePage">
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <br/>

                {!house &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {house &&
                <HouseInfo house={house}/>
                }
                <br/>
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: 'id'},
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
                    city{name }
                    zip{code},
                    image
                }
            }
        `,
    },
});