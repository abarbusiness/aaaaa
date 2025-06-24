import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "./MobileCrousel.css";

const MobileCrousel = () => {
    return (

        <div className='mobile-crousel-wrapper' style={{ paddingBottom: '16px' }}>
            <div>
                <h2 className="mobile-crousel-title">What We Offer</h2>
            </div>
            <Swiper
                className="mobile-crousel-swiper"
                modules={[Pagination, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                style={{ width: '100%' }}
            >
                <SwiperSlide>
                    <img src="/slider/1.png" style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: '0 16px' }} alt="What we offer" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider/2.png" style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: '0 16px' }} alt="What we offer" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider/3.png" style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: '0 16px' }} alt="What we offer" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider/4.png" style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: '0 16px' }} alt="What we offer" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/slider/5.png" style={{ width: '100%', height: 'auto', display: 'block', margin: 0, padding: '0 16px' }} alt="What we offer" />
                </SwiperSlide>
            </Swiper>
        </div>

    )
}

export default MobileCrousel