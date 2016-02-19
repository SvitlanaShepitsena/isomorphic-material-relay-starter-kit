import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

/*Components*/
import ListingThumbInline from '../ListingThumb/ListingThumbInline';
import ListingThumbLarge from '../ListingThumb/ListingThumbLarge';
import SvLink from './SvLink';

class HousesList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        listType: PropTypes.string.isRequired

    };

    render() {
        var cityName = this.props.cityName;
        var housesNumber = this.props.housesNumber;
        var gridColsClass = this.props.gridColsClass;
        return (
            <div style={{width:"100%"}}>
                <div className="row">
                    {this.props.list.map((edge, index)=> {
                            const house = edge.node;
                            const houseUrl = `${house.zip.code}/${house.type.type}/${house.id}`;

                            return (
                                <div className={gridColsClass ? gridColsClass : "twelve columns"} key={index}>
                                    <SvLink url={houseUrl}>
                                        {this.props.listType == "large" && <ListingThumbLarge house={house}/> }
                                        {this.props.listType == "inline" && <ListingThumbInline house={house}/> }
                                    </SvLink>
                                </div>
                            )
                        }
                    )}
                </div>
                {this.props.listType == "large" &&
                <SvLink url="all">
                    <RaisedButton style={{display: "block", margin: "0px auto"}}
                                  label={"All " + cityName + " homes for sale" +  " (" + housesNumber + ")"}
                                  primary={true}/>
                </SvLink>
                }
            </div>
        );
    }
}
;

export default HousesList;
