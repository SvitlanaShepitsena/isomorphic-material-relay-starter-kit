import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../components/House/HousesList/HousesList.js';

class ZipHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        console.log('ZipHousesListPage.js - line: 25');

        this.props.relay.setVariables({
            city: this.props.params.city,
            zip: this.props.params.zip,
            type: this.props.params.type
        })
    }



    render() {
        const routes = this.props.routes;
        const params = this.props.params;

        const cityName = _.startCase(this.props.params.city);
        const zip = this.props.params.zip;

        const cityHouses = this.props.Viewer.Houses.edges;
        const typesList = this.props.Viewer.Types.edges;
        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                <h1> {"Houses for Sale in " + cityName + ", " + zip} </h1>
                <hr/>

                <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityName} Homes for Sale by Property Type`}
                />

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
export default Relay.createContainer(ZipHousesListPage, {
    initialVariables: {city: '', zip: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Types(city: $city, zip: $zip, first:100) {
                    edges {
                        node {
                            type,
                            Houses_Count(city:$city,zip:$zip)
                        }
                    }
                }
                Houses(city:$city,zip:$zip,first:10){
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