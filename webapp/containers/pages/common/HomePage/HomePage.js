import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import Helmet from "react-helmet";
import settings from '../../../../settings/settings.js';
import CitiesList from '../../../../components/City/CitiesList/CitiesList.js';
import HomeCities from '../../../../components/HomeCities/HomeCities.js';
import styles from './HomePage.less';

/*Components*/
import HomeHeader from '../../../../components/HomeHeader/HomeHeader.js';

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
        let helmet = settings.ogProps;
        const appType = helmet.appType;
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

    citiesList() {
        const citiesList = this.props.Viewer.Cities.edges;
        const cityUrl = "houses-for-sale/";
        const itemId = "name";
        const cityChildren = "Houses";
        return (
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <CitiesList list={citiesList}
                                    fullUrl={cityUrl}
                                    itemId={itemId}
                                    children={cityChildren}
                        />
                    </div>
                </div>
            </div>

        )
    };

    render() {
        return (
            <div>
                {this.pageHelmet()}
                <HomeHeader/>
                {this.citiesList()}
            </div>
        );
    }
}
;

export default Relay.createContainer(HomePage, {
    initialVariables: {first: 6},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Cities(first:$first) {
                    edges{
                        node{
                            id
                            name,
                            count
                        }
                    }
                }
            }
        `,
    },
});
