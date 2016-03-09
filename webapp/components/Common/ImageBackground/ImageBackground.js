import React, {PropTypes} from 'react';

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
            overflow: 'hidden',
            position: 'relative',
            width: imgWidth
        };
        let item = {
            backgroundImage: img,
            backgroundPosition: "center 30%",
            backgroundSize: "cover",
            display: "block",
            height: imgHeight,
            minHeight: "100%"
        }
        return (
            <div style={container}>
                <i style={item}/>
            </div>
        );
    }
}
export default  ImageBackground;
