import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./VideoCrousel.css";

const VideoCrousel = () => {
    return (
        <div>
          <div className="video-crousel-full-width w-full">
            <div className="video-crousel-inner">
              <h2 className="text-3xl font-bold text-center mb-6 sm:mb-8 text-[#ea1900]">What We Offer</h2>
              <Swiper
              className="video-swiper-full-width"
              modules={[Pagination, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                <SwiperSlide>
                  <video className="video-slide-full-width" src="https://vardaan.netlify.app/ankitbhaiya/1.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    alt="What we offer video"
                  />
                </SwiperSlide>
                <SwiperSlide>

                    <video className="video-slide-full-width" src="https://vardaan.netlify.app/ankitbhaiya/2.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    alt="What we offer video"
                    />
                </SwiperSlide>
                <SwiperSlide>

                    <video className="video-slide-full-width" src="https://vardaan.netlify.app/ankitbhaiya/3.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    alt="What we offer video"
                    />
                    </SwiperSlide>
                    <SwiperSlide>   
                        <video className="video-slide-full-width" src="https://vardaan.netlify.app/ankitbhaiya/4.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        alt="What we offer video"
                        />
                    </SwiperSlide>
                    <SwiperSlide>   
                        <video className="video-slide-full-width" src="https://vardaan.netlify.app/ankitbhaiya/5.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        alt="What we offer video"
                        />
                    </SwiperSlide>  
            </Swiper>
            </div> {/* Close .video-crousel-inner */}
          </div> {/* Close .video-crousel-full-width */}
        </div>
    )
}

export default VideoCrousel