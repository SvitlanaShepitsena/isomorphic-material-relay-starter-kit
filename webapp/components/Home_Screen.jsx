import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import {isomorphicVars} from '../scripts/isomorphicVars';

class Home_Screen extends React.Component
{
  render( )
  {
    var isoVars = isomorphicVars();
    console.log(isoVars);
    return ( <div>
      <Card>
        <CardHeader
          title="Isomorphic Material-UI Relay starter kit13"
          subtitle={ "Version " + isoVars.version }
        />
        <CardText>
          The purpose of this project sosi is:
          <ul>
            <li>To server as a starting point for projects involving react/relay, materual-ui and Cassandra.</li>
            <li>To host examples of using those technologies together.</li>
            <li>To implement some common functionality like user authentication using react/relay while storing user accounts in Cassandra.</li>
          </ul>
          Here is some of the functionality currently available in the project:
          <ul>
            <li>
              <b>User authentication</b> : On the top right in the navigation bar, if the user is not logged in (i.e. is being anonymous) an
              outline of a human bust is displayed.
              Clicking on it opens the log in dialog. The pre-defined user names and passwords are listed in the dialog.
              If the user is already authenticated, a small pop over with information about the current user and user-related functions is displayed.
            </li>
            <li>
              <b>Active tasks indicator</b> : If there are any un-completed To Do items, an indicator is displayed in the navigation bar with the
              number of active tasks. Clicking on it takes the user to the active tasks.
            </li>
            <li>
              <b>Navigation menu</b> : Clicking on the three vertical dots on the left of the navigation bar allows jumping to the different screens.
            </li>
            <li>
              <b>Compendiums</b> : An example of a form for an one-per user record, for instance for per-user settings. The example features
              multiple types of inputs and validation.
            </li>
            <li>
              <b>MUI</b> : Examples focusing on Material-UI elements.
            </li>
            <li>
              <b>To Do</b> : Interpretation of the ToDo example from React Relay, implemented with Material UI controls, and per-user
              To Do items.
            </li>
            <li>
              <b>Translaticiarums</b> : Simple per-user list of timed events. Allows for list view and daily agenda-like view.
            </li>
          </ul>
          Links to some of the major technologies used:
          <ul>
            <li><a href="https://facebook.github.io/react/">React JS</a></li>
            <li><a href="https://facebook.github.io/relay/">Relay / GrpahQL</a></li>
            <li><a href="https://github.com/denvned/isomorphic-relay">Isomorphic Relay</a></li>
            <li><a href="http://www.material-ui.com/">Material-UI</a></li>
            <li><a href="https://jwt.io/">JSON Web Tokens</a></li>
            <li><a href="https://nodejs.org/">Node Js</a></li>
            <li><a href="http://cassandra.apache.org/">Apache Cassandra</a></li>
          </ul>
          The project source is <a href="https://github.com/codefoundries/isomorphic-material-relay-starter-kit">available on GitHub</a>.
          <br/>
        </CardText>
      </Card>
      <br/>
      <Card>
        <CardHeader
          title="Isomorphic Variables"
          subtitle="Available both for client and server rendering"
        />
        <CardText>
          public_url: { isoVars.public_url }<br/>
          version: { isoVars.version }
        </CardText>
      </Card>
    </div> );
  }
};

export default Relay.createContainer( Home_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
});
