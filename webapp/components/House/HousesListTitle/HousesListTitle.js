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
<<<<<<< HEAD
                <h1>{`All Houses for Sale in ${cityFormatted}`}
                    <span className={styles.counter}> {listingsNum}</span>
                </h1>}
                {/* City Type*/}
                {filterType && zipType.length > 3 &&
                <h1>{`${typeFormatted} for Sale in ${cityFormatted}`}
                    <span className={styles.counter}> {listingsNum}</span>
                </h1>}

                {/* City Zip*/}
                {filterZip &&
                <h1>{`Houses for Sale in ${cityFormatted}, ${zipType}`}
                    <span className={styles.counter}> {listingsNum}</span>
                </h1>
=======
                <H1Header>{`All ${cityFormatted} Homes for sale`}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>}
                {/* City Type*/}
                {filterType && zipType.length > 3 &&
                <H1Header>{`${cityFormatted}, ${zipType} ${typeFormatted} for Sale `}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>}

                {/* City Zip*/}
                {filterZip &&
                <H1Header>{`${cityFormatted}, ${zipType} Homes for Sale`}
                    <span className={styles.counter}> {listingsNum}</span>
                </H1Header>
>>>>>>> work-local
                }
            </div>
        );
    }
}
;

export default HousesListTitle;
