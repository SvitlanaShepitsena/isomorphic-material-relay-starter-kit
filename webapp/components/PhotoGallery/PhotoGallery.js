import React from 'react';
import Slider from 'react-slick';
import appSettings from '../../settings/settings';

class PhotoGallery extends React.Component {

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        };
        var images = [];
        const maxImage = Number(this.props.image);
        for (var i = 1; i <= maxImage; i++) {

            var image = appSettings.cloudinaryPath+ this.props.id + '-photo-' + i + '.jpg';
            images.push(image);

        }

        return (
            <div className='PhotoGallery'>
                    {images.map(image=> {
                        return (
                            <div className="PhotoGallery__card" key={image}>
                                <img className="PhotoGallery__card-image" src={image}
                                     alt=""/></div>
                        )
                    })
                    };

            </div>
        );
    }
}
export default PhotoGallery;
