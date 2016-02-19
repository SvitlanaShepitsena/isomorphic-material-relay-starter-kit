import React from 'react';
import Relay from 'react-relay';
import PrivacyContent from '../../components/Privacy/PrivacyContent.jsx';
class PrivacyPage extends React.Component {
    render() {
        return (
            <div>
                <PrivacyContent/>
            </div>
        );
    }
}
;

export default Relay.createContainer(PrivacyPage, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,


      } `,
    },
});