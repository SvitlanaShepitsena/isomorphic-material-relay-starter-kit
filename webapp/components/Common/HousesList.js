import React, {PropTypes} from 'react';

import ListingThumbLarge from '../ListingThumb/ListingThumbLarge';
import ListingThumbInline from '../ListingThumb/ListingThumbInline';

import SvLink from './SvLink';

class HousesList extends React.Component {
    static propTypes = {
        houses: PropTypes.array.isRequired,
        listType: PropTypes.string.isRequired

    };

    render() {
        return (
            <div className="row">
                {this.props.houses.map((edge, index)=> {
                        const house = edge.node;
                        console.log(house);

                        <div className="six columns" key={index}>
                            <ListingThumbLarge price={house.price} house={house}/>
                        </div>
                    }
                )}
            </div>
        );
    }
}
;

export default HousesList;
