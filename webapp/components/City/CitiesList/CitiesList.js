import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/*=MaterialUi*/
import CityThumbPicture from '../CityThumb/CityThumbPicture.js';

/*=Components*/
import SvLink from '../../Common/SvLink.js';

export default class CitiesList extends React.Component {

    static propTypes = {
        list: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className="row ColsList-4">
                {this.props.list.map((city, index)=> {
                        return (

                            <div className="four columns" key={index}>
                                <SvLink url={city.node.name}>
                                    <CityThumbPicture
                                        housesLength={city.node.Houses_Count}
                                        cityName={city.node.name}/>
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

