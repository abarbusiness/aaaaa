import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./TeacherSlider.css";

const slides = [
  {
    img: "/img/avatar-1.png",
    name: "Ankit Raj Sharma",
    desc: "NIT Jamshedpur",
    desc2: "B.Tech",
  },
  {
    img: "/img/avatar-2.png",
    name: "Ankit Bhaiya",
    desc: "NIT Jamshedpur",
    desc2: "B.Tech",
  },
  {
    img: "/img/avatar-3.png",
    name: "Boby Mahato",
    desc: "Jamshedpur Woman College ",
    desc2: "B.Com",
  },
  {
    img: "/img/avatar-4.png",
    name: "Anupama Kumari",
    desc: "Jamshedpur Woman College",
    desc2: "B.A",
  },
];

export default function TeacherSlider() {
  return (
    <section className="slider-wrapper w-full p-4">
      <div className="card__container">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={4}
          centeredSlides={true}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={500}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <article className="card__article">
                <div className="card__image">
                  <img src={slide.img} alt={slide.name} className="card__img" />
                  <div className="card__shadow"></div>
                </div>
                <div className="card__data">
                  <h3 className="card__name">{slide.name}</h3>
                  <p className="card__description">{slide.desc}</p>
                  <p className="card__description">{slide.desc2}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

