import React from 'react';
import {Link} from 'react-router';
import Relay from 'react-relay';

import Slider from 'react-slick';

export default class PhotoGallery extends React.Component {

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    dots: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        return (
            <div >
                {_.keys(this.props.stat).length &&
                <Slider {...settings} >
                    {_.keys(this.props.stat).map(city=> {
                        return (
                            <div key={city}>
                                <div className="CitiesSlider__card ">
                                    <Link to={`/houses-for-sale/${city.replace(/\s+/g, '-')}`}
                                          style={{textDecoration:'none'}}>
                                        <img className="CitiesSlider__card-image"
                                             src={this.props.stat[city].cityImage}
                                             alt={`${city} houses for sale`}/>
                                        <h4 className="CitiesSlider__city">
                                            {_.startCase(city) + " Homes for Sale"}
                                        </h4>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
                }
            </div>
        );
    }
}
