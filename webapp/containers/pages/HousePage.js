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
        var house = this.props.Viewer.House;
        const houseType = _.startCase(house.type.replace(/-+/g, ' '));
        const houseCity = _.startCase(house.city.replace(/-+/g, ' '));
        const houseStreet = _.startCase(house.street.replace(/-+/g, ' '));

        return (
            <div className="HousePage">
                <Breadcrumbs
                    routes={this.props.routes}
                    params={this.props.params}
                />
                <hr/>
                <Card className="HousePage__card">
                    <div className="row HousePage__card-header">
                        <div className="six columns HousePage__card-address">
                            {/*=Address*/}
                            <h1>
                                {house.street &&
                                <span>{houseStreet}</span>
                                }
                                <br/>

                                {house.city &&
                                <span> {houseCity + ", "} </span>
                                }
                                {house.state &&
                                <span> {house.state} </span>
                                }
                            </h1>
                            {house.type &&
                            <p> {houseType} </p>
                            }
                        </div>
                        <div className="six columns HousePage__card-price">
                            {house.price &&
                            <h4> ${house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </h4>
                            }
                            {house.shortSale &&
                            <p> Short Sale </p>
                            }
                            {house.mls &&
                            <p> {"MLS#: " + house.mls} </p>
                            }
                            {house.year &&
                            <p> {"Year: " + house.year} </p>
                            }
                        </div>
                    </div>

                    <div>
                        <img src={house.image} alt={`Great House`}/>
                    </div>
                    <hr/>
                    <article>
                        {house.description}
                    </article>
                    <hr/>
                    <article>
                        {house.beds}
                    </article>
                    <hr/>
                    <div>
                        {house.price}$
                    </div>
                    <hr/>
                </Card>
            </div>
        )
            ;
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