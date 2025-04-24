import React from "react";
import axios from "axios";
import "../../styles/user/headerPage.css";
import image from "../../assets/images/logo.png";
import profileImage from "../../assets/images/homePageImage/profile.png";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
// import { FiChevronDown } from "react-icons/fi";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import products from "../../pages/user/productList";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setSearchProductDetails } from "../../features/slice/searchProductSlice";
import { setSearchValue } from "../../features/slice/searchSlice";
import { useSlider } from "../../pages/user/home";
import { setToken } from "../../features/slice/tokenSlice";
import { setWishlist } from "../../features/slice/wishListSlice";
import { setProfilePicture } from "../../features/slice/profileSlice";
const HeaderPage = () => {
  const { isSidebarOpen, setSidebarOpen, userCartItem, setUserCartItem, productDetails, setProductDetails, wishlistCount } = useSlider();
  const [isFixed, setIsFixed] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [totalCardPrice, setTotalCardPrice] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const token = useSelector((state) => state.tokenDetails.token);
  const search = useSelector((state) => state.searchVal.search);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [LogOut, setLogOut] = useState(false);

  const nav = useNavigate();
  const url = "http://localhost:8000";
  const [searchVal, setSearchVal] = useState(search);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      setLogOut(false);
      fetchUserCartDetails();
    } else {
      setLogOut(true);
    }
  }, [token]);
  const fetchProduct = async () => {
    await axios
      .get(`http://localhost:8000/get-searchProductDetails/?q=${searchVal}`)
      .then((res) => {
        dispatch(setSearchProductDetails(res.data.data));
      })
      .catch((err) => console.log(err));
  };

  let responseUserArray = [];

  useEffect(() => {
    fetchProduct();
    dispatch(setSearchValue(searchVal));
  }, [searchVal]);

  const [profilePic, setProfilePic] = useState(profileImage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileDataRes = await axios.get(`${url}/profileData/${token}`);
        // console.log(token);
        if (profileDataRes.status === 404) {
          return;
        }
        // console.log(profileDataRes.data.profilePicture);
        if (profileDataRes.data.profilePicture) {
          setProfilePic(`${url}/uploads/profilePicture/${profileDataRes.data.profilePicture}`);
          // console.log(profileDataRes.data.profilePicture + "hi");
        } else {
          setProfilePic(profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  const [wishlistData, setWishlistData] = useState([]);
  const fetchWishList = async () => {
    await axios.get(`http://localhost:8000/wishlist/${token}`).then((res) => {
      setWishlistData(res.data.productID);
    });
  };
  useEffect(() => {
    if (token) {
      fetchWishList();
      fetchUserCartDetails();
    }
  }, [token]);

  useEffect(() => {
    if (wishlistData) {
      dispatch(setWishlist(wishlistData));
    }
  }, [wishlistData]);

  // useEffect(() => {
  //   console.log("wishlist", wishlist);
  // }, [wishlist]);

  const fetchUserCartDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/get-userCartDetails/${token}`);
      if (response.data.AddtoCardItems) {
        setUserCartItem(response.data.AddtoCardItems);
      }
      // console.log(userCartItem);
    } catch (error) {
      console.log("Error fetching user cart details:", error);
    }
  };

  useEffect(() => {
    // console.log(userCartItem);
    if (userCartItem.length == 0) {
      setTotalCardPrice(0);
      setTotalCartItem(0);
    }
    userCartItem.map((items) => {
      const productID = items.productID;
      // console.log(items);
      axios
        .get(`http://localhost:8000/get-userDetails/${productID}`)
        .then((response) => {
          // console.log(response.data.data);
          const productResponse = response.data.data;
          const userItem = {
            productdetail: productResponse,
            quantity: items.quantity,
          };
          responseUserArray.push(userItem);
          // console.log(responseUserArray);
          let totalPrice = 0;
          let count = 0;

          responseUserArray.forEach((product) => {
            totalPrice += product.productdetail.newPrice * product.quantity;
            count = count + 1;
          });
          // console.log("Price" + totalPrice);
          setTotalCardPrice(totalPrice);
          // console.log("product count " + count);
          setTotalCartItem(count);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    });

    setProductDetails(responseUserArray);
  }, [userCartItem]);

  const naviagteWhislist = () => {
    navigate("/wishlist");
  };

  const navigateCheckout = () => {
    navigate("/checkout");
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;
      setIsFixed(currentScrollY > scrollThreshold || currentScrollY < prevScrollY);
      if (currentScrollY === 0) {
        setIsFixed(false);
      }
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = (id) => {
    try {
      axios.put(`http://localhost:8000/IncrementAddToCartProductQuantity/${id}/${token}`).then((res) => {
        console.log(res.data);
        setUserCartItem(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrement = (id) => {
    try {
      axios.put(`http://localhost:8000/DecrementAddToCartProductQuantity/${id}/${token}`).then((res) => {
        console.log(res.data);
        setUserCartItem(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteCartProduct = (product) => {
    console.log(product.productdetail._id);
    const id = product.productdetail._id;
    try {
      axios.delete(`http://localhost:8000/DeleteProductFromCart/${id}/${token}`).then((res) => {
        console.log(res.data);
        setUserCartItem(res.data);
        userCartItem.map((prod) => {
          // setBacktoCart(false);
          //   if (prod.productID == product.productdetail._id) {
          //     console.log("working" + prod.productID);
          //     setBacktoCart(false);
          //   }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCardSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const logout = () => {
    Cookies.remove("LoginToken");
    dispatch(setToken(""));
    // dispatch(setProfilePicture(profileImage));
    setProfilePic(profileImage);
    window.location.reload();
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/get-productDetails`)
  //     .then((response) => {
  //       setProductDetails(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product data:", error);
  //     });
  // }, [setProductDetails]);
  return (
    <>
      {/* {console.log(productDetails)} */}
      <div className="header-container">
        <div className="header-top">
          <p>Welcome to Ecomart in Your Dream Online Store!</p>
          <div className="right-span">
            <Link to="/offers">
              <span className="need-help">Offers</span>
            </Link>

            <Link to="/faq">
              <span className="need-help">Need Help</span>
            </Link>

            <Link to="/us">
              <span className="contact-us">Contact Us</span>
            </Link>
          </div>
        </div>
        <div
          className={`header-card-top ${isFixed ? "fixed" : ""}`}
          ref={cardRef}
          // style={{ zIndex: 3 }}
        >
          <div className="alignItem">
            <Link to="/">
              <div className="alignMyAccount">
                <img src={profilePic} alt=""></img>
              </div>
            </Link>
            <div className="alignlogo" onClick={() => navigate("/")}>
              <img src={image} alt="Greeny" />
            </div>
            <div className="alignSearch-icon">
              <IoIosSearch className="align-search" />
            </div>
          </div>
          <div className="logo">
            <img src={image} alt="" className="logo" onClick={() => navigate("/")} />
          </div>
          {LogOut ? (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="myAccount">
                <img src={profilePic} alt="" className="profile-logo" />
                <p className="join">Join</p>
              </div>
            </Link>
          ) : (
            <Link onClick={logout} style={{ textDecoration: "none" }}>
              <div className="myAccount">
                <img src={profilePic} alt="" className="profile-logo" />
                <p className="join">LogOut</p>
              </div>
            </Link>
          )}
          <div className="search-container">
            <input type="text" className="search-bar" value={searchVal} placeholder="Search..." onChange={(e) => setSearchVal(e.target.value)} />

            <span className="search-icon" onClick={() => nav("/shop")}>
              <IoIosSearch />
            </span>
          </div>
          <div className="card-container">
            <div className="cart-icon" onClick={naviagteWhislist}>
              <FontAwesomeIcon icon={faHeart} className="heart-icon" />
            </div>
            <div className="pop-up-item">
              <p>{wishlist ? wishlist.length : 0}</p>
            </div>
          </div>
          <div className="card-container">
            <div className="cart-icon" onClick={toggleCardSidebar}>
              <FontAwesomeIcon icon={faShoppingBag} className="card-svg" />
            </div>
            <div className="pop-up-item">
              <p>{totalCartItem}</p>
            </div>
          </div>
          <div className="price">
            <p>TOTAL PRICE</p>
            <h6>₹{totalCardPrice}</h6>
          </div>
        </div>

        <div className={`offcanvas offcanvas-end ${isSidebarOpen ? "show" : ""}`} tabIndex="-1" id="shoppingCartOffcanvas" aria-labelledby="shoppingCartOffcanvasLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="shoppingCartOffcanvasLabel">
              <FontAwesomeIcon icon={faShoppingBag} className="card-svg" /> Total Item ({totalCartItem})
            </h5>
            <button type="button" className="btn-close text-reset" onClick={toggleCardSidebar}></button>
          </div>
          <div className="offcanvas-body">
            <div className="offcanvas-grid">
              {productDetails
                .filter((product) => product.productdetail)
                .map((product, index) => (
                  <div className="offcanvas-card">
                    <div className="offcanvas-img">
                      <img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="product" className="offcanvas-prod-img" />
                      <div className="overlay" onClick={() => DeleteCartProduct(product)} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                      </div>
                    </div>
                    <div className="offcanvas-content">
                      <h6>{product.productdetail.productName}</h6>
                      <p>Unit Price ₹{product.productdetail.newPrice}</p>
                      <div className="card-item-selector">
                        <button className="selector-button" onClick={() => handleDecrement(product.productdetail._id)}>
                          -
                        </button>
                        <span className="selector-value">{product.quantity}</span>
                        <button className="selector-button" onClick={() => handleIncrement(product.productdetail._id)}>
                          +
                        </button>
                        <p>₹{product.productdetail.newPrice * product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="card">
            <span>Do you have a coupon code?</span>
            <div className="offcanvas-border" onClick={navigateCheckout} style={{ cursor: "pointer" }}>
              <p>Proceed To Checkout</p>
              <p className="hrLine"></p>
              <p>₹ {totalCardPrice}</p>
            </div>
          </div>
        </div>

        {/* Optional: Overlay for background dimming */}
        {isSidebarOpen && <div className="offcanvas-backdrop show" onClick={toggleCardSidebar}></div>}
        <div className="header-card-bottom">
          <div className="list-item">
            <ul>
              <li>
                <Link to="/">
                  Home
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  Shop
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/myWallet">
                  Wallet
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/myProfile">
                  Profile
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/offers">
                  Offers
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/comingSoon">
                  Coming Soon
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About Us
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
              <li>
                <Link onClick={logout}>
                  LogOut
                  {/* <FiChevronDown /> */}
                </Link>
              </li>
            </ul>
          </div>
          <div className="contact-details">
            <div className="header-contact-item">
              <FaPhone className="header-icon" />
              <div className="phone">
                <p>Call Us</p>
                <span>(+880) 183 828 8389</span>
              </div>
            </div>
            <div className="header-contact-item">
              <FaEnvelope className="header-icon" />
              <div className="email">
                <p>Email Us</p>
                <span>support@example.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-card">
          <div className="icon-container">
            <FaHome onClick={() => navigate("/")} />
            <span>Home</span>
          </div>
          <div className="icon-container">
            <BiSolidCategory />
            <span>Category</span>
          </div>
          <div className="icon-container wishlist">
            <FontAwesomeIcon icon={faHeart} className="heart-icon" onClick={naviagteWhislist} />
            <span>Wishlist</span>
            <div className="pop-up-cart">
              <p>{wishlistCount}</p>
            </div>
          </div>
          <div className="icon-container cart">
            <FontAwesomeIcon icon={faShoppingBag} onClick={toggleCardSidebar} />
            <span>Cart</span>
            <div className="pop-up-cart">
              <p>{totalCartItem}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
