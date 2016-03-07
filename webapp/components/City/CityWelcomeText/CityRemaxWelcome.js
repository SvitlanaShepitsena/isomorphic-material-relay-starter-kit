'use strict';

import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class CityRemaxWelcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let saleRent = this.props.location.pathname.indexOf('sale') > -1 ? 'sale' : 'rent';
        let cityName = _.startCase(this.props.params.city.replace(/-+/g, ' '));
        return (
            <article >
                {saleRent == 'sale' &&
                <h4>
                    {
                        "Re/Max 1st Class Realty helps you to find your dream home by offering newest listings for sale in "
                        + cityName + "."
                    }
                </h4>
                }
                <p>
                    {
                        "For your best experience, we are filtering " + cityName + " listings for you by Home Type and City Zip."
                    }
                </p>

                {saleRent == 'sale' &&
                <h3 style={{color: "#D32F2F"}}> {
                    "Let us guide you, call us for a free consultation about " + cityName + " properties for sale: (847) 674-9797"
                }
                </h3>
                }

            </article>

        );
    }
}

export default CityRemaxWelcome;
