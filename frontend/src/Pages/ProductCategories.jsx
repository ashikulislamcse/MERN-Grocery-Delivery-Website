import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategories = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const SearchCategories = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const FilteredProduct = products.filter(
    (product) => product.category.toLowerCase() === category
  );
  return (
    <div className="mt-10">
      {SearchCategories && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {SearchCategories.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-amber-400 rounded-full"></div>
        </div>
      )}
      {FilteredProduct.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-6 gap-6 md:gap-6">
          {FilteredProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium">No products found in this Category</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
