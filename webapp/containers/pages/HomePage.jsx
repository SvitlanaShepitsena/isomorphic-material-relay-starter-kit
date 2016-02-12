import React from 'react';
import Relay from 'react-relay';

import Card from '../../../node_modules/material-ui/lib/card/card';
import CardHeader from '../../../node_modules/material-ui/lib/card/card-header';
import CardText from '../../../node_modules/material-ui/lib/card/card-text';
import House_List from './../../components/HouseSale/House_List.jsx';
import {isomorphicVars} from '../../scripts/isomorphicVars';
import Helmet from "react-helmet";

class HomePage extends React.Component {
    render() {
        var isoVars = isomorphicVars();

        var appType = "website";
        var appUrl = "http://www.remax1stclass.com/";
        var homeDescription = "Buy or sell home, rent apartment or house in North or Northwest Chicago Suburbs. Skokie Northbrook Glenview Evanston houses apartments for sale rent";
        var homeTitle = "Houses Apartments for Sale Rent Chicago North Suburbs";
        var fbImage = "https://res.cloudinary.com/svitlana/image/upload/v1454000456/220-Remax-1st-class-logo_a4xb5o.jpg";
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
                <h1>Home Page Content</h1>

            </div>
        );
    }
}
;

export default Relay.createContainer(HomePage, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,

      }
    `,
    },
});
