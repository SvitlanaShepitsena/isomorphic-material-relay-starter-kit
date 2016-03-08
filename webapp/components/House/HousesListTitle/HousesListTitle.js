import React, {PropTypes} from 'react';
import styles from './HousesListTitle.less';
import urlToText from '../../../utils/urlToText.js';

class HousesListTitle extends React.Component {
    static propTypes = {
        zipType: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        cityFormatted: PropTypes.string.isRequired
    };

    render() {
        const {zipType, cityFormatted, count}=this.props;
        let all = zipType.match(/all/);
        let filterType = zipType.match(/^[^\d+]+$/g);
        let filterZip = zipType.match(/^\d+$/g);
        /*Formatter*/
        let typeFormatted = urlToText(zipType);
        return (
            <div>
                {all &&
                <h1>{`All Houses for Sale in ${cityFormatted}`}
                    <span className={styles.counter}> {`(${count} listings)` }</span>
                </h1>}
                {/* City Type*/}
                {filterType && zipType.length > 3 &&
                <h1>{`${typeFormatted} for Sale in ${cityFormatted}`}
                    <span className={styles.counter}> {`(${count} listings)` }</span>
                </h1>}

                {/* City Zip*/}
                {filterZip &&
                <h1>{`Houses for Sale in ${cityFormatted}, ${zipType}`}
                    <span className={styles.counter}> {`(${count} listings)` }</span>
                </h1>
                }
            </div>
        );
    }
}
;

export default HousesListTitle;
