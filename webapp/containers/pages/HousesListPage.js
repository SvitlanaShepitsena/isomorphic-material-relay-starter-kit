import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import HousesList from '../../components/Common/HousesList.js';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import ListingThumbInline from '../../components/ListingThumb/ListingThumbInline.js';
import SvLink from '../../components/Common/SvLink';

/*Inline Styles*/
import style from '../../settings/AppMuiTheme.js';

class HousesListPage extends React.Component {
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
        var cityHouses = this.props.Viewer.Houses.edges;
        return (
            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <br/>
                <h1> {"Houses for Sale in " + cityName + ", " + this.props.params.zipType} </h1>
                <HousesList
                    list={cityHouses}
                    cityName={cityName}
                    listType="inline"/>
                <br/>
            </div>
        );
    }
}
;
export default Relay.createContainer(HousesListPage, {
    initialVariables: {city: '', zipType: ''},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,

        Houses(city:$city,zipType:$zipType, first:20){
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
      }
    `,
    },
});