import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../../Images/CartIcon";
import LogoIcone from "../../Images/LogoIcone";
import SearchIcon from "../../Images/SearchIcon";
import { searchcartdataslice } from "../../ReduxToolkit/CartSlice";
import { userdataslice } from "../../ReduxToolkit/UserSlice";

const Header = () => {
  const CartData = useSelector((state) => state.cartslicedata.CartDataSlice);
  const UserInfo = useSelector((state) => state.userslicedata.userdata);
  
  let dispatch = new useDispatch();
  const [ProductData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let cartCount = 0;
  if (CartData?.length > 0) {
    CartData.forEach((element) => {
      cartCount = cartCount + element?.qty;
    });
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProductData(data.products);
    dispatch(searchcartdataslice(data.products));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const results = ProductData?.filter((item) => {
        let tempTitle = item.title.toLowerCase();
        if (tempTitle.includes(searchTerm.toLowerCase())) {
          return item;
        }
      });
      dispatch(searchcartdataslice(results));
    }, 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const removeToken = () => {
    dispatch(userdataslice(""));
    localStorage.removeItem("Token");
    window.location.reload();
  };

  return (
    <div class="header d-flex justify-content-between px-3 align-items-center">
      <div
        className="    d-flex
    justify-content-center
    align-items-center"
      >
        <Link to="/" class="header__avatar">
          <span
            style={{ color: "#6a9739" }}
            className="d-flex justify-content-between px-3 align-items-center"
          >
            <LogoIcone />
            E-Cart
            {/* <span>Developed by Prakash</span> */}
          </span>
        </Link>
        <div class="wrapper me-3">
          {window.location.href.includes("dashboard") && (
            <div class="search-input">
              <input
                value={searchTerm}
                onChange={handleChange}
                type="text"
                placeholder="Search for Products, Brands and more"
              />
              <div class="icon">
                <SearchIcon />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-one d-flex  px-2 align-items-center">
        <p className="mb-0 me-3">
          Welcome,
          <p className="mb-0">
            <b> {UserInfo?.firstName ? UserInfo?.firstName : "Guest"}</b>
          </p>
        </p>
        <p className="mb-0 me-3 cart-icon ">
          <CartIcon onClick={(e) => navigate("/viewcart")} />
          {cartCount !== 0 && (
            <span className="cart-lenght cursor-pointer">{cartCount}</span>
          )}
        </p>
        <img className="profile" src="https://picsum.photos/200" alt="" />
        <DropdownButton
          className="ms-2 profile-dopdown"
          id="dropdown-basic-button"
        >
          {UserInfo !== "" && UserInfo !== null && UserInfo !== undefined ? (
            <Dropdown.Item onClick={removeToken}>Sign Out</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={(e) => navigate("/checkout")}>
              Sign In
            </Dropdown.Item>
          )}
        </DropdownButton>
      </div>
    </div>
  );
};

export default Header;
