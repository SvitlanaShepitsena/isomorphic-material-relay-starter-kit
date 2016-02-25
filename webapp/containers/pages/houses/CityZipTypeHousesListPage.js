import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from '../../../components/Common/Breadcrumbs';

/*MaterialUi*/
import Spinner from '../../../../node_modules/material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../../components/House/HousesList/HousesList.js';

class CityZipTypeHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        let zipType = this.props.params.zipType;

        this.zip = zipType;

        this.props.relay.setVariables({
            zip: this.zip,
            type: this.props.params.type
        })
    }

    render() {
        const routes = this.props.routes;
        const params = this.props.params;

        const houses = this.props.Viewer.Houses.edges;

        const city = this.props.params.city;
        const zip = this.zip;
        const type = this.props.params.type;

        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(type);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                 <h1>{`${typeFormatted}s for Sale in ${cityFormatted}, ${zip}`}</h1>
                <hr/>
                {!houses &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                <hr/>
                {houses &&
                <HousesList
                    list={houses}
                    cityName={cityFormatted}
                    listType="inline"/>
                }
                <br/>

            </div>
        );
    }
}
;
export default Relay.createContainer(CityZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Houses(zip:$zip,type:$type, first:20){
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