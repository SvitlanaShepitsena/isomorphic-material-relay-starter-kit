import React, {PropTypes} from 'react';

/*=Components*/
import SvLink from './SvLink';

class HousesByPropsList extends React.Component {
    static propTypes = {
        item: PropTypes.string.isRequired
    };

    render() {
        var sectionTitle = this.props.sectionTitle;
        return (
            <div className="row">
                {this.props.list.map((edge, index)=> {

                        <div className="six columns" key={index}>
                            <SvLink url={svLinkUrl}>
                                <ListingThumbLarge house={}/>
                            </SvLink>
                        </div>
                    }
                )}
            </div>
        );
    }
}
;

export default HousesByPropsList;
