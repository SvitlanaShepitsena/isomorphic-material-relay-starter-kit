import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import _ from 'lodash';

import Breadcrumbs from 'react-breadcrumbs';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import SvLink from '../../components/Shared/SvLink';
import {isomorphicVars} from '../../scripts/isomorphicVars';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';

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
                <h1> {"Houses for Sale in " + _.startCase(this.props.params.city) + "!"}</h1>
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
                                            <SvLink url={zip.zip}>
                                                <FlatButton label={`${zip.zip}(${zip.number})`}/>
                                            </SvLink>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </CardActions>
                </Card>

                <hr/>
                <h5> Property Types</h5>
                <ul >
                    {this.props.Viewer.CityTypes.edges.map((edge)=> {
                            const type = edge.node;
                            return (
                                <li key={type.type}>
                                    <SvLink url={type.type}>
                                        {`${type.type}(${type.number})`}
                                    </SvLink>

                                </li>
                            )
                        }
                    )}
                </ul>
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