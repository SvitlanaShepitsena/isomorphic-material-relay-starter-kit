import React, {PropTypes} from 'react';
import settings from '../../settings/settings.js';


/*=components*/
import Search from '../../components/Search/SearchFormSimple.js';

/*=styles*/
import styles from './HomeHeader.less';

class HomeHeader extends React.Component {
    showLogo() {
        return (
            <div className={styles.row}>
                <div className={styles.col1}>
                    <img className={styles.companyLogo}
                         src={settings.companyLogoLarge}
                         alt={settings.companyName}/>
                </div>
            </div>

        );
    };

    showSlogan() {
        return (
            <div className={styles.row}>
                <div className={styles.col1}>
                    <h1 className={styles.companySlogan}>
                        <span> You Need Only One Company </span>
                        <br/>
                        <span> For All Your Real Estate Needs </span>
                    </h1>
                </div>
            </div>
        );
    };

    showPhone() {
        return (
            <div className={styles.row}>
                <div className={styles.col1}>
                    <h2 className={styles.h2content}>
                        <span className={styles.h2Line}>
                        <span className={styles.ready}> Ready to buy or sell a house?</span>
                            <span className={styles.ourAgents}> Our agents will help you realize your dreams. </span>
                        </span>
                        <span className={styles.h2CallUs}> Call us for a free consultation:</span>
                        <span className={styles.h2Phone}> (847) 674-9797 </span>
                    </h2>
                </div>
            </div>
        );
    };

    showSearch() {
        return (
            <div className={styles.row}>
                <div className={styles.searchContainer}>
                    <Search/>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className={styles.wrapper}>
                {this.showLogo()}
                {this.showSlogan()}
                {this.showSearch()}
                {this.showPhone()}
                <h2 style={{textAlign:"center", fontSize:18, color:"whitesmoke"}}>
                </h2>
            </div>
        )
    }
}

export default HomeHeader;