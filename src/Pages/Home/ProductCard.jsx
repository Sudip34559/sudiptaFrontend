import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Reducer/cart";
import { errorMessage, successMessage } from "../../Helper/index";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveInLocalStorage = (product) => {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = products.findIndex((p) => p._id === product._id);
    if (productIndex !== -1) {
      errorMessage("Product already added to cart");
    } else {
      const updatedProducts = [
        ...products,
        {
          ...product,
          quantity: 1,
          total: product.price,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      dispatch(
        addToCart({
          data: updatedProducts,
          total: product.price,
          loading: false,
          error: "",
        })
      );
      successMessage("Product added to cart");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="flex justify-center items-center">
        <img
          className="p-2 rounded-t-lg w-[200px] h-[200px] "
          src={`http://localhost:8000${product.image}`}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 w-[300px]">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{product.price}
        </span>
        <div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </span>
          <a href="#">
            <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.description}
            </h5>
          </a>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => {
              navigate(`/product/${product._id}`);
            }}
            className="bg-white text-blue-700 hover:bg-blue-700 border-[1px] border-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black/50 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View product
          </button>
          <button
            onClick={() => {
              saveInLocalStorage(product);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
