import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../components/House/HousesList/HousesList.js';

class HousesListPage extends React.Component {
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
        const cityHouses = this.props.Viewer.Houses.edges;
        const cityName = _.startCase(this.props.params.city);
        const zipType = this.props.params.zipType;

        const typesList = this.props.Viewer.Types.edges;
        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                <h1> {"Houses for Sale in " + cityName + ", " + zipType} </h1>
                <hr/>

                {typesList.length && !params.type &&
                <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityName} Homes for Sale by Property Type`}
                />
                }
                <hr/>
                {!cityHouses &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {cityHouses &&
                <HousesList
                    list={cityHouses}
                    cityName={cityName}
                    listType="inline"/>
                }
                <br/>

            </div>
        );
    }
}
;
export default Relay.createContainer(HousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                User_IsAnonymous,
                Types(city: $city, zip: $zip, first:100) {
                    edges {
                        node {
                            type,
                            Houses_Count(city:$city,zip:$zip)
                        }
                    }
                }

                Houses(city:$city,zip:$zip,type:$type, first:20){
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