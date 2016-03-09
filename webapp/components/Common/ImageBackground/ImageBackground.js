import React, {PropTypes} from 'react';
import styles from './ImageBackground.less';

class ImageBackground extends React.Component {
    static propTypes = {
        backgroundImage: PropTypes.string.isRequired,
        imgWidth: PropTypes.string.isRequired,
        imgHeight: PropTypes.string.isRequired
    };

    render() {
        let {imgWidth, imgHeight, backgroundImage} = this.props;
        let img = `url("${backgroundImage}")`;
        let container = {
            height: imgHeight,
            width: imgWidth
        };
        let item = {
            backgroundImage: img,
            height: imgHeight,
        }
        return (
            <div className={styles.root} style={container}>
                <i className={styles.item} style={item}/>
            </div>
        );
    }
}
export default  ImageBackground;
