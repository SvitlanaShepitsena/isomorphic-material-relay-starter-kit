import React from 'react';
import Relay from 'react-relay';
import TermsContent from '../../components/AppViews/Terms/TermsContent.js';

class TermsPage extends React.Component {
    render() {
        return (
            <div>
                <TermsContent/>
            </div>
        );
    }
}
;

export default Relay.createContainer(TermsPage, {
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                User_IsAnonymous,

            } `,
    },
});