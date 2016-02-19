import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

/*Components*/
import ListingThumbInline from '../ListingThumb/ListingThumbInline';
import ListingThumbLarge from '../ListingThumb/ListingThumbLarge';
import SvLink from './SvLink';

class HousesList extends React.Component {
    static propTypes = {
        houses: PropTypes.array.isRequired,
        listType: PropTypes.string.isRequired

    };

    render() {
        var cityName = this.props.cityName;
        var housesNumber = this.props.housesNumber;
        return (
            <div style={{width:"100%"}}>
                <div className="row">
                    {this.props.houses.map((edge, index)=> {
                            const house = edge.node;
                            const houseUrl = `${house.zip.code}/${house.type.type}/${house.id}`;

                            return (
                                <div className="six columns" key={index}>
                                    <SvLink url={houseUrl}>
                                        <ListingThumbLarge house={house}/>
                                    </SvLink>
                                </div>
                            )
                        }
                    )}
                </div>
                <SvLink url="all">
                    <RaisedButton style={{display: "block", margin: "0px auto"}}
                                  label={"All " + cityName + " homes for sale" +  " (" + housesNumber + ")"}
                                  primary={true}/>
                </SvLink>
            </div>
        );
    }
}
;

export default HousesList;
