import React, { useState, useEffect } from "react";
import HeroBanner from "../components/ui/HeroBanner";
import ProductCard from "../components/ui/ProductCard";
import ProductSlider from "../components/ui/ProductSlider";
import { getProductsApi } from "../util/api";
import { Sparkles, Compass, Clock, Award, Coffee, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductSkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white border border-bakery-beige/30 rounded-3xl p-5 space-y-4 animate-pulse">
        <div className="bg-gray-100 aspect-square rounded-2xl w-full" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded w-1/3" />
          <div className="h-4.5 bg-gray-100 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsApi();
        if (res) {
          // If the backend returns directly or nested
          const data = Array.isArray(res) ? res : (res.data || []);
          setProducts(data);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract sections
  const newProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const promoProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  // Countdown Sale state: 2 hours 14 minutes 45 seconds initial timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }

        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }

        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="space-y-16 animate-slide-in bg-bakery-bg/15 rounded-[2.5rem] p-2 md:p-6">
      {/* 1. Hero Banner Slider */}
      <HeroBanner />

      {/* 2. Brand Value Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {[
          {
            icon: <Clock className="w-6 h-6 text-bakery-primary" />,
            title: "Nướng Mới Mỗi Sáng",
            desc: "Bánh được nướng tươi nóng tại lò vào 5:00 sáng mỗi ngày.",
          },
          {
            icon: <Award className="w-6 h-6 text-bakery-primary" />,
            title: "Nguyên Liệu Chuẩn Âu",
            desc: "100% bơ lạt Isigny Normandy, bột Pháp và sô-cô-la Bỉ nguyên chất.",
          },
          {
            icon: <Coffee className="w-6 h-6 text-bakery-primary" />,
            title: "Trà Chiều Tinh Tế",
            desc: "Các combo trà hoa quả mật ong ăn kèm bánh macarons thanh tao.",
          },
          {
            icon: <Heart className="w-6 h-6 text-bakery-primary" />,
            title: "Chăm Sóc Tận Tâm",
            desc: "Dịch vụ giao bánh tận nơi nhanh chóng, bảo quản kem chuyên nghiệp.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border border-bakery-beige/35 bg-white rounded-3xl space-y-2.5 shadow-[0_4px_15px_rgba(139,94,60,0.02)]"
          >
            <div className="p-3.5 bg-bakery-bg/50 rounded-2xl">{item.icon}</div>
            <h4 className="text-sm font-black text-bakery-dark">{item.title}</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Section: Sản phẩm mới nhất */}
      <section className="space-y-6 text-left max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between border-b border-bakery-beige/50 pb-4">
          <div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-emerald-200">
              Freshly Baked
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-bakery-dark mt-2">
              Sản phẩm mới ra
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Những ổ bánh thơm lừng vừa hoàn thành quy trình nướng thủ công.
            </p>
          </div>
          <Link
            to="/shop?filter=isNew"
            className="text-xs font-black text-bakery-primary hover:text-bakery-dark transition-colors uppercase tracking-wider flex items-center space-x-1"
          >
            <span>Xem tất cả</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Banner quảng bá quy trình làm bánh thủ công */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="relative rounded-[2.5rem] bg-bakery-dark text-white p-8 md:p-14 overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bakery-primary/10 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-bakery-beige/5 rounded-full blur-2xl pointer-events-none -ml-28 -mb-28" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="space-y-4 max-w-xl">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black tracking-wider uppercase border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Nghệ Thuật Làm Bánh Aura</span>
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-amber-100">
                100% Lò Nướng Thủ Công <br />
                Đậm Đà Hương Vị Cổ Điển Pháp
              </h2>
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-semibold">
                Tại Aura Bakery, mỗi chiếc bánh ngọt hay bánh mì giòn tan đều là kết quả của quá trình ủ men tự nhiên kéo dài 18 tiếng, nướng chín trên phiến đá núi lửa để đạt được cấu trúc xốp ẩm hoàn hảo cùng lớp vỏ ngàn lớp tuyệt đẹp.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-bakery-primary hover:bg-white hover:text-bakery-primary text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all duration-300 inline-block active:scale-95"
                >
                  Khám phá Aura Menu
                </Link>
              </div>
            </div>
            <div className="w-full md:w-[350px] aspect-square rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/10">
              <img
                src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop"
                alt="Artisanal process"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Bán chạy nhất (Dùng ProductSlider) */}
      <section className="space-y-6 text-left max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between border-b border-bakery-beige/50 pb-4">
          <div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-200">
              Best Sellers
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-bakery-dark mt-2">
              Bánh ngọt bán chạy nhất
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Những hương vị được đông đảo thực khách của Aura Bakery yêu thích nhất.
            </p>
          </div>
        </div>

        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <ProductSlider products={bestSellers} />
        )}
      </section>

      {/* 6. Section: Khuyến mãi và Countdown Sale */}
      <section className="space-y-6 text-left max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-bakery-beige/50 pb-5 gap-4">
          <div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-red-50 text-red-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-200">
              Flash Sale Ưu Đãi
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-bakery-dark mt-2">
              Khuyến mãi ngọt ngào
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Mức giá ưu đãi đặc biệt để sẻ chia hương vị nướng tuyệt hảo cùng gia đình.
            </p>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black text-bakery-dark uppercase tracking-widest mr-1.5 animate-pulse">
              Kết thúc sau:
            </span>
            <div className="flex items-center space-x-1">
              <div className="bg-bakery-dark text-white font-black text-sm px-3 py-2 rounded-xl shadow-sm border border-white/10">
                {formatNumber(timeLeft.hours)}
              </div>
              <span className="font-extrabold text-bakery-dark">:</span>
              <div className="bg-bakery-dark text-white font-black text-sm px-3 py-2 rounded-xl shadow-sm border border-white/10">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span className="font-extrabold text-bakery-dark">:</span>
              <div className="bg-bakery-dark text-white font-black text-sm px-3 py-2 rounded-xl shadow-sm border border-white/10">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {promoProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
