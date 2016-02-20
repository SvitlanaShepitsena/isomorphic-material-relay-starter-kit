import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';
import Spinner from 'material-ui/lib/circular-progress';

/*=Components*/
import HousesList from '../../components/House/HousesList/HousesList.js'
import HousesByPropsList from '../../components/House/HousesByPropsList/HousesByPropsList.js';

class CityPage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city
        })
    }

    render() {
        const city = this.props.params.city;
        const zipsList = this.props.Viewer.City.Zips.edges;
        const typesList = this.props.Viewer.City.Types.edges;
        const newHouses = this.props.Viewer.City.Houses.edges;
        const housesCount = this.props.Viewer.City.Houses_Count;
        /*Formatter*/
        let cityFormatted = _.startCase(city.replace(/-+/g, ' '));
        return (

            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>

                <h1> {"Houses for Sale in " + cityFormatted} </h1>
                <hr/>

                {!(newHouses.length || zipsList.length || typesList.length) &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {newHouses.length &&
                <HousesList
                    list={newHouses}
                    gridColsClass="six columns"
                    cityName={cityFormatted}
                    housesNumber={housesCount}
                    listType="large"/>
                }
                <br/>

                {zipsList.length &&
                <HousesByPropsList
                    item="code"
                    list={zipsList}
                    sectionTitle={`${cityFormatted} Homes for Sale by Zip`}
                />
                }

                <br/>
                {typesList.length &&
                <HousesByPropsList
                    item="type"
                    list={typesList}
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />
                }
            </div>
        );
    }
}
;
export default Relay.createContainer(CityPage, {
    initialVariables: {city: 'skokie'},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        City(city:$city){
            Houses_Count
            Houses(first:2){
                edges{
                    node{
                        id
                        city{name}
                        zip{code}
                        type{type}
                        price
                        street
                        beds
                        description
                        image
                    }
                }
            }
            Zips(first:100){
              edges{
                node{
                  code,
                  Houses_Count
                }
              }
            }

            Types(first:100,city:$city){
              edges{
                node{
                  type,
                  Houses_Count(city:$city)
                }
              }
            }
        }
      }
    `,
    },
});