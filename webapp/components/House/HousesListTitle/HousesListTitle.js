import React, {PropTypes} from 'react';
import styles from './HousesListTitle.less';
import urlToText from '../../../utils/urlToText.js';

import H1Header from '../../../components/Common/H1Header/H1Header.js';

class HousesListTitle extends React.Component {
    static propTypes = {
        zipType: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cityFormatted: PropTypes.string.isRequired
    };

    render() {
        const {zipType, cityFormatted, count} = this.props;
        let all = zipType.match(/all/);
        let filterType = zipType.match(/^[^\d+]+$/g);
        let filterZip = zipType.match(/^\d+$/g);
        /*Formatter*/
        let typeFormatted = urlToText(zipType);
        const listingsNum = `(${count} listings)`;
        return (
            <div>
                {all &&
                <H1Header>{`All ${cityFormatted} homes for sale`}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>}
                {/* City Type*/}
                {filterType && zipType.length > 3 &&
                <H1Header>{`${cityFormatted}, ${zipType} ${typeFormatted} for Sale `}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>}

                {/* City Zip*/}
                {filterZip &&
                <H1Header>{`${cityFormatted}, ${zipType} homes for sale`}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>
                }
            </div>
        );
    }
}
;

export default HousesListTitle;
