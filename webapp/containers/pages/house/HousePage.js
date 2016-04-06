import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import Breadcrumbs from '../../../components/Common/Breadcrumbs/Breadcrumbs';
import Spinner from '../../../components/Common/Spinner/AppSpinner.js';
import urlToText from '../../../utils/urlToText.js';
import settings from '../../../settings/settings.js';

/*Components*/
import HouseInfo from '../../../components/House/HouseInfo/HouseInfo.js';

class HousePage extends React.Component {
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route,
            params: this.props.routeParams
        };
    };

    static childContextTypes = {
        location: PropTypes.object,
        params: PropTypes.object,
        route: PropTypes.object
    };

    pageHelmet() {
        let house = this.props.Viewer.House;
        let {city, description, mls, street, type, zip} = house;

        /*Formatter*/
        const cityFormatted = urlToText(city);
        const streetFormatted = urlToText(street);
        const typeFormatted = urlToText(type);

<<<<<<< HEAD
        const pageTitle = `${cityFormatted} home for sale | ${streetFormatted}. ID: ${mls}`;
        const ogTitle = `FOR SALE! ☆ ${streetFormatted}, ${cityFormatted}, ${zip} ☆ Re/Max 1st Class`;

        const pageDescription = `${mls} | Check out and schedule a showing! ${description}`;
        const ogDescription = `${typeFormatted} ${mls}  ✔ Check out and schedule a showing! ☏  ${description}`;

        const pageImage = `${settings.cloudinaryPath}${house.id}-photo-1.jpg`;
=======
        const title = `${cityFormatted} ${typeFormatted} for sale | ${streetFormatted}. #${mls}`;
        const ogTitle = `FOR SALE! ☆ ${streetFormatted}, ${cityFormatted}, ${zip} ☆ Re/Max 1st Class`;

        const description = `${mls} | Check out and schedule a showing! ${houseDescription}`;
        const ogDescription = `${typeFormatted} ${mls}  ✔ Check out and schedule a showing! ☏  ${houseDescription}`;
        let image;
        if (city == 'evanston') {
            image = `${settings.cloudinaryPath2}${house.id}-photo-1.jpg`;
        } else {
            image = `${settings.cloudinaryPath}${house.id}-photo-1.jpg`;
        }
>>>>>>> work-local

        return (
            <Helmet
                title={pageTitle}
                meta={[
                    {"name": "description", "content": `${pageDescription}`},
                    {"name": "image", "content": `${pageImage}`},

                    {"property": "og:title", "content": `${ogTitle}`},
                    {"property": "og:description", "content": `${ogDescription}`},
                    {"property": "og:image", "content": `${pageImage}`}
                ]}
            />
        );
    };

    render() {
        let {routes, params} = this.props;
        let house = this.props.Viewer.House;
        return (
            <div>
                {this.pageHelmet()}
                <Breadcrumbs routes={routes} params={params}/>
                <HouseInfo house={house}/>
            </div>
        );
    }
}
;
export default Relay.createContainer(HousePage, {
    initialVariables: {id: null},
    prepareVariables({id}) {

        return {id: id};
    },
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer
            {
                House(id : $id )
                {
                    id,
                    mls,
                    type
                    beds,
                    baths,
                    description,
                    price,
                    street,
                    built,
<<<<<<< HEAD
=======
                    since,
>>>>>>> work-local
                    city,
                    zip,
                    image,
                    details
                }
            }
        `,
    },
});