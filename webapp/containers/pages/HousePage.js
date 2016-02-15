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

class HousePage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            id: this.props.params.street
        })
    }

    render() {
        var isoVars = isomorphicVars();
        var house = this.props.Viewer.House;
        return (

            <div>
                House in {house.city}
                <hr/>
                <divmg>
                    {house.mls}
                </divmg>
                <hr/>
                <div>
                    {house.type}
                </div>
                <hr/>
                <div>
                    {house.description}
                </div>
                <hr/>
                <div>
                    {house.beds}
                </div>
                <hr/>
                <div>
                    {house.price}$
                </div>
                <hr/>
                <div>
                    <img src={house.image} alt={`Great House`}/>
                </div>
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: '4423-north-hamlin-avenue'},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        House(id:$id){
      id,
      mls,
      type,
      beds,
      description,
      price,
      street,
      city,
      state,
      zip,
      image
       }
      }
    `,
    },
});