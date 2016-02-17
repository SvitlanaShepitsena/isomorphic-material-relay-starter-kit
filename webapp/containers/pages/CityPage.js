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
import SvLink from '../../components/Shared/SvLink';
import {isomorphicVars} from '../../scripts/isomorphicVars';
import MyTheme from '../../settings/AppMuiTheme.js';
import ListingThumbLarge from '../../components/ListingThumb/ListingThumbLarge.jsx';

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
        const cityName = _.startCase(this.props.params.city);
        var city = this.props.Viewer.City;
        var zipsList = this.props.Viewer.City.Zips.edges;
        return (

            <div>
                {!(zipsList.length) &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {(zipsList.length ) &&
                <div>
                    <br/>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />

                    <h1> {"Houses for Sale in " + cityName} </h1>
                    <hr/>
                    <div className="row">
                        <div className="six columns">
                            <ListingThumbLarge />
                        </div>
                        <div className="six columns">
                            <ListingThumbLarge />
                        </div>
                    </div>
                    <SvLink url='all'>
                        <RaisedButton style={{display:"block",margin:"0px auto"}}
                                      label={"All " + cityName + " homes for sale (###)"}
                                      primary={true}/>
                    </SvLink>
                    <br/>
                    <br/>
                    <br/>
                </div>
                }

                {zipsList.length &&
                <Card>
                    <CardTitle title={cityName + " Homes for Sale by Zip"}/>
                    <Divider />
                    <CardActions>
                        <ul className="list-unstyled">
                            {zipsList.map((edge)=> {
                                    const zip = edge.node;
                                    return (
                                        <li style={{display:"inline-block"}} key={zip.code}>
                                            <Badge
                                                badgeContent={`${zip.Houses_Count}`}
                                                badgeStyle={{backgroundColor:"#EEEEEE", color:"#212121", top: 18, right: 18}}
                                            >
                                                <SvLink url={zip.code}>
                                                    <FlatButton
                                                        style={{color:"#0277BD", fontSize:18, fontWeight:500}}
                                                        label={`${zip.code}`}/>
                                                </SvLink>
                                            </Badge>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </CardActions>
                </Card>
                }
                <br/>
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

            Zips(first:100){
              edges{
                node{
                  code,
                  Houses_Count
                }
              },

            },

            Types(first:100){
              edges{
                node{
                  type,
                  Houses_Count
                }
              }
            }
        }
      }
    `,
    },
});