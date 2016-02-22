import React from 'react';
import Relay from 'react-relay';
import AboutContent from '../../components/AppViews/About/AboutContent.js';

class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <AboutContent/>
            </div>
        );
    }
}
;

export default Relay.createContainer(AboutPage, {
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                User_IsAnonymous,

            } `,
    },
});