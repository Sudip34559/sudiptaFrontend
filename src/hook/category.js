import { useEffect, useState } from "react";
import { allcategory } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../Reducer/category";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // Create an instance of AbortController
    const signal = controller.signal;
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await allcategory({ signal });
        if (isMounted) {
          dispatch(
            getAllCategory({
              data: response.data.data,
              error: "",
              loding: false,
            })
          );
        }
        setCategories(response.data.data); // Set categories state with response data
        isMounted && setLoading(false); // Set loading state to false
      } catch (error) {
        setError(error); // Set error state if request fails
        setLoading(false); // Set loading state to false
      }
    };

    fetchData();

    return () => {
      // Cleanup function (optional)
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { categories, loading, error };
};

export default useFetchCategories;
