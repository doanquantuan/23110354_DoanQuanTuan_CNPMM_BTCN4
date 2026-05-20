const Product = require("../models/product");
const Review = require("../models/review");
const OrderItem = require("../models/orderItem");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Review, as: "reviews" },
        { model: OrderItem, as: "orderItems" },
      ],
    });

    const formattedProducts = products.map((p) => {
      const plainProduct = p.get({ plain: true });

      // 1. Calculate average rating from reviews
      const reviewsList = plainProduct.reviews || [];
      const ratingSum = reviewsList.reduce((sum, r) => sum + r.rating, 0);
      const rating = reviewsList.length > 0
        ? parseFloat((ratingSum / reviewsList.length).toFixed(1))
        : 5.0;

      // 2. Calculate soldCount from orderItems
      const orderItemsList = plainProduct.orderItems || [];
      const soldCount = orderItemsList.reduce((sum, item) => sum + item.quantity, 0);

      // 3. Calculate isNew (within last 30 days)
      const createdAtDate = new Date(plainProduct.createdAt);
      const diffDays = (new Date() - createdAtDate) / (1000 * 60 * 60 * 24);
      const isNew = diffDays <= 30;

      // 4. Calculate isBestSeller (soldCount >= 100)
      const isBestSeller = soldCount >= 100;

      // 5. Calculate originalPrice dynamically
      const discountPercentage = plainProduct.discountPercentage || 0;
      const originalPrice = discountPercentage > 0
        ? Math.round(plainProduct.price / (1 - discountPercentage / 100))
        : null;

      // Strip relations to match the original clean JSON schema
      delete plainProduct.reviews;
      delete plainProduct.orderItems;

      return {
        ...plainProduct,
        originalPrice,
        rating,
        soldCount,
        isNew,
        isBestSeller,
      };
    });

    return res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(">>> Error in getProducts:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server khi lấy danh sách sản phẩm",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        { model: Review, as: "reviews" },
        { model: OrderItem, as: "orderItems" },
      ],
    });

    if (!product) {
      return res.status(444).json({
        EC: 1,
        EM: "Không tìm thấy sản phẩm",
      });
    }

    const plainProduct = product.get({ plain: true });

    // 1. Calculate average rating
    const reviewsList = plainProduct.reviews || [];
    const ratingSum = reviewsList.reduce((sum, r) => sum + r.rating, 0);
    const rating = reviewsList.length > 0
      ? parseFloat((ratingSum / reviewsList.length).toFixed(1))
      : 5.0;

    // 2. Calculate soldCount
    const orderItemsList = plainProduct.orderItems || [];
    const soldCount = orderItemsList.reduce((sum, item) => sum + item.quantity, 0);

    // 3. Calculate isNew (within last 30 days)
    const createdAtDate = new Date(plainProduct.createdAt);
    const diffDays = (new Date() - createdAtDate) / (1000 * 60 * 60 * 24);
    const isNew = diffDays <= 30;

    // 4. Calculate isBestSeller (soldCount >= 100)
    const isBestSeller = soldCount >= 100;

    // 5. Calculate originalPrice dynamically
    const discountPercentage = plainProduct.discountPercentage || 0;
    const originalPrice = discountPercentage > 0
      ? Math.round(plainProduct.price / (1 - discountPercentage / 100))
      : null;

    // Strip relations to match the original clean JSON schema
    delete plainProduct.reviews;
    delete plainProduct.orderItems;

    const formattedProduct = {
      ...plainProduct,
      originalPrice,
      rating,
      soldCount,
      isNew,
      isBestSeller,
    };

    return res.status(200).json(formattedProduct);
  } catch (error) {
    console.error(">>> Error in getProductById:", error);
    return res.status(500).json({
      EC: -1,
      EM: "Lỗi từ server khi lấy chi tiết sản phẩm",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
