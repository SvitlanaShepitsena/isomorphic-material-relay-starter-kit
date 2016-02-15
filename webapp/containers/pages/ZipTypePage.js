import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import ListingThumbInline from '../../components/ListingThumb/ListingThumbInline.jsx';

import SvLink from '../../components/Shared/SvLink';
import {isomorphicVars} from '../../scripts/isomorphicVars';

class ZipTypePage extends React.Component {
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
        const cityName = _.startCase(this.props.params.city);
        const zip = this.props.params.zipType;

        return (
            <div>
                <Breadcrumbs
                    routes={this.props.routes}
                    params={this.props.params}
                />
                <h1>{cityName + " Homes for Sale"}</h1>
                {this.props.Viewer.Houses.edges.map((edge, index)=> {
                        const house = edge.node;
                        return (
                            <div key={index}>
                                <SvLink url={house.street}>
                                    <ListingThumbInline
                                        image={house.image}
                                        mls={house.mls}
                                        beds={house.beds}
                                        street={_.startCase(house.street.replace(/-+/g, ' '))}
                                        type={_.startCase(house.type.replace(/-+/g, ' '))}
                                        price={"$"+ house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                        city={cityName}
                                        zip={zip}
                                    />
                                </SvLink>
                            </div>
                        )
                    }
                )}
            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypePage, {
    initialVariables: {city: '', zipType: ''},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
         Houses(city:$city,zipType:$zipType,first:100) {
          edges {
            node {
            beds,
          image,
          price,
         street,
          type,
          mls
            },
          },
        },
      }
    `,
    },
});