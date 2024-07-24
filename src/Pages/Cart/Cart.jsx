import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CC from "./Card";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState();
  const navigete = useNavigate();
  const removeFromCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      const productIndex = cart.findIndex((p) => p._id === product._id);
      cart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const c = JSON.parse(localStorage.getItem("cart"));
    setCarts(c);
    setChange(Math.random());
  };
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("ss", cart);
  const deletCart = () => {
    localStorage.removeItem("cart");
    setCarts();
    setTotalPrice(0);
  };
  useEffect(() => {
    const total =
      cart.length &&
      cart
        .map((p) => p.price * p.quantity)
        .reduce((acc, curr) => acc + curr, 0);
    // console.log(totalPrice);
    setTotalPrice(total);
  }, [change]);
  return (
    <section
      className={`  relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 Name
     ${!cart.length > 0 && "w-full h-screen flex justify-center items-center"}
    `}
    >
      {cart.length > 0 && (
        <div className=" min-w-[775px] w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cart.length} items
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {cart.length > 0 &&
                cart.map((item) => (
                  <div key={item._id} className="min-w-[775px]">
                    <CC
                      product={item}
                      remove={removeFromCart}
                      change={setChange}
                    />
                  </div>
                ))}
            </div>
            <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary
              </h2>
              <div className="mt-8">
                <form>
                  <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black">
                      {cart.length} Items
                    </p>
                    <p className="font-semibold text-xl leading-8 text-indigo-600">
                      ₹{totalPrice}
                    </p>
                  </div>
                  <button className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
                    Order Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {!cart.length > 0 && (
        <div className="grid gap-4 w-60">
          <img
            src="src/images/Screenshot_2024-06-22_at_17.20.48-removebg-preview.png"
            alt=""
          />
          <div>
            <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
              There’s no cart product here
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  navigete("/");
                }}
                className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 rounded-full text-white text-xs font-semibold leading-4"
              >
                {" "}
                add product now{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
