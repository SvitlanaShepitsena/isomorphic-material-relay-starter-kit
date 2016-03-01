import React, {PropTypes} from 'react';
import Relay from 'react-relay';

import Helmet from "react-helmet";

/*Components*/
import HomeHeader from '../../../components/HomeHeader/HomeHeader.js';
import HomeCities from '../../../components/HomeCities/HomeCities.js'

class HomePage extends React.Component {
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

    render() {
        var appType = "website";
        var appUrl = "http://www.remax1stclass.com/";
        var homeDescription = "Buy or sell home, rent apartment or house in North or Northwest Chicago Suburbs. Skokie Northbrook Glenview Evanston houses apartments for sale rent";
        var homeTitle = "Houses Apartments for Sale Rent Chicago North Suburbs";
        var fbImage = "https://res.cloudinary.com/svitlana/image/upload/v1454000456/220-Remax-1st-class-logo_a4xb5o.jpg";
        let cities = this.props.Viewer.Cities;
        return (
            <div>
                <Helmet
                    title={homeTitle}
                    meta={[
                    {"name": "url", "content": `${appUrl}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${homeDescription}`},
                    {"property": "og:url", "content": `${appUrl}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${homeTitle}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${homeDescription}`}
                ]}
                />
                <HomeHeader/>
                <HomeCities cities={cities}/>

            </div>
        );
    }
}
;

export default Relay.createContainer(HomePage, {
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first :6){
                    edges{
                        node{
                            name
                            Houses_Count
                        }
                    }
                }
            }
        `,
    },
});
