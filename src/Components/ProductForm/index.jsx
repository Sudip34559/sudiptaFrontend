import React, { useState, useEffect } from "react";

import useFetchCategories from "../../hook/category";
import { useFormik } from "formik";
import { ProductValidation } from "../../SchemaValidation/ProductValidation";
import { errorMessage, successMessage } from "../../Helper";
import { addProduct } from "../../Api";
import CircleLoder from "../../Components/Loder/CircleLoder";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Admin/AdminLayout";
const imagsrc = "/src/images/thumbnail.png";

const ProductForm = ({ product }) => {
  const [thumnail, setThumnail] = React.useState("/src/images/thumbnail.png");
  const navigate = useNavigate();
  const { categories, error, loading } = useFetchCategories();
  const [lodding, setLodding] = useState(false);

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
    setStatus,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      price: "",
      stock: "",
      description: "",
      category: "",
      image: thumnail,
    },
    validationSchema: ProductValidation,
    onSubmit: (values) => {
      // console.log("first")
      sumitProduct(values, resetForm);
      console.log(values);
    },
  });
  const pickImage = (e) => {
    const file = e.target.files[0];

    if (file.size > 1024 * 1024) {
      errorMessage("File size must be less than 1MB");
      return;

      // setStatus('Invalid file address');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setThumnail(reader.result);
      setFieldValue("image", reader.result);
    };
  };
  const sumitProduct = async (value) => {
    try {
      setLodding(true);
      const response = await addProduct(value);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        setLodding(false);
        // resetForm()
        setThumnail("/src/images/thumbnail.png");
        // setStatus('success')
        successMessage(response.data.message);
        navigate("/allProduct");
      }
    } catch (error) {
      setLodding(false);
      errorMessage(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="relative">
        {lodding && <CircleLoder />}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Form Layout
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="/">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-primary">Form Layout</li>
                </ol>
              </nav>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="max-w-2xl flex bg-white m-auto flex-col rounded  p-2">
                <div className="flex flex-col max-w-full w-full items-center">
                  <h1>Add Product</h1>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <label
                    htmlFor="image"
                    className="text-base font-medium text-gray-900 mt-5"
                  >
                    {" "}
                    Image{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="hidden"
                      type="file"
                      onChange={pickImage}
                      id="image"
                    />

                    <img
                      src={thumnail}
                      width={150}
                      height={150}
                      className="border rounded"
                    />
                  </div>
                </div>
                {errors.image && touched.image && (
                  <p className="text-red-500">{errors.image}</p>
                )}
                {/* input  */}
                <div>
                  <label
                    htmlFor="title"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Product Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Product Title"
                      id="title"
                    />
                  </div>
                </div>
                {errors.title && touched.title && (
                  <p className="text-red-500">{errors.title}</p>
                )}
                {/* Price  */}
                <div className="mt-3">
                  <label
                    htmlFor="price"
                    className="text-base font-medium text-gray-900 mt-5"
                  >
                    {" "}
                    Product Price{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      value={values.price}
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Price"
                      id="price"
                    />
                  </div>
                </div>
                {errors.price && touched.price && (
                  <p className="text-red-500">{errors.price}</p>
                )}
                {/* Price  */}
                <div className="mt-3">
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900 mt-5"
                  >
                    {" "}
                    Product Stock{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      name="stock"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.stock}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Product Stock"
                      id="name"
                    />
                  </div>
                </div>
                {errors.stock && touched.stock && (
                  <p className="text-red-500">{errors.stock}</p>
                )}
                <div className="mt-3">
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900 mt-5"
                  >
                    {" "}
                    Product Description{" "}
                  </label>
                  <div className="mt-2">
                    <textarea
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="description"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Product Description"
                      id="name"
                      rows={5}
                    ></textarea>
                  </div>
                </div>
                {errors.description && touched.description && (
                  <p className="text-red-500">{errors.description}</p>
                )}

                {/* select  */}

                <div className="mb-4.5 mt-5">
                  <label className="mb-2.5 block text-black "> Category </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="category"
                      aria-label="Default select example"
                      required={true}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      className="relative z-20 w-full max-w-full appearance-none
                         rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                    >
                      <option
                        value=""
                        label="Select a Category"
                        className="text-body dark:text-bodydark"
                      >
                        Select a Category{" "}
                      </option>
                      {categories &&
                        categories.map((item, i) => (
                          <option
                            key={item._id}
                            value={item._id}
                            className="text-body dark:text-bodydark"
                          >
                            {item.title}
                          </option>
                        ))}
                    </select>
                    {errors.category && touched.category && (
                      <p className="text-red-500">{errors.category}</p>
                    )}
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Save Product{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
