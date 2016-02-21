import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import urlToText from '../../utils/urlToText.js';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from 'material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../components/House/HousesList/HousesList.js';

class ZipTypeHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        console.log('ZipTypeHousesListPage.js - line: 26');
        this.props.relay.setVariables({
            city: this.props.params.city,
            zip: this.props.params.zip,
            type: this.props.params.type
        })
    }

    render() {
        const routes = this.props.routes;
        const params = this.props.params;

        const cityName = urlToText(this.props.params.city);

        const houses = this.props.Viewer.Houses.edges;
        const zip = this.props.params.zip;
        const city = this.props.params.city;
        const type = urlToText(this.props.params.type);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                <h1>{`${type}s for Sale in ${city}, ${zip}`}</h1>
                <hr/>
                {!houses &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {houses &&
                <HousesList
                    list={houses}
                    cityName={cityName}
                    listType="inline"/>
                }
                <br/>

            </div>
        );
    }
}
;
export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(city:$city,zip:$zip,type:$type, first:20){
                    edges{
                        node{
                            id
                            city{ name }
                            zip{ code }
                            type{ type }
                            price
                            street
                            beds
                            description
                            image
                        }
                    }
                }
            }
        `,
    },
});