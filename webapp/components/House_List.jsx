import React from 'react';
import Relay from 'react-relay';

//import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
//import Tabs from 'material-ui/lib/tabs/tabs';
//import Tab from 'material-ui/lib/tabs/tab';

class House_List extends React.Component {
    renderHouses() {
        return this.props.Viewer.Houses.edges.map(edge =>
            <div>

            </div>
        );
    }

    /*
     _handleTabsChange( value )
     {
     this.context.router.push( '/Translaticiarums/' + value );
     }

     renderTabs( )
     {
     return(
     <Tabs valueLink={ { value: this.props.relay.variables.status, requestChange: this._handleTabsChange.bind( this ) } }>
     <Tab label="All" value="any" />
     <Tab label="Active" value="active" />
     <Tab label="Completed" value="completed" />
     </Tabs>
     );
     }
     { this.renderTabs( ) }
     */

    render() {
        console.log(this.props);
        return (
            <div>
                <List>
                    { this.renderHouses() }
                </List>
            </div>
        );
    }
}


