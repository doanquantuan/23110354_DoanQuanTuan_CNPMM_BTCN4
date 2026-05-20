import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart, Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slices/toastSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      dispatch(
        showToast({
          type: "success",
          title: "ĐĂNG KÝ THÀNH CÔNG",
          description: "Cảm ơn bạn đã đăng ký nhận thông tin ưu đãi bánh ngọt từ Aura!",
        })
      );
      setEmail("");
    }
  };

  return (
    <footer className="bg-bakery-dark text-white border-t border-bakery-beige/10 rounded-t-[3.5rem] mt-16 overflow-hidden">
      {/* Top Banner section */}
      <div className="bg-bakery-primary/10 border-b border-bakery-beige/5 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2 max-w-lg">
            <h3 className="text-xl md:text-2xl font-black text-amber-100">
              Nhận thông tin ưu đãi mới nhất!
            </h3>
            <p className="text-xs text-gray-300 font-semibold leading-relaxed">
              Trở thành người đầu tiên thưởng thức các vị bánh theo mùa vừa ra lò của chúng tôi và nhận ưu đãi giảm giá lên đến 25%.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative w-full max-w-md flex items-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="w-full pl-5 pr-14 py-3.5 bg-white/10 border border-white/15 focus:border-bakery-primary focus:bg-white focus:text-bakery-dark text-white placeholder-gray-400 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-bakery-primary/10 transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-2 p-2 bg-bakery-primary text-white hover:bg-white hover:text-bakery-primary rounded-xl transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer columns */}
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-left text-sm text-gray-300">
        {/* About column */}
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center space-x-2">
            <span className="font-black text-xl text-amber-100 tracking-wider">
              AURA BAKERY
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-gray-400 font-semibold">
            Tiệm bánh ngọt Aura cam kết đem đến những chiếc bánh mì hữu cơ nướng lò thủ công thơm ngon hảo hạng, sử dụng nguyên liệu cao cấp chuẩn Âu để thăng hoa vị giác của bạn.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 hover:bg-bakery-primary hover:text-white rounded-xl text-gray-300 transition-colors"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 hover:bg-bakery-primary hover:text-white rounded-xl text-gray-300 transition-colors flex items-center justify-center"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* Categories column */}
        <div className="space-y-4">
          <h4 className="text-amber-100 font-black text-sm uppercase tracking-wider">
            Sản phẩm nổi bật
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
            <li>
              <Link to="/shop" className="hover:text-amber-200 transition-colors">Bánh Kem Sinh Nhật</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-amber-200 transition-colors">Bánh Croissant Bơ Pháp</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-amber-200 transition-colors">Bánh Tiramisu Ý</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-amber-200 transition-colors">Combo Bánh và Trà Chiều</Link>
            </li>
          </ul>
        </div>

        {/* Operating hours column */}
        <div className="space-y-4">
          <h4 className="text-amber-100 font-black text-sm uppercase tracking-wider">
            Thời gian mở cửa
          </h4>
          <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
            <li>Thứ Hai - Thứ Sáu: 07:00 - 21:00</li>
            <li>Thứ Bảy - Chủ Nhật: 08:00 - 22:00</li>
            <li className="text-emerald-400 font-bold">Giao hàng tận nơi trong 30 phút</li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="space-y-4">
          <h4 className="text-amber-100 font-black text-sm uppercase tracking-wider">
            Thông tin liên hệ
          </h4>
          <ul className="space-y-3.5 text-xs font-semibold text-gray-400">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4.5 h-4.5 text-bakery-primary shrink-0" />
              <span className="leading-relaxed">
                Đường Trần Đại Nghĩa, Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn, Đà Nẵng
              </span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-bakery-primary" />
              <span>Hotline: <strong className="text-white">1900 8198</strong></span>
            </li>
            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-bakery-primary" />
              <span>Email: lienhe@aurabakery.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright area */}
      <div className="border-t border-white/5 py-6 px-6 text-center text-xs text-gray-500 font-bold bg-bakery-dark">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 Tiệm Bánh Aura Bakery. Bảo lưu mọi quyền.</span>
          <span className="flex items-center space-x-1">
            <span>Được thực hiện với</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>tại Việt Nam</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
