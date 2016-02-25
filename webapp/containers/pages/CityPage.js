import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from 'react-breadcrumbs';
import urlToText from '../../utils/urlToText.js';

/*=Components*/
import HousesList from '../../components/House/HousesList/HousesList.js'
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import AppSpinner from '../../components/Common/Spinner/AppSpinner.js';

class CityPage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city
        })
    }

    render() {
        const city = this.props.params.city;
        const zipsList = this.props.Viewer.City.Zips.edges;
        const typesList = this.props.Viewer.City.Types.edges;
        const newHouses = this.props.Viewer.City.Houses.edges;
        const housesCount = this.props.Viewer.City.Houses_Count;
        /*Formatter*/
        let cityFormatted = urlToText(city);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
                <h1> {"Houses for Sale in " + cityFormatted} </h1>
                <br/>
                /*=spinner*/
                {!(newHouses.length || zipsList.length || typesList.length) && <AppSpinner/> }

                {newHouses.length &&
                <HousesList
                    list={newHouses}
                    gridColsClass="six columns"
                    cityName={cityFormatted}
                    housesNumber={housesCount}
                    listType="large"/>
                }
                <br/>

                {zipsList.length &&
                <ZipTypeList
                    itemId="code"
                    list={zipsList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Zip`}
                />
                }

                <br/>
                {typesList.length &&
                <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />
                }
            </div>
        );
    }
}
;
export default Relay.createContainer(CityPage, {
    initialVariables: {city: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                City(city:$city){
                    Houses_Count
                    Houses(first:2){
                        edges{
                            node{
                                id
                                city{name}
                                zip{code}
                                type{type}
                                price
                                built
                                street
                                beds
                                description
                                image
                            }
                        }
                    }
                    Zips(first:100){
                        edges{
                            node{
                                code,
                                Houses_Count
                            }
                        }
                    }

                    Types(first:100){
                        edges{
                            node{
                                type,
                                Houses_Count(city:$city)
                            }
                        }
                    }
                }
            }
        `,
    },
});