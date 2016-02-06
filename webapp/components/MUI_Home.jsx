import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

class MUI_Home extends React.Component
{
  render( )
  {
    return (
      <Card>
        <CardHeader
          title="Icons"
          subtitle="How to generate all icons"
        />
        <CardText>
          If all icons need to be generated, then comment out the line
          <pre>
            if( key > 50 ) return;
          </pre>
          in scripts/build-mui-icon-list.js and run
          <pre>
            npm run build-mui-icon-list
          </pre>
        </CardText>
      </Card>
    )
  }
};

export default Relay.createContainer( MUI_Home, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
      }
    `,
  },
});
