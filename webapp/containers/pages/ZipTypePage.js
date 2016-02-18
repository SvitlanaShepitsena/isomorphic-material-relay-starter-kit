import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';
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
            city: this.props.params.city,
            zipType: this.props.params.zipType
        })
    }

    render() {
        const cityName = _.startCase(this.props.params.city);

        return (
            <div>
                <ol>
                    {
                        this.props.Viewer.Houses.edges.map((edge, index)=> {
                            const house = edge.node;
                            return (
                                <li key={index}>
                                    <SvLink url={house.id} >
                                        <div>
                                            {house.street}
                                        </div>
                                        <div>
                                            {house.type.type}
                                        </div>
                                        <div>
                                            <img src={house.image} alt="House" style={{width:100}}/>
                                        </div>
                                        <hr/>
                                    </SvLink>
                                </li>
                            );
                        })
                    }
                </ol>

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

        Houses(city:$city,zipType:$zipType, first:20){
            edges{
                node{
                   id,
                   street,
                   type,
                   mls,
                   image


                }
            }
        }
      }
    `,
    },
});