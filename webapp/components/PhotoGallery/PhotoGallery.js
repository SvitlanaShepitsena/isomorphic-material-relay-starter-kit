import React, {PropTypes} from 'react';
import Slider from 'react-slick';
import appSettings from '../../settings/settings.js';
import styles from './PhotoGallery.less';

class PhotoGallery extends React.Component {
    static propTypes = {
        image: PropTypes.string.isRequired,
        houseId: PropTypes.string.isRequired
    };

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        var images = [];
        let {image, houseId} = this.props;
        const maxImage = Number(image);
        for (var i = 1; i <= maxImage; i++) {
            let imageUrl = `${appSettings.cloudinaryPath}${houseId}-photo-${i}.jpg`;
            images.push(imageUrl);
        }

        return (
            <div className={styles.container}>
                {!images.length == 0 &&
                <Slider   {...settings}>
                    {images.map(image=> {
                        return (
                            <div key={image}>
                                {image &&
                                <img className={styles.itemImage}
                                     src={image}
                                     alt=""/>
                                }
                            </div>
                        )
                    })}
                </Slider>
                }
            </div>
        )
    }
}

export default PhotoGallery;