import React from 'react';
import Slider from 'react-slick';

class PhotoGallery extends React.Component {

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='PhotoGallery'>
                <Slider {...settings}>
                    <div className="PhotoGallery__card ">
                        <img className="PhotoGallery__card-image" src={this.props.image}
                             alt=""/></div>
                    <div className="PhotoGallery__card ">
                        <img className="PhotoGallery__card-image" src={this.props.image}
                             alt=""/></div>
                    <div className="PhotoGallery__card ">
                        <img className="PhotoGallery__card-image" src={this.props.image}
                             alt=""/></div>
                </Slider>
            </div>
        );
    }
}
export default PhotoGallery; 
