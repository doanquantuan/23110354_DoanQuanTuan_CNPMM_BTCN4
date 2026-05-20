import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroBanner = () => {
  const slides = [
    {
      id: 1,
      slogan: "Ngọt ngào từng khoảnh khắc",
      title: "Bánh Kem Dâu Tây Aura",
      description: "Sự kết hợp hoàn hảo giữa lớp kem sữa hữu cơ tươi mịn màng và dâu tây chín mọng thơm ngát.",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1000&auto=format&fit=crop",
      badge: "Best Seller - Aura Signature",
      link: "/product/strawberry-shortcake",
    },
    {
      id: 2,
      slogan: "Tinh hoa ẩm thực Pháp cổ điển",
      title: "Mille-Feuille Sô-cô-la Bỉ",
      description: "Hàng ngàn lớp bột giòn tan đan xen lớp nhân kem sô-cô-la Bỉ thượng hạng đậm đà lôi cuốn.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&auto=format&fit=crop",
      badge: "Ưu đãi 15% - Giảm cực sâu",
      link: "/product/chocolate-truffle",
    },
    {
      id: 3,
      slogan: "Thơm lừng nướng lò mỗi sáng",
      title: "Croissant Bơ Pháp Aura",
      description: "Lớp vỏ vàng óng ánh giòn tan, ruột bánh xốp mịn đậm hương bơ Isigny nhập khẩu hảo hạng.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&auto=format&fit=crop",
      badge: "Tươi mới - Ra lò mỗi ngày",
      link: "/product/classic-croissant",
    },
  ];

  return (
    <div className="w-full relative rounded-[2.5rem] overflow-hidden shadow-lg border border-bakery-beige/30 bg-bakery-bg/20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-[320px] md:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* Background Image with warm gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bakery-dark/90 via-bakery-dark/65 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 h-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col justify-center items-start text-left text-white space-y-4 md:space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{slide.badge}</span>
              </div>

              <div className="space-y-1.5 md:space-y-3 max-w-xl">
                <p className="text-amber-200 text-xs md:text-sm font-extrabold uppercase tracking-widest">
                  {slide.slogan}
                </p>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-200 text-xs md:text-base font-semibold leading-relaxed line-clamp-2 md:line-clamp-none">
                  {slide.description}
                </p>
              </div>

              <div className="pt-2 flex">
                <Link
                  to="/shop"
                  className="px-6 py-3 md:px-8 md:py-4 bg-bakery-primary hover:bg-white hover:text-bakery-primary text-white font-black rounded-2xl text-xs md:text-sm tracking-wider uppercase shadow-xl transition-all duration-300 flex items-center space-x-2 group hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Mua ngay bánh ngọt</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
