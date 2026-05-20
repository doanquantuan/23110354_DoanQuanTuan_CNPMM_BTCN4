import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/ui/FilterSidebar";
import ProductCard from "../components/ui/ProductCard";
import { getProductsApi } from "../util/api";
import { SlidersHorizontal, Grid, AlertCircle, Sparkles } from "lucide-react";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialFilter = searchParams.get("filter") || "";

  // Data state from backend
  const [products, setProducts] = useState([]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [filters, setFilters] = useState({
    isNew: initialFilter === "isNew",
    isBestSeller: initialFilter === "isBestSeller",
    hasDiscount: false,
    inStock: false,
  });

  const [sortOption, setSortOption] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsApi();
        if (res) {
          const data = Array.isArray(res) ? res : (res.data || []);
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (err) {
        console.error("Lỗi tải danh sách sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Sync category from URL search params
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Sync isNew/isBestSeller from URL search params
  useEffect(() => {
    if (initialFilter === "isNew") {
      setFilters((prev) => ({ ...prev, isNew: true, isBestSeller: false }));
    } else if (initialFilter === "isBestSeller") {
      setFilters((prev) => ({ ...prev, isNew: false, isBestSeller: true }));
    }
  }, [initialFilter]);

  // Apply filters and sorting with a premium artificial skeleton loading lag
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      let result = [...products];

      // 1. Search keyword filter
      if (searchWord.trim()) {
        const query = searchWord.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory !== "Tất Cả") {
        if (selectedCategory === "Khuyến Mãi") {
          result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
        } else {
          result = result.filter((p) => p.category === selectedCategory);
        }
      }

      // 3. Price range filter
      if (selectedPriceRange !== "all") {
        if (selectedPriceRange === "under-50") {
          result = result.filter((p) => p.price < 50000);
        } else if (selectedPriceRange === "50-100") {
          result = result.filter((p) => p.price >= 50000 && p.price <= 100000);
        } else if (selectedPriceRange === "100-200") {
          result = result.filter((p) => p.price >= 100000 && p.price <= 200000);
        } else if (selectedPriceRange === "over-200") {
          result = result.filter((p) => p.price > 200000);
        }
      }

      // 4. Special flags (isNew, isBestSeller, hasDiscount, inStock)
      if (filters.isNew) {
        result = result.filter((p) => p.isNew);
      }
      if (filters.isBestSeller) {
        result = result.filter((p) => p.isBestSeller);
      }
      if (filters.hasDiscount) {
        result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
      }
      if (filters.inStock) {
        result = result.filter((p) => p.stock > 0);
      }

      // 5. Rating filter
      if (selectedRating > 0) {
        result = result.filter((p) => p.rating >= selectedRating);
      }

      // 6. Sorting
      if (sortOption === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortOption === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sortOption === "sold") {
        result.sort((a, b) => b.soldCount - a.soldCount);
      }

      setFilteredProducts(result);
      setLoading(false);
    }, 450); // 450ms elegant loading simulation

    return () => clearTimeout(timer);
  }, [searchWord, selectedCategory, selectedPriceRange, filters, selectedRating, sortOption, products]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("all");
    setSelectedRating(0);
    setFilters({
      isNew: false,
      isBestSeller: false,
      hasDiscount: false,
      inStock: false,
    });
    setSortOption("default");
    setSearchParams({});
  };

  return (
    <div className="space-y-8 animate-slide-in text-left">
      {/* Search Header Banner */}
      <div className="bg-bakery-bg/30 border border-bakery-beige/30 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-bakery-primary/10 text-bakery-primary rounded-lg text-[10px] font-black uppercase tracking-wider">
            Aura Patisserie Shop
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-bakery-dark">
            {searchWord ? `Kết quả tìm kiếm: "${searchWord}"` : "Danh mục bánh Aura"}
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Thưởng thức hương vị bánh nướng cao cấp, bánh mì Pháp giòn ngon chuẩn vị.
          </p>
        </div>

        {/* Results counter & Sorterm */}
        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-xs font-bold text-gray-400 uppercase">Sắp xếp:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2.5 bg-white border border-bakery-beige text-bakery-dark rounded-xl text-xs font-extrabold focus:outline-none focus:border-bakery-primary cursor-pointer shadow-sm"
          >
            <option value="default">Mặc định của Aura</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="rating">Được đánh giá cao nhất</option>
            <option value="sold">Mua nhiều nhất (Bán chạy)</option>
          </select>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Toggle Button for mobile filters */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden w-full py-3 bg-bakery-primary text-white rounded-2xl font-black text-sm flex items-center justify-center space-x-2 shadow-md active:scale-95"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{isMobileFilterOpen ? "Đóng bộ lọc" : "Mở bộ lọc nâng cao"}</span>
        </button>

        {/* Left Column: Filter Sidebar */}
        <div className={`${isMobileFilterOpen ? "block" : "hidden"} lg:block lg:col-span-1`}>
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            filters={filters}
            setFilters={setFilters}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Column: Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            // Premium Loading Skeleton Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-bakery-beige/30 rounded-3xl overflow-hidden p-5 space-y-4 animate-pulse"
                >
                  <div className="bg-gray-100 aspect-square rounded-2xl w-full" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-4.5 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div className="h-5 bg-gray-100 rounded w-1/3" />
                    <div className="h-10 bg-gray-100 rounded-xl w-10" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            // No results alert block
            <div className="bg-white border border-bakery-beige/50 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-sm">
              <div className="p-4 bg-amber-50 rounded-full text-amber-500">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-black text-bakery-dark">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto leading-relaxed">
                  Rất tiếc Aura không có món bánh khớp với bộ lọc của bạn. Hãy thử đổi từ khóa tìm kiếm hoặc làm mới bộ lọc nhé!
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-bakery-primary hover:bg-bakery-dark text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            // Active Product Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="animate-slide-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
