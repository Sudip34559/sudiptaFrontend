import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Reducer/Auth";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Api";
import { addToCart } from "../../Reducer/cart";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Admindashboard",
    href: "/admin",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Product",
    href: "/product",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const c = JSON.parse(localStorage.getItem("cart"));
  let cartValue = c ? c.length : 0;
  const { cart } = useSelector((store) => store.cart);

  const [cartNumber, setCartNumber] = React.useState(cartValue);
  // console.log("c", cartValue);
  useEffect(() => {
    // console.log("dd", cart);
    if (cart.length) {
      setCartNumber(cart.length);
    }
  }, [cart]);

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      if (data.data.statusCode == 200) {
        dispatch(logout());
        localStorage.removeItem("userdata");
        navigate("/login");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed w-full bg-white border-b-[1px] border-b-neutral-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span></span>
          <span className="font-bold">DevUI</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                {/* <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a> */}
                <NavLink
                  to={item.href}
                  className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/cart" className="relative z-0 text-2xl">
                🛒
                <span className="w-[15px] h-[15px] rounded-full bg-black/50 text-white text-sm flex justify-center items-center absolute top-0 left-1 z-10">
                  {cartNumber}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <button
            onClick={handleLogout}
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Logout
          </button>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span></span>
                    <span className="font-bold">DevUI</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                    <a
                      href="/cart"
                      className=" flex items-center pl-3  w-[30px] h-[30px] relative z-0 text-2xl "
                    >
                      🛒
                      <span className="w-[15px] h-[15px] rounded-full bg-black/50 text-white text-sm flex justify-center items-center absolute top-0 left-[14px] z-10">
                        {cartNumber}
                      </span>
                    </a>
                  </nav>
                </div>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm
                   font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline 
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
