import React, {PropTypes} from 'react';
import Slider from 'react-slick';
import appSettings from '../../settings/settings.js';
import styles from './PhotoGallery.less';

class PhotoGallery extends React.Component {
    static propTypes = {
        city: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        houseId: PropTypes.string.isRequired
    };

    render() {
        var {city} = this.props;
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
<<<<<<< HEAD
            var imageUrl = `${appSettings.cloudinaryPath}${houseId}-photo-${i}.jpg`;
=======
            let imageUrl  = `${appSettings.cloudinaryPath}${houseId}/house-photo-${i}.jpg`;
>>>>>>> work-local
            images.push(imageUrl);
        }

        return (
            <div className={styles.container}>
                <Slider   {...settings}>
                    {images.map(image=> {
                        return (
                            <div key={image}>
                                { image &&
                                <img className={styles.itemImage}
                                     src={image}
                                     alt=""/>
                                }
                                { !image &&
                                <img className={styles.defaultImage}
                                     src={appSettings.houseDefault}
                                     alt=""/>
                                }
                            </div>
                        )
                    })
                    }
                </Slider>
            </div>
        )
    }
}

export default PhotoGallery;