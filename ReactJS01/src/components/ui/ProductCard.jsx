import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart, toggleCart } from "../../store/slices/cartSlice";
import { showToast } from "../../store/slices/toastSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    price,
    originalPrice,
    image,
    rating = 5,
    isNew = false,
    isBestSeller = false,
    soldCount = 0,
    stock = 10,
    category = "Bánh Ngọt",
  } = product;

  // Calculate discount percentage
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stock <= 0) {
      dispatch(
        showToast({
          type: "error",
          title: "HẾT HÀNG",
          description: `Sản phẩm ${name} hiện đã tạm hết hàng!`,
        })
      );
      return;
    }

    dispatch(addToCart({ id, name, price, image, quantity: 1, stock }));
    dispatch(
      showToast({
        type: "success",
        title: "ĐÃ THÊM GIỎ HÀNG",
        description: `Đã thêm 1 chiếc ${name} vào giỏ hàng thành công!`,
      })
    );
  };

  return (
    <div className="group relative bg-white border border-bakery-beige/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges Container */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase rounded-full shadow-sm">
            Mới
          </span>
        )}
        {isBestSeller && (
          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-full shadow-sm">
            Best Seller
          </span>
        )}
        {discountPercent > 0 && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Image Area */}
      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden bg-bakery-bg/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Soft elegant overlay on hover */}
        <div className="absolute inset-0 bg-bakery-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col text-left justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>{category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Name */}
          <Link to={`/product/${id}`}>
            <h3 className="mt-2 text-base font-extrabold text-bakery-dark hover:text-bakery-primary line-clamp-1 transition-colors duration-200">
              {name}
            </h3>
          </Link>

          {/* Sold and Stock Info */}
          <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
            <span>Đã bán: <strong className="font-bold text-gray-700">{soldCount}</strong></span>
            {stock <= 3 ? (
              <span className="text-red-500 font-bold">Chỉ còn {stock} chiếc</span>
            ) : (
              <span className="text-emerald-600 font-medium">Còn hàng ({stock})</span>
            )}
          </div>
        </div>

        {/* Pricing & Add Button */}
        <div className="flex items-center justify-between pt-2 border-t border-bakery-bg/60">
          <div className="flex flex-col">
            <span className="text-lg font-black text-bakery-primary">
              {price.toLocaleString("vi-VN")}đ
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-gray-400 line-through font-semibold">
                {originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`p-3 rounded-2xl transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center ${
              stock <= 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-bakery-primary text-white hover:bg-bakery-dark hover:shadow-lg"
            }`}
            title="Thêm vào giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
