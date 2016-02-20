import React from 'react';
import Relay from 'react-relay';
import ContactForm from '../../components/AppViews/Contact/ContactForm.js';

class ContactPage extends React.Component {
    render() {
        return (
            <div>
                <ContactForm/>
            </div>
        );
    }
}
;

export default Relay.createContainer(ContactPage, {
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