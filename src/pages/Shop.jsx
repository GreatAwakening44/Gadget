import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "../components/shop/Productgrid";
import products from "../components/shop/Product";

const PRICE_RANGES = {
  "under-300k":  (p) => p.price < 300000,
  "300k-600k":   (p) => p.price >= 300000 && p.price <= 600000,
  "600k-1m":     (p) => p.price > 600000 && p.price <= 1000000,
  "above-1m":    (p) => p.price > 1000000,
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const filtered = (() => {
    if (!filter) return products;

    // Product type filter (from MoCategories)
    if (filter === "Laptop" || filter === "iPhone")
    return products.filter((p) => p.product === filter);

    // Price range filter
    if (PRICE_RANGES[filter]) return products.filter(PRICE_RANGES[filter]);

    // Storage filter
    if (["128GB", "256GB", "512GB", "1TB"].includes(filter))
      return products.filter((p) => p.storage === filter);

    // Everything else: match against name, byUse, or id
    const f = filter.toLowerCase();
    return products.filter(
      (p) =>
        p.id.toLowerCase().includes(f) ||
        p.name.toLowerCase().replace(/\s+/g, "-").includes(f) ||
        (p.byUse && p.byUse.toLowerCase() === f)
    );
  })();

  return (
    <section className="px-6 md:px-10 lg:px-16 pt-4 pb-20">
      {filter && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 capitalize">
            {filter.replace(/-/g, " ")}
          </h2>
          <a href="/" className="text-base text-semibold text-[#6B0000] hover:scale-95">
            Clear filter
          </a>
        </div>
      )}
      <ProductGrid products={filtered} />
    </section>
  );
};

export default Shop;