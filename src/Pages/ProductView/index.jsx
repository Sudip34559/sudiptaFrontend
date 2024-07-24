import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Product } from "../../../../backend/src/models/product";
import useFetchAllProducts from "../../hook/product";
import CircleLoder from "../../Components/Loder/CircleLoder";
import { errorMessage, successMessage } from "../../Helper";
import Layout from "../../Components/Layout";
import { addToCart } from "../../Reducer/cart";

function ProductView() {
  const dispatch = useDispatch();
  useFetchAllProducts();
  const { id } = useParams();
  const { products, loding, error } = useSelector((store) => store.product);
  // console.log(products, loding, error);
  const product = products.find((p) => p._id === id);
  // console.log(product);
  const saveInLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = products.findIndex((p) => p._id === id);
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
  if (loding) return <CircleLoder />;
  if (error) return <h1>{error}</h1>;
  return (
    <Layout>
      <div className="font-sans">
        <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
            <div className="w-full lg:sticky top-0 flex gap-2 h-full justify-center items-center">
              <img
                src={`http://localhost:8000${product.image}`}
                alt="Product"
                className="w-4/5 rounded-md object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">
                  ₹{product.price}
                </p>
                <p className="text-gray-400 text-xl">
                  <span className="text-sm ml-1.5">Tax included</span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg
                  className="w-5 fill-[#CED5D8]"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>

              <button
                onClick={() => {
                  saveInLocalStorage();
                }}
                type="button"
                className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
              >
                Add to cart
              </button>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">
                  About the item
                </h3>
                <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                  <li>{product.description}</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">5.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-2/3 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">4.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/3 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">3.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/6 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">2.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/12 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">1.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-[6%] h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductView;
