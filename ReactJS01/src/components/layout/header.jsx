import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, Menu, X, Compass, Gift, Award, HelpCircle } from "lucide-react";
import { toggleCart } from "../../store/slices/cartSlice";
import SearchBar from "../ui/SearchBar";
import UserInfo from "../ui/UserInfo";
import CartDrawer from "../ui/CartDrawer";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname + location.search === path;
  };

  const navLinks = [
    { label: "Trang chủ", path: "/" },
    { label: "Bánh ngọt", path: "/shop?category=Bánh Ngọt" },
    { label: "Combo", path: "/shop?category=Combo" },
    { label: "Khuyến mãi", path: "/shop?category=Khuyến Mãi" },
  ];

  return (
    <nav className="bg-white/95 border-b border-bakery-beige/30 sticky top-0 z-40 shadow-[0_4px_20px_rgba(139,94,60,0.05)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="bg-bakery-primary text-white p-2.5 rounded-2xl shadow-md group-hover:bg-bakery-dark transition-all duration-300 transform group-hover:rotate-12">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-black text-lg md:text-xl text-bakery-dark tracking-wider uppercase font-sans">
                Aura Bakery
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-1.5 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-bakery-bg text-bakery-primary border border-bakery-beige/50"
                      : "text-gray-500 hover:bg-bakery-bg/50 hover:text-bakery-dark"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />

            {/* Cart Icon with badge */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-3 border border-bakery-beige bg-bakery-bg/10 hover:bg-bakery-bg hover:border-bakery-primary/40 rounded-2xl text-bakery-dark transition-all duration-200 flex items-center justify-center shadow-sm"
              title="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-bakery-primary text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-md animate-pulse border border-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Auth Info or Login button */}
            {auth.isAuthenticated ? (
              <UserInfo />
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-bakery-beige hover:bg-bakery-bg text-bakery-dark font-extrabold rounded-2xl text-sm transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-bakery-primary hover:bg-bakery-dark text-white rounded-2xl text-sm font-black shadow-md hover:shadow-lg transition-all duration-150 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-2.5 md:hidden">
            {/* Cart Icon for Mobile */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2.5 bg-bakery-bg/20 text-bakery-dark rounded-xl transition-all"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-bakery-primary text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-bakery-bg/15 text-bakery-dark rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5.5 h-5.5 stroke-[2.2]" />
              ) : (
                <Menu className="w-5.5 h-5.5 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-bakery-beige/30 bg-white px-5 py-4 space-y-4 shadow-inner text-left animate-slide-in">
          <div className="w-full">
            <SearchBar />
          </div>

          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all ${
                  isActive(link.path)
                    ? "bg-bakery-bg text-bakery-primary border-l-4 border-bakery-primary pl-3"
                    : "text-gray-500 hover:bg-bakery-bg/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-bakery-bg/50 pt-4 flex flex-col space-y-3">
            {auth.isAuthenticated ? (
              <div className="flex flex-col space-y-3 px-2">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-bakery-primary text-white flex items-center justify-center font-bold uppercase">
                    {auth.user?.name ? auth.user.name.charAt(0) : auth.user?.email.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-bakery-dark leading-none">{auth.user?.name || "Khách Aura"}</p>
                    <p className="text-xs text-gray-400 mt-1">{auth.user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-bakery-primary hover:bg-bakery-dark text-white rounded-xl text-center text-sm font-black transition-all"
                >
                  Quản lý tài khoản
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 border border-bakery-beige rounded-xl text-center text-xs font-black text-bakery-dark hover:bg-bakery-bg transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 bg-bakery-primary text-white rounded-xl text-center text-xs font-black hover:bg-bakery-dark transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer trượt bên phải */}
      <CartDrawer />
    </nav>
  );
};

export default Header;
