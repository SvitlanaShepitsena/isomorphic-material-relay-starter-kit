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
            <ul className="row">
                {this.props.houses.map((edge, index)=> {
                        const house = edge.node;
                        const houseUrl = `${house.zip.code}/${house.type.type}/${house.id}`;

                        return (
                            <li className="six columns" key={index}>
                                <SvLink url={houseUrl}>
                                    <ListingThumbLarge house={house}/>
                                </SvLink>
                            </li>
                        )
                    }
                )}
            </ul>
        );
    }
}
;

export default HousesList;
