import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import _ from 'lodash';

import Breadcrumbs from 'react-breadcrumbs';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import SvLink from '../../components/Shared/SvLink';
import {isomorphicVars} from '../../scripts/isomorphicVars';
import MyTheme from '../../settings/AppMuiTheme.js';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';

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
        var isoVars = isomorphicVars();
        var cityName = _.startCase(this.props.params.city);
        return (

            <div>
                <div>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                </div>
                <h1> {"Houses for Sale in " + _.startCase(this.props.params.city)}</h1>
                <hr/>
                <Card>
                    <CardTitle title={cityName + " Homes for Sale by Zip"}/>
                    <Divider />
                    <CardActions>
                        <ul className="list-unstyled">
                            {this.props.Viewer.CityZips.edges.map((edge)=> {
                                    const zip = edge.node;
                                    return (
                                        <li style={{display:"inline-block"}} key={zip.zip}>
                                            <Badge
                                                badgeContent={`${zip.number}`}
                                                badgeStyle={{backgroundColor:"#797979", color:"white", top: 18, right: 18}}
                                            >
                                                <SvLink url={zip.zip}>
                                                    <FlatButton
                                                        secondary={true}
                                                        style={{fontSize:18, fontWeight:500}}
                                                        label={`${zip.zip}`}/>
                                                </SvLink>
                                            </Badge>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </CardActions>
                </Card>
                <br/>
                <Card>
                    <CardTitle title={cityName + " Homes for Sale by Property Type"}/>
                    <Divider />
                    <CardActions>
                        <ul className="list-unstyled">
                            {this.props.Viewer.CityTypes.edges.map((edge)=> {
                                    const type = edge.node;
                                    return (
                                        <li style={{display:"inline-block"}} key={type.type}>
                                            <Badge
                                                badgeContent={`${type.number}`}
                                                badgeStyle={{backgroundColor:"#797979", color:"white", top: 18, right: 18}}
                                            >
                                                <SvLink url={type.type}>
                                                    <FlatButton
                                                        secondary={true}
                                                        style={{fontSize:15, fontWeight:500}}
                                                        label={`${type.type}`}/>
                                                </SvLink>
                                            </Badge>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </CardActions>
                </Card>

            </div>
        );
    }
}
;
export default Relay.createContainer(CityPage, {
    initialVariables: {city: ''},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
        CityZips(city:$city,first:100) {
          edges {
            node {
           zip,
           number
            },
          },
        },
        CityTypes(city:$city,first:100) {
          edges {
            node {
           type,
           number
            },
          },
        },
      }
    `,
    },
});