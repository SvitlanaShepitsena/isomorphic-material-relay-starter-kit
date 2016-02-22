import React, {PropTypes} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import urlToText from '../../../utils/urlToText.js';
import Breadcrumbs from 'react-breadcrumbs';

/*MaterialUi*/
import Spinner from '../../../../node_modules/material-ui/lib/circular-progress';

/*Components*/
import ZipTypeList from '../../../components/City/ZipTypeList/ZipTypeList.js';
import HousesList from '../../../components/House/HousesList/HousesList.js';

class ZipTypeHousesListPage extends React.Component {
    state = {compare: true};

    getChildContext() {
        return {location: this.props.location};
    };

    static childContextTypes = {
        location: PropTypes.object.isRequired
    };

    componentDidMount() {
        let zipType = this.props.params.zipType;

        if (zipType.match(/^\d+$/g)) {
            this.zip = zipType;
        } else {
            this.type = zipType;
        }

        this.props.relay.setVariables({
            city: this.props.params.city,
            zip: this.zip,
            type: this.type ? this.type : this.props.params.type
        })
    }

    render() {
        const routes = this.props.routes;
        const params = this.props.params;

        const houses = this.props.Viewer.Houses.edges;
        const typesList = this.props.Viewer.Types.edges;

        const city = this.props.params.city;

        const cityFormatted = urlToText(city);
        const typeFormatted = urlToText(this.type);

        return (
            <div>
                <br/>
                <Breadcrumbs routes={routes} params={params}/>

                {this.type && <h1>{`${typeFormatted}s for Sale in ${cityFormatted}`}</h1>}
                {this.zip && <h1>{`Houses for Sale in ${cityFormatted}, ${this.zip}`}</h1>}
                <hr/>
                {!houses &&
                <div style={{textAlign:"center"}}>
                    <Spinner size={1.5}/>
                </div>
                }

                {!this.type && <ZipTypeList
                    itemId="type"
                    list={typesList}
                    children="Houses"
                    sectionTitle={`${cityFormatted} Homes for Sale by Property Type`}
                />}
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
export default Relay.createContainer(ZipTypeHousesListPage, {
    initialVariables: {city: '', zip: '', type: ''},
    fragments: {
        Viewer: () => Relay.QL`
            fragment on Viewer {
                Types(zip: $zip, first:100) {
                    edges {
                        node {
                            type,
                            Houses_Count(zip:$zip)
                        }
                    }
                }
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