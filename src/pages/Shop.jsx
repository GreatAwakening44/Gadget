import React from "react";
import ProductGrid from "../components/shop/Productgrid";
import products from "../components/shop/Product";

const Shop = () => {
  return (
    <>
      <section className="px-6 md:px-10 lg:px-16 pt-4 pb-20">
        <ProductGrid products={products} />
      </section>
    </>
  );
};

export default Shop;