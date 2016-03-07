import React, {PropTypes} from 'react';
import Slider from 'react-slick';
import appSettings from '../../settings/settings.js';
/*=styles*/
// import styles from './PhotoGallery.less';
if (process.env.BROWSER) {
    require('./PhotoGallery.less');
}

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
        const maxImage = Number(this.props.image);
        for (var i = 1; i <= maxImage; i++) {
            var image = appSettings.cloudinaryPath + this.props.houseId + '-photo-' + i + '.jpg';
            images.push(image);
        }

        return (
            <div className={styles.row}>
                <div className={styles.col1}>
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
                </div>
            </div>
        )
    }
}

export default PhotoGallery;