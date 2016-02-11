import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';

import {isomorphicVars} from '../../scripts/isomorphicVars';

class ZipTypePage extends React.Component {

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
                    {this.props.Viewer.CityZips.edges.map((edge, index) => {
                        const zip = edge.node;
                        return (
                            <div key={index}>
                                <span>{`${zip.zip} (${zip.number})`}</span>
                            </div>
                        )
                    })}

                <hr/>
                <h5> Property Types</h5>
                    {this.props.Viewer.CityTypes.edges.map((edge, index) => {
                        const type = edge.node;
                        return (
                            <div key={index}>
                                <span>{`${type.type} (${type.number})`}</span>
                            </div>
                        )
                    })}
            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypePage, {
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