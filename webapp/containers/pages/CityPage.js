import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';
import Spinner from 'material-ui/lib/circular-progress';
/*=Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import HousesList from '../../components/Common/HousesList.js'
import HousesByPropsList from '../../components/Common/HousesByPropsList.js';
import SvLink from '../../components/Common/SvLink';

/*Inline Styles*/
import style from '../../settings/AppMuiTheme.js';

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
        var badgeStyle = {
            backgroundColor: style.palette.default3Color,
            color: style.palette.textColor,
            top: 18,
            right: 18
        };
        var btnLabelStyle = {
            color: style.palette.primary2Color,
            fontSize: 15,
            fontWeight: 500
        };

        const cityName = _.startCase(this.props.params.city);
        var zipsList = this.props.Viewer.City.Zips.edges;
        var typesList = this.props.Viewer.City.Types.edges;
        var newHouses = this.props.Viewer.City.Houses.edges;
        var housesCount = this.props.Viewer.City.Houses_Count;
        return (

            <div>
                {!(zipsList.length || typesList.length) &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>

                <h1> {"Houses for Sale in " + cityName} </h1>
                <hr/>

                {zipsList.length &&
                <HousesList
                    list={newHouses}
                    gridColsClass="six columns"
                    cityName={cityName}
                    housesNumber={housesCount}
                    listType="large"/>
                }
                <br/>

                {zipsList.length &&
                <HousesByPropsList
                    item="code"
                    list={zipsList}
                    badgeStyle={badgeStyle}
                    btnLabelStyle={btnLabelStyle}
                    sectionTitle={`${cityName} Homes for Sale by Zip`}
                />
                }

                <br/>
                {typesList.length &&
                <HousesByPropsList
                    item="type"
                    list={typesList}
                    badgeStyle={badgeStyle}
                    btnLabelStyle={btnLabelStyle}
                    sectionTitle={`${cityName} Homes for Sale by Property Type`}
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
                        city{
                          name
                        }
                        zip{
                          code
                        }
                        type{
                          type
                        }
                        price
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