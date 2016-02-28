import React, {PropTypes} from 'react';
import settings from '../../settings/settings.js';

/*=components*/
import Search from '../../components/Search/SearchFormSimple.js';

/*=styles*/
import styles from './HomeHeader.less';

class HomeHeader extends React.Component {
    static propTypes = {};

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.row}>
                    <div className={styles.col1}>
                        <img className={styles.companyLogo}
                             src={settings.companyLogoLarge}
                             alt={settings.companyName}/>
                    </div>
                </div>
                <div className={styles.rowSlogan}>
                    <div className={styles.col1}>
                        <h1 className={styles.companySlogan}>
                            <span> You Need Only One Company </span>
                            <br/>
                            <span> For All Your Real Estate Needs </span>
                        </h1>
                    </div>
                </div>
                <div className={styles.rowSearch}>
                    <div className={styles.searchContainer}>
                        <Search/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeHeader;