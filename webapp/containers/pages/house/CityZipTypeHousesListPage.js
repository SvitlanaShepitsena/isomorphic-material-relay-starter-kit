import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Helmet from "react-helmet";
import settings from '../../../settings/settings.js';

/*Components*/
import HousesList from '../../../components/House/HousesList/HousesList.js';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';

class CityZipTypeHousesListPage extends React.Component {
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
        this.zip = this.props.params.zipType;
        this.props.relay.setVariables({
            zip: this.zip,
            type: this.props.params.type
        })
    }

    pageHelmet() {
        let houses = this.props.Viewer.Houses.edges;
        let housesCount = this.props.Viewer.Houses_Count;
        let {city, type} = this.props.params;
        let zip = this.zip;
        /*Formatter*/
        const cityName = urlToText(city);
        const housesType = urlToText(type);

        let title = `${cityName}, ${zip} ${housesType} properties for sale | North Illinois Realty`;
        let description = `✔ Browse ${cityName}, ${zip} ${housesType} houses for sale. ${housesCount} listings for today. ☏  Call us for a free consultation and schedule a showing!`;
        let image = `${settings.cloudinaryPath}${cityName}1.jpg`;

        return (
            <Helmet
                title={title}
                meta={[
                    {"name": "description", "content": `${description}`},
                    {"name": "image", "content": `${image}`},

                    {"property": "og:title", "content": `${title}`},
                    {"property": "og:description", "content": `${description}`},
                    {"property": "og:image", "content": `${image}`}
                ]}
            />
        );
    };

    render() {
        let {routes, params}= this.props;
        let houses = this.props.Viewer.Houses.edges;
        let houseCount = this.props.Viewer.Houses_Count;
        let {city, type} = this.props.params;
        let zip = this.zip;
        /*Formatter*/
        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(type);

        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={routes} params={params}/>
                <h1>{`${typeFormatted}s for Sale in ${cityFormatted}, ${zip}`}</h1>
                {!houses && <Spinner/> }
                {houses &&
                <HousesList
                    list={houses}
                    count={houseCount}
                    cityName={cityFormatted}/>
                }
                <br/>

            </div>
        );
    }
}
;
export default Relay.createContainer(CityZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(zip:$zip,type:$type, first:20){
                    edges{
                        node{
                            id
                            city
                            zip
                            type
                            price
                            built
                            street
                            mls
                            beds
                            description
                            image
                        }
                    }
                }
            }
        `,
    },
});