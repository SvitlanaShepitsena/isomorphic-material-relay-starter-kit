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
            zipType: this.props.params.zipType
        })
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

                {typesList.length &&
                <ZipTypeList
                    item="type"
                    list={typesList}
                    sectionTitle={`${cityName} Homes for Sale by Property Type`}
                />
                }
            </div>
        );
    }
}
;
export default Relay.createContainer(HousesListPage, {
    initialVariables: {city: '', zipType: '', zip: ''},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
               Types(city: "skokie", zip: "60076", first:100) {
              edges {
                node {
                  type,
                  Houses_Count(city:"skokie",zipType:"60076")
                }
              }
            }

        Houses(city:$city,zipType:$zipType, first:20){
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