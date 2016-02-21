import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/*=MaterialUi*/
import CityThumbPicture from '../CityThumb/CityThumbPicture.js';

/*=Components*/
import SvLink from '../../Common/SvLink.js';

export default class CitiesList extends React.Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        children: PropTypes.string
    };

    render() {
        return (
            <div className="row ColsList-4">
                {this.props.list.map(edge => {
                        const item = edge.node;
                        const itemId = this.props.itemId;
                        const children = this.props.children;
                        const itemValue = item[itemId];
                    
                        return (
                            <div className="four columns" key={itemValue}>
                                <SvLink url={itemValue}>
                                    <CityThumbPicture
                                        housesLength={item[`${children}_Count`]}
                                        cityName={itemValue}/>
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

