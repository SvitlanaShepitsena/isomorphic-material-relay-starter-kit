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
import ListingThumbInline from '../../components/ListingThumb/ListingThumbInline.js';
import SvLink from '../../components/Common/SvLink';
import HousesByPropsList from '../../components/Common/HousesByPropsList.js';
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
        return (
            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <br/>
                <h1> {"Houses for Sale in " + cityName + ", " + this.props.params.zipType} </h1>
                <ol>
                    {
                        this.props.Viewer.Houses.edges.map((edge, index)=> {
                            const house = edge.node;
                            // const urlAppend=this.props.params.zipType.mat
                            const houseUrl = `${house.city.name}/${house.zip.code}/${house.type.type}/${house.id}`;
                            return (
                                <li key={index}>
                                    <Link to={`/houses-for-sale/${houseUrl}`}>
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
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ol>
                <br/>

                <HousesByPropsList
                    item="type"
                    list={typesList}
                    badgeStyle={badgeStyle}
                    btnLabelStyle={btnLabelStyle}
                    sectionTitle={`${cityName} Homes for Sale by Property Type`}
                />

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