import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Link} from 'react-router';

/*Components*/
import HouseThumbInline from '../HouseThumbInline/HouseThumbInline';
import HouseThumbLarge from '../HouseThumbLarge/HouseThumbLarge';
import SvLink from './../../Common/SvLink';

export default class HousesList extends React.Component {
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
                            const houseThumbUrl = `${house.zip.code}/${house.type.type}/${house.id}`;
                            const houseInlineUrl = `${house.city.name}/${house.zip.code}/${house.type.type}/${house.id}`;
                            return (
                                <div className={gridColsClass ? gridColsClass : "twelve columns"} key={index}>
                                    {this.props.listType == "large" &&
                                    <SvLink url={houseThumbUrl}>
                                        <HouseThumbLarge house={house}/>
                                    </SvLink>
                                    }
                                    {this.props.listType == "inline" &&
                                    <Link to={`/houses-for-sale/${houseInlineUrl}`}>
                                        <HouseThumbInline house={house}/>
                                    </Link>
                                    }
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

