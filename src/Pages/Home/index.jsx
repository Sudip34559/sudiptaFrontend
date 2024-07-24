import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import useFetchAllProducts from "../../hook/product";
import CircleLoder from "../../Components/Loder/CircleLoder";
import ProductCard from "./ProductCard";

const Home = () => {
  useFetchAllProducts();
  const { products, loding, error } = useSelector((store) => store.product);
  // console.log(products);
  return (
    <Layout>
      {loding && <CircleLoder />}
      <section className="flex min-h-screen  bg-slate-900 p-6">
        <div className="container   mx-auto space-y-6 pt-[55px]">
          <ul className="flex snap-x snap-mandatory  gap-x-6 overflow-x-auto pb-6">
            {products &&
              products.map((product) => (
                <li key={product._id} className="flex-shrink-0 snap-center">
                  <ProductCard product={product} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
