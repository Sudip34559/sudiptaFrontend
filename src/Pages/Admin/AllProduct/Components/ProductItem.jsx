import React from "react";
import { ArrowRight } from "lucide-react";
import { X } from "lucide-react";
import { Link, useNavigate, redirect } from "react-router-dom";

const ProductItem = ({ item, deeleteToItem, setOpen }) => {
  const navigate = useNavigate();
  // console.log(item.image)
  return (
    <>
      <tr key={item._id}>
        <td className="whitespace-nowrap px-4 py-4 flex items-center">
          {/* <div className=""> */}
          {/* <div className="h-10 w-10 flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={person.image}
            alt=""
          />
        </div> */}
          <div>
            <div className="text-sm font-medium text-gray-900">
              {item.title}
            </div>
          </div>
          {/* </div> */}
        </td>

        <td className="whitespace-nowrap px-0 py-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={`http://localhost:8000${item.image}`}
            alt=""
          />
        </td>
        <td className="whitespace-nowrap px-0 py-4">
          <div className="text-sm font-medium text-gray-900">{item.price}</div>
        </td>
        <td className="whitespace-nowrap px-0 py-4">
          <div className="text-sm font-medium text-gray-900">{item.stock}</div>
        </td>
        <td className="whitespace-nowrap px-0 py-4">
          <div className="text-sm font-medium text-gray-900">
            {item.description}
          </div>
        </td>
        <td className="whitespace-nowrap px-0 py-4">
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            Active
          </span>
        </td>
        <td className="whitespace-nowrap px-0 py-4 flex justify-center">
          <button
            onClick={() => {
              navigate(`/productEdit`, { state: item });
            }}
            className="rounded-md
     bg-green-500 px-3 py-2 text-sm font-semibold
     
      text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(true);
              deeleteToItem(item._id);
            }}
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
    </>
  );
};

export default ProductItem;
