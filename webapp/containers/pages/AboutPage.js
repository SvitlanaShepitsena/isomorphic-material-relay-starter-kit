import React from 'react';
import Relay from 'react-relay';
import AboutContent from '../../components/About/AboutContent.jsx';

class AboutPage extends React.Component {
    render() {
        return (
            <div>
                <AboutContent></AboutContent>
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
        Houses(first: 10) {
          edges {
            node {
              id,
              street,
              price
            },
          },
        },
      }
    `,
    },
});