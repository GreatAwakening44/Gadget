import React from "react";
import ProductCard from "./Productcard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="mt-16 text-center text-gray-400 text-base">
        No products available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
};

export default ProductGrid;