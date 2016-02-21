import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../components/House/HousesList/HousesList.js';

class TypeHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city,
            zip: this.props.params.zipType,
            type: this.props.params.type
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.params);
        console.log('ddddddddddddddddddddddd');
        console.log(this.props.relay.variables);
        console.log('ddddddddddddddddddddddd');

        if (this.state.compare) {
            this.setState({compare: false});
            this.props.relay.setVariables({
                city: this.props.params.city,
                zip: this.props.params.zipType,
                type: this.props.params.type

            }, ()=> {
                this.setState({compare: true});
            });
            console.log('run');

        }

    }

    render() {
        const routes = this.props.routes;
        const params = this.props.params;
        const cityTypeHouses = this.props.Viewer.Houses.edges;
        const city = _.startCase(this.props.params.city);
        const type = this.props.params.type;

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                <h1>{`${type}s for Sale in ${city}`}</h1>
                <hr/>

                <hr/>
                {!cityTypeHouses &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {cityTypeHouses &&
                <HousesList
                    list={cityTypeHouses}
                    cityName={city}
                    listType="inline"/>
                }
                <br/>

            </div>
        );
    }
}
;
export default Relay.createContainer(TypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(city:$city,type:$type, first:20){
                    edges{
                        node{
                            id
                            city{ name }
                            zip{ code }
                            type{ type }
                            price
                            street
                            beds
                            description
                            image
                        }
                    }
                }
            }
        `,
    },
});