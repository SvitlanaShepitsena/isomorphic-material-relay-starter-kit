import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import SvLink from '../../components/Shared/SvLink';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class CityPage extends React.Component {
    getChildContext() {
        return {location:this.props.location};
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
        return (

            <div>
                <div>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                </div>
                <h3> Houses for SALE in {this.props.params.city} !</h3>
                <h5> Zip Codes </h5>
                <ul >
                    {this.props.Viewer.CityZips.edges.map((edge)=> {
                            const zip = edge.node;
                            return (
                                <li key={zip.zip}>
                                    <SvLink url={zip.zip}>
                                        {`${zip.zip}(${zip.number})`}
                                    </SvLink>

                                </li>
                            )
                        }
                    )}
                </ul>

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