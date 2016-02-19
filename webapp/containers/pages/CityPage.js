import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import _ from 'lodash';
import Breadcrumbs from 'react-breadcrumbs';

/*=MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';
import RaisedButton from 'material-ui/lib/raised-button';

/*=Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import SvLink from '../../components/Common/SvLink';
import {isomorphicVars} from '../../scripts/isomorphicVars';
import ListingThumbLarge from '../../components/ListingThumb/ListingThumbLarge.js';
import HousesByPropsList from '../../components/Common/HousesByPropsList.js';
import HousesList from '../../components/Common/HousesList.js'
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
        return (

            <div>
                {!(zipsList.length || typesList.length) &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {(zipsList.length || typesList.length) &&
                <div>
                    <br/>
                    <Breadcrumbs routes={this.props.routes} params={this.props.params}/>

                    <h1> {"Houses for Sale in " + cityName} </h1>
                    <hr/>

                    <HousesList houses={newHouses} listType="large"/>

                    <SvLink url='all'>
                        <RaisedButton style={{display:"block",margin:"0px auto"}}
                                      label={"All " + cityName + " homes for sale (###)"}
                                      primary={true}/>

                    </SvLink>
                    <br/>
                    <br/>
                </div>
                }

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