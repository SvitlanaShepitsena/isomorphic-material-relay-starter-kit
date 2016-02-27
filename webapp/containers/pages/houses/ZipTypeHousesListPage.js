import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

/*Components*/
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../../components/House/HousesList/HousesList.js';

class ZipTypeHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route,
            params: this.props.routeParams,

        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    componentDidMount() {
        let zipType = this.props.params.zipType;

        if (zipType.match(/^\d+$/g)) {
            this.zip = zipType;
        } else {
            this.type = zipType;
        }

        this.props.relay.setVariables({
            city: this.props.params.city,
            zip: this.zip,
            type: this.type ? this.type : this.props.params.type
        })
    }

    render() {
        const {routes, params}= this.props.routes;
        const {city} = this.props.params;

        const houses = this.props.Viewer.Houses.edges;
        const typesList = this.props.Viewer.Types.edges;

        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(this.type);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                {!this.type && <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />
                }
                {this.type && <h1>{`${typeFormatted}s for Sale in ${cityFormatted}`}</h1>}
                {this.zip && <h1>{`Houses for Sale in ${cityFormatted}, ${this.zip}`}</h1>}
                {!houses &&
                <div style={{textAlign:"center"}}>
                    <Spinner />
                </div>
                }

                {houses &&
                <HousesList
                    list={houses}
                    cityName={cityFormatted}
                    listType="inline"/>
                }
                <br/>


            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {

                Houses(city:$city,zip:$zip,type:$type, first:20){
                    edges{
                        node{
                            id
                            city{ name }
                            zip{ code }
                            type{ type }
                            price
                            built
                            street
                            beds
                            description
                            mls
                            image
                        }
                    }
                }
            }
        `,
    },
});