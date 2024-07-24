import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";
import { allcategory, deleteCategory, editCategory } from "../../../Api";
import useFetchCategories from "../../../hook/category";
import { SpinerLoder } from "../../../Components/Loder/index.jsx";
import SkeletonLoder from "../../../Components/Loder/SeletonLoder.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../Helper/index.js";
import { getAllCategory } from "../../../Reducer/category/index.js";
import ConfirmDialog from "../../../Components/Dialog/ConfirmDialog.jsx";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../../../backend/src/models/category";
import { set } from "mongoose";

const AllCetegory = () => {
  const [open, setOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetchCategories();
  const { category, loding, error } = useSelector((state) => state.category);
  const [fetchData, setFetchData] = useState(category);
  useEffect(() => {
    setFetchData(category);
  }, [category]);

  const handleSave = (id, data) => {
    if (newValue.length > 2) {
      editCategory(id, { title: data }).then((res) => {
        dispatch(
          getAllCategory({
            data: res.data.data,
            error: "",
            loding: false,
          })
        );
        setFetchData(res.data.data);
      });
      console.log(newValue.length);
      successMessage("Category updated successfully");
      setEditingItem(null);
      setNewValue("");
    }
    setErrorMsg("title must be at least 3 characters");
    console.log(errorMsg);
  };
  const handleCancel = () => {
    setOpen(false);
    setCategoryToDelete(null);
  };
  const deeletToCategory = (item) => {
    setCategoryToDelete(item);
  };
  const deleteToCategory = async () => {
    try {
      const data = await deleteCategory(categoryToDelete);
      dispatch(
        getAllCategory({
          data: data.data.data,
          loding: false,
          error: "",
        })
      );
      setFetchData(data.data.data);
      setOpen(false);
      setCategoryToDelete(null);
      navigate("/allCetegory");
      successMessage("category deleted successfully");
    } catch (error) {
      console.log(error);
      setOpen(false);
    }
  };

  if (loding) return <SkeletonLoder />;
  if (error) return <p>Something went wrong</p>;
  return (
    <AdminLayout>
      <section className=" mx-auto w-full max-w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Category</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all Category. You can add new Category, edit or
              delete existing ones.
            </p>
          </div>
          <div>
            <Link to="/addCetegory">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add new Category
              </button>
            </Link>
          </div>
        </div>

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
                        <span>Title</span>
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-1 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Action
                      </th>

                      {/* <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {fetchData &&
                      fetchData.map((item) => (
                        <tr key={item._id}>
                          <td className="whitespace-nowrap pl-4 h-[69px] max-w-[400px]  flex items-center">
                            {/* <div className=""> */}
                            {/* <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div> */}
                            <div>
                              {item._id === editingItem ? (
                                <>
                                  <input
                                    type="text"
                                    className="w-[180px] px-4 py-1 border border-green-400 rounded-lg shadow-sm focus:outline-none placeholder-lime-400"
                                    placeholder="Enter Title"
                                    name="title"
                                    value={newValue}
                                    onChange={(e) =>
                                      setNewValue(e.target.value)
                                    }
                                  />
                                  {errorMsg && (
                                    <p className="text-red-500 text-xs mt-[1px]">
                                      {errorMsg}
                                    </p>
                                  )}
                                </>
                              ) : (
                                <div className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </div>
                              )}
                            </div>
                            {/* </div> */}
                          </td>

                          <td className="whitespace-nowrap px-0 py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-0 py-4">
                            {item._id === editingItem ? (
                              <button
                                onClick={() => {
                                  handleSave(item._id, newValue);
                                }}
                                href="#"
                                className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingItem(item._id);
                                  setNewValue(item.title);
                                  setErrorMsg("");
                                }}
                                href="#"
                                className="rounded-md
                         bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                              >
                                Edit
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setOpen(true);
                                deeletToCategory(item._id);
                              }}
                              href="#"
                              className="rounded-md ml-5 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                              Delete
                            </button>
                          </td>

                          {/* <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-gray-700">
                            Edit
                          </a>
                        </td> */}
                        </tr>
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
      </section>
      {open && (
        <ConfirmDialog onDelete={deleteToCategory} onCancel={handleCancel} />
      )}
    </AdminLayout>
  );
};

export default AllCetegory;
