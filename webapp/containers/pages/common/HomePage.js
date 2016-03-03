import React, {PropTypes} from 'react';
import Relay from 'react-relay';

import Helmet from "react-helmet";

/*Components*/
import HomeHeader from '../../../components/HomeHeader/HomeHeader.js';
import HomeCities from '../../../components/HomeCities/HomeCities.js'
import settings from '../../../settings/settings.js';

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

    pageHelmet() {
        let helmet = settings.helmet;
        const appType = settings.appType;
        const homeUrl = helmet.appUrl;
        const homeDescription = helmet.appDescription;
        const homeTitle = helmet.appTitle;
        const fbImage = helmet.fbImage;
        return (
            <Helmet
                title={homeTitle}
                meta={[
                    {"name": "url", "content": `${homeUrl}`},
                    {"name": "type", "content": `${appType}`},
                    {"name": "image", "content": `${fbImage}`},
                    {"name": "description", "content": `${homeDescription}`},
                    {"property": "og:url", "content": `${homeUrl}`},
                    {"property": "og:type", "content": `${appType}`},
                    {"property": "og:title", "content": `${homeTitle}`},
                    {"property": "og:image", "content": `${fbImage}`},
                    {"property": "og:description", "content": `${homeDescription}`}
                ]}
            />
        );
    };

    render() {
        return (
            <div>
                {this.pageHelmet()}
                <HomeHeader/>
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
                        }
                    }
                }
            }
        `,
    },
});
