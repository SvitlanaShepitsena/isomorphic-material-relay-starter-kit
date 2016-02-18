import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import {Link} from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';
import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import Slider from '../../components/PhotoGallery/PhotoGallery.js';

/*Components*/
import House_List from './../../components/HouseSale/House_List.jsx';
import SvLink from '../../components/Shared/SvLink';
import PhotoGallery from '../../components/PhotoGallery/PhotoGallery.js';

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

        return (
            <div className="HousePage">
                {!house &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {house &&
                <div>
                    <br/>
                    <Breadcrumbs
                        routes={this.props.routes}
                        params={this.props.params}
                    />
                    <br/>
                    <Card className="HousePage__card">
                        <div className="row HousePage__card-header">
                            <div className="six columns HousePage__card-address">
                                {/*=Address*/}
                                <h1>
                                    {house.street &&
                                    <span>{house.street}</span>
                                    }
                                    <br/>
                                    {house.city &&
                                    <span> {house.city.name + ", "} </span>
                                    }

                                </h1>

                                {house.type &&
                                <p> {house.type.type} </p>
                                }
                            </div>
                            <div className="six columns HousePage__card-price">
                                {house.price &&
                                <h4> ${house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </h4>
                                }

                                {house.mls &&
                                <p> {"MLS#: " + house.mls} </p>
                                }
                                {house.year &&
                                <p> {"Year: " + house.year} </p>
                                }
                            </div>
                        </div>


                        {house.image &&

                        <div>
                            <PhotoGallery image={house.image}/>
                        </div>
                        }
                        <hr/>
                        <article>
                            <p>
                                {house.description}
                            </p>
                        </article>
                        <hr/>
                        <article >
                            <h4 style={{color:"#393939"}}>Key Facts:</h4>
                            <div className="row">
                                <div className="six columns HousePage__key-facts">
                                    {house.type.type &&
                                    <p> {"Type: " + house.type.type} </p>
                                    }

                                    {/*                                {house.exteriorDetails && house.exteriorDetails['Lot Size'] &&
                                     <p> {"Lot Size: " + house.exteriorDetails['Lot Size']} </p>
                                     }*/}
                                    {house.price &&
                                    <p> Price: ${house.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </p>
                                    }
                                    {house.year &&
                                    <p> Year Built: {house.year} </p>
                                    }
                                </div>
                                <div className="six columns">
                                    {house.beds &&
                                    <p> {"Beds: " + house.beds} </p>
                                    }
                                    {house.bath &&
                                    <p> {"Baths: " + house.bath} </p>
                                    }
                                    {/*                                {house.exteriorDetails && house.exteriorDetails['Parking'] &&
                                     <p> {"Parking: " + house.exteriorDetails['Parking']} </p>
                                     }*/}
                                </div>

                            </div>
                        </article>
                        <article>
                            { house.price &
                            <p>house.price</p>
                            }


                        </article>

                    </Card>
                </div>
                }
            </div>
        )
            ;
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: 'id'},
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        House(id:$id){
      id,
      mls,
      type {
      type
      }
      beds,
      description,
      price,
      street,
      city{
      name
      }
      zip{
      code
      },
      image
       }
      }
    `,
    },
});