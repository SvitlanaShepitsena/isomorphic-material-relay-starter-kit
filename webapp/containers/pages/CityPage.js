import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Breadcrumbs from '../../components/Common/Breadcrumbs/Breadcrumbs';
import urlToText from '../../utils/urlToText.js';

/*=Components*/
import ButtonAll from '../../components/House/ButtonAll/ButtonAll.js';
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import AppSpinner from '../../components/Common/Spinner/AppSpinner.js';

class CityPage extends React.Component {
    getChildContext() {
        return {
            location: this.props.location,
            params: this.props.routeParams,
            route: this.props.route
        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    componentDidMount() {
        this.props.relay.setVariables({
            city: this.props.params.city
        })
    }

    render() {
        let {city} = this.props.params;
        let zipsList = this.props.Viewer.City.Zips.edges;
        let typesList = this.props.Viewer.City.Types.edges;
        let newHouses = this.props.Viewer.City.Houses;
        let housesCount = this.props.Viewer.City.Houses_Count;
        let zips = zipsList.length;
        let types = typesList.length;
        let houses = newHouses.length;

        let {routes, params}= this.props;
        /*Formatter*/
        let cityFormatted = urlToText(city);

        let title = "All " + cityFormatted + " homes for sale" + " (" + housesCount + ")";

        return (
            <div>
                <Breadcrumbs routes={routes} params={params}/>
                <h1> {"Houses for Sale in " + cityFormatted} </h1>
                {!(houses || zips || types) && <AppSpinner/> }

                <ButtonAll url="all" btnLabel={title}/>

                {zips &&
                <ZipTypeList itemId="code" list={zipsList} children="Houses"
                             sectionTitle={`${cityFormatted} Homes for Sale by Zip`}/>
                }
                <br/>
                {types &&
                <ZipTypeList itemId="type" list={typesList} children="Houses"
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