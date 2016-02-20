import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';

/*=MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';

/*=Components*/
import CitiesList from '../../components/City/CitiesList/CitiesList.js';

class CitiesSalePage extends React.Component {
    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    render() {
        const cities = this.props.Viewer.Cities.edges;

        return (
            <div>
                <br/>
                <h1>
                    North Chicago Suburbs Houses for Sale
                </h1>
                <hr/>

                {!cities.length &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }
                <CitiesList list={cities}/>
            </div>
        );
    }
}
;

export default Relay.createContainer(CitiesSalePage, {
    fragments: {
        Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
          Cities(first :100){
            edges{
               node{
                 name,
                  Houses_Count
                }
              }
            }
          }
        `,
    },
});
