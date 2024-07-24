import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Reducer/cart";

function Card({ product, remove, change }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.total || product.price);
  const [open, setOpen] = useState();
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      change(Math.random());
    }
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      change(Math.random());
    }
  };
  const changeQuantity = (product, quantity) => {
    // console.log(quantity);
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      const productIndex = cart.findIndex((p) => p._id === product._id);
      cart[productIndex].quantity = quantity;
      cart[productIndex].total = product.price * quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      setPrice(product.price * quantity);
    }
  };
  const c = JSON.parse(localStorage.getItem("cart"));
  dispatch(
    addToCart({
      data: c,
      total: price,
      loading: false,
      error: "",
    })
  );
  return (
    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group relative">
      <div className="w-full md:max-w-[126px]">
        <img
          src={`http://localhost:8000${product.image}`}
          alt="perfume bottle image"
          className="mx-auto w-[100px] h-[100px]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7 text-black">
              {product.title}
            </h6>
            <h6 className="font-normal text-base leading-7 text-gray-500">
              {product.description}
            </h6>
            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              ₹{product.price}
            </h6>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
          <div className="max-w-xs mx-auto">
            <div className="relative flex items-center max-w-[8rem]">
              <button
                className="bg-gray-100    hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11"
                onClick={() => {
                  decrementQuantity();
                  changeQuantity(
                    product,
                    quantity - 1 === 0 ? 1 : quantity - 1
                  );
                }}
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>

              <div className="px-4 border  bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm  block w-full py-2.5 ">
                {quantity}
              </div>
              <button
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 "
                onClick={() => {
                  incrementQuantity();
                  changeQuantity(
                    product,
                    quantity + 1 === 10 ? 10 : quantity + 1
                  );
                }}
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
            ₹{product.total}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          remove(product);
        }}
        className="w-[40px] h-[40px] flex justify-center items-center absolute top-2 right-[-10px] rounded-lg text-white"
      >
        <svg
          className="w-[20px] h-[25px] "
          fill="#ff0000"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
        </svg>
      </button>
    </div>
  );
}

export default Card;
