import React from "react";
import { motion } from "framer-motion";
import StarRating from "./Starrating";
import { useCart } from "./Cartcontext";

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const ProductCard = ({ product, index = 0 }) => {
  const { addItem } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden
                 hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col"
    >
      <div className="w-full h-36 md:h-48 sm:aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-slate-900">
            {formatNaira(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
        </div>

        {product.freeDelivery && (
          <p className="text-xs font-medium text-indigo-600">
            Free delivery within PH
          </p>
        )}

        <StarRating rating={product.rating} />

        <button
          onClick={() => addItem(product)}
          disabled={outOfStock}
          className={`mt-3 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200
            ${
              outOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-indigo-600 cursor-pointer"
            }`}
        >
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;