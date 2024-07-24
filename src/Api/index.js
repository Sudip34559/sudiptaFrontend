import axios from "axios";
import { baseUrl } from "../Config";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    // 'Accept': 'application/json',
  },
  withCredentials: true,
});
export const register = (data) => {
  return api.post("/auth/register", data);
};
export const loginApi = (data) => {
  return api.post("/auth/login", data);
};
export const logoutUser = (data) => {
  return api.post("/auth/logout");
};
export const forgetPasswored = (d) => {
  const data = {
    email: d,
  };
  return api.post("/auth/forgot-password", data);
};
export const resetPassword = (id, d) => {
  const data = {
    password: d,
  };
  return api.post(`/auth/reset-password/${id}`, data);
};
/// category
export const allcategory = () => {
  return api.get("/category/allCategory");
};
export const addCategory = (data) => {
  return api.post("/category/createCategory", data);
};
export const addProduct = (data) => {
  return api.post("/product/save", data);
};
export const allProduct = (data) => {
  return api.get("/product/all", data);
};
export const deleteProduct = (data) => {
  return api.delete("/product/" + data);
};

export const editProduct = (id, data) => {
  return api.patch(`/product/edit/${id}`, data);
};

export const deleteCategory = (id) => {
  console.log();
  return api.delete(`/category/deleteCategory/${id}`);
};

export const editCategory = (id, data) => {
  return api.patch(`/category/editCategory/${id}`, data);
};

export const addToCart = (id) => {
  return api.get(`/cart/addToCart/${id}`);
};

export const removeFromCart = (id) => {
  return api.patch(`/cart/removeFromCart/${id}`);
};

export const updateUserCart = (id, data) => {
  const d = {
    quantity: data,
  };
  return api.patch(`/cart/updateUserCart/${id}`, d);
};

export const getUserCart = () => {
  return api.get(`/cart/getUserCart`);
};
export const createAdress = (data) => {
  return api.post("/address/create-adress", data);
};
export const getAddresses = () => {
  return api.get("/address/get-addresses");
};
export const deleteAddress = (id) => {
  return api.delete(`/address/delete-address/${id}`);
};
export const updateAddress = (id, data) => {
  return api.put(`/address/update-address/${id}`, data);
};

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${baseUrl}/auth/refresh`, { withCredentials: true });

        return axios(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);
export default api;
