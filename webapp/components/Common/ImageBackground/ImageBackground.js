import React, {PropTypes} from 'react';
import styles from './ImageBackground.less';

class ImageBackground extends React.Component {
    static propTypes = {
        backgroundImage: PropTypes.string.isRequired,
        imgWidth: PropTypes.string.isRequired,
        imgHeight: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className={styles.container}
                 style={{
                width:this.props.imgWidth,
                 height:this.props.imgHeight
                   }}>
                <i className={styles.item}
                   style={{height: this.props.imgHeight, backgroundImage: "url(" +'"'+ this.props.backgroundImage +'"'+")"
                }}/>
            </div>
        );
    }
}
export default  ImageBackground;
