import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ question }) => {
    const settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
       
        <Slider {...settings}>
             {console.log('in caraousel',question)}
            {question.map((q, index) => (
                <div key={index}>
                    <h3 className='text-black text-5xl'>{q}</h3>
                </div>
            ))}
        </Slider>
    );
};

export default Carousel;
