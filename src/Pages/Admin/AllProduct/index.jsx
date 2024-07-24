import React from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";

import SkeletonLoder from "../../../Components/Loder/SeletonLoder.jsx";
import { Link } from "react-router-dom";
import useFetchAllProducts from "../../../hook/product.js";
import ProductItem from "./Components/ProductItem.jsx";
import ConfirmDialog from "../../../Components/Dialog/ConfirmDialog.jsx";
import { deleteProduct } from "../../../Api/index.js";

import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../Reducer/Products/index.js";
import { errorMessage, successMessage } from "../../../Helper/index.js";

const AllProduct = () => {
  const [open, setOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const dispatch = useDispatch();
  useFetchAllProducts();
  const handleDelete = () => {
    // Implement your delete logic here
    setOpen(false); // Close the modal after deletion
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleOpen = (product) => {
    setOpen(true);
  };
  const { products, loding, error } = useSelector((state) => state.product);

  const deeleteToItem = (item) => {
    setProductToDelete(item);
  };

  const deleteItem = async () => {
    try {
      const response = await deleteProduct(productToDelete);

      dispatch(
        getAllProducts({
          payload: {
            data: response.data.data.product,
            error: "",
            loding: false,
            error: "",
          },
        })
      );
      setOpen(false);
      successMessage("Prduct deleted Successfully");
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };
  const aaa = "#278C7A";
  if (loding) return <SkeletonLoder />;
  if (error) return <p>Something went wrong</p>;
  return (
    <AdminLayout>
      <section className=" mx-auto w-full max-w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Product</h2>
            {/* <p className="mt-1 text-sm text-gray-700">
              This is a list of all Category. You can add new Category, edit or delete existing
              ones.
            </p> */}
          </div>
          <div>
            <Link to="/addProduct">
              <button
                type="button"
                className={`rounded-md bg-[#278C7A]
              px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#034C8C]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-black`}
              >
                Add new Product
              </button>
            </Link>
          </div>
        </div>

        {products.length > 0 ? (
          <>
            <div className="mt-6 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            <span>Name</span>
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Stock
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                          >
                            Action
                          </th>
                          <th
                            scope="col"
                            className="px-1 py-3.5 text-sm font-normal text-gray-700 text-center"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {products &&
                          products.length > 0 &&
                          products.map((item) => (
                            <ProductItem
                              key={item._id}
                              item={item}
                              deeleteToItem={deeleteToItem}
                              setOpen={setOpen}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center pt-6">
              <a
                href="#"
                className="mx-1 cursor-not-allowed text-sm font-semibold text-white"
              >
                <span className="hidden lg:block">&larr; Previous</span>
                <span className="block lg:hidden">&larr;</span>
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-800 px-3 py-1 text-gray-900 hover:scale-105"
              >
                1
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-800 px-3 py-1 text-gray-900 hover:scale-105"
              >
                2
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-800 px-3 py-1 text-gray-900 hover:scale-105"
              >
                3
              </a>
              <a
                href="#"
                className="mx-1 flex items-center rounded-md border border-gray-800 px-3 py-1 text-gray-900 hover:scale-105"
              >
                4
              </a>
              <a href="#" className="mx-2 text-sm font-semibold text-white">
                <span className="hidden lg:block">Next &rarr;</span>
                <span className="block lg:hidden">&rarr;</span>
              </a>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-white">No Data found</p>
          </div>
        )}
      </section>
      {open && <ConfirmDialog onDelete={deleteItem} onCancel={handleCancel} />}
    </AdminLayout>
  );
};
export default AllProduct;
