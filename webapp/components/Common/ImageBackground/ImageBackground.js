import React, {PropTypes} from 'react';
// import styles from './ImageBackground.less';
if (process.env.BROWSER) {
    require('./ImageBackground.less');
}

class ImageBackground extends React.Component {
    static propTypes = {
        backgroundImage: PropTypes.string.isRequired,
        imgWidth: PropTypes.string.isRequired,
        imgHeight: PropTypes.string.isRequired
    };

    render() {
        let {imgWidth, imgHeight, backgroundImage} = this.props;
        let img = `url("${backgroundImage}")`;
        return (
            <div className={styles.container}
                 style={{width:imgWidth, height:imgHeight }}>
                <i className={styles.item}
                   style={{height: imgHeight, backgroundImage: img }}/>
            </div>
        );
    }
}
export default  ImageBackground;
