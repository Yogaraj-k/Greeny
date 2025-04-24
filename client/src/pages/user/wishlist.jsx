import "../../styles/user/wishlist.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderPage from "../../components/user/HeaderPage";
import Footer from "./Footer";
import banner from "../../assets/images/banner/single-banner.jpg";
import products from "../../pages/user/productList";
import "../../styles/user/productCard.css";
import "../../styles/user/productDescriptionCard.css";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { faShoppingBag, faStar } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductDescriptionCard from "../../pages/user/productDescriptionCard";
import { useDispatch, useSelector } from "react-redux";
import { useSlider } from "../../pages/user/home";
import { setWishlist } from "../../features/slice/wishListSlice";
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [liked, setLiked] = useState(false);
  const url = `http://localhost:8000`;
  const toggleLike = () => {
    setLiked(!liked);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isSidebarOpen, setSidebarOpen, userCartItem, setUserCartItem } = useSlider();

  // useEffect(() => {
  //   let foundInCart = false;
  //   userCartItem.map((prod) => {
  //     console.log(wishProduct);
  //     console.log(userCartItem);
  //     if (prod.productID === productID) {
  //       foundInCart = true;
  //       console.log(prod.productID);
  //     }

  //   setBacktoCart(foundInCart);
  // }, [userCartItem]);

  const handleGoCartClick = () => {
    setSidebarOpen(true);
  };

  const handleAddToCard = (prod) => {
    console.log(prod);
    console.log(token);
    const productID = prod;
    if (token !== "") {
      axios
        .post("http://localhost:8000/post-AddToCardDetails", { productID, token })
        .then((response) => {
          console.log("Product added to cart:", response.data);
          setUserCartItem(response.data);
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    }
  };
  const handleClick = (product) => {
    const cartItemIds = new Set(userCartItem.map((item) => item.productID));
    const isInCart = cartItemIds.has(product);
    if (isInCart) {
      handleGoCartClick();
    } else {
      handleAddToCard(product);
    }
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  let delIndex = null;
  const [wishProduct, setwishProduct] = useState([]);
  const [wishlistData, setWishListData] = useState([]);

  const token = useSelector((state) => state.tokenDetails.token);
  const dispatch = useDispatch();

  // useEffect(() => {
  // 	axios
  // 		.get(`${url}/get-productDetails`)
  // 		.then((response) => {
  // 			setwishProduct(response.data.data);
  // 		})
  // 		.catch((error) => {
  // 			console.error("Error fetching product data:", error);
  // 		});
  // }, [setwishProduct]);

  const deleteWishList = async (id, index) => {
    await axios
      .delete(`http://localhost:8000/wishlist/${token}/${id}`)
      .then((res) => {
        setWishListData(res.data.productID);
        delIndex = index;
        // console.log(res.data.productID);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Delete");
  };

  const renderTable = () => {
    if (wishProduct) {
      return wishProduct.map((product, index) => {
        const cartItemIds = new Set(userCartItem.map((item) => item.productID));
        const isInCart = cartItemIds.has(product._id);

        return (
          <tr>
            <td>{index + 1}</td>
            <td>
              <img src={`http://localhost:8000/uploads/productImage/${product.image}`} alt="" />
            </td>
            <td>{product.productName}</td>
            <td>{product.newPrice}</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
            <td>In Stock</td>
            <td className="wishlist-card">
              <div
                className="wishlist-add-to-cart"
                onClick={() => {
                  handleClick(product._id);
                }}
              >
                {isInCart ? <span>Go To Cart</span> : <span>Add To Cart</span>}
              </div>
            </td>
            <td>
              <FontAwesomeIcon icon={faEye} className="wishlist-view" onClick={() => handleShowModal(product)} />
              <FontAwesomeIcon icon={faTrash} className="wishlist-delete" onClick={() => deleteWishList(product._id, index)} />
            </td>
          </tr>
        );
      });
    }
  };

  useEffect(() => {
    const fetchWishList = async () => {
      await axios.get(`${url}/wishlist/${token}`).then((res) => {
        setWishListData(res.data.productID);
      });
    };
    fetchWishList();
  }, []);

  useEffect(() => {
    dispatch(setWishlist(wishlistData));
    console.log(wishlist);
  }, [wishlistData]);

  const fetchProducts = async () => {
    const uniqueProductIds = Array.from(new Set(wishlistData));
    const uniqueProductDetails = [];
    for (const id of uniqueProductIds) {
      try {
        const response = await axios.get(`http://localhost:8000/get-userDetails/${id}`);
        uniqueProductDetails.push(response.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    setwishProduct(uniqueProductDetails);
  };

  useEffect(() => {
    fetchProducts();
  }, [wishlist]);

  useEffect(() => {
    renderTable();
  }, [wishProduct]);

  return (
    <div className="wishlist-container">
      <HeaderPage />
      <div className="offers-banner">
        <img src={banner} alt="Offer Banner" />
        <div className="offer-banner-content">
          <h1>WISHLIST</h1>
          <a href="/">Home</a>/<a href="...">Shop Grid</a>/<a href="...">Wishlist</a>
        </div>
      </div>
      {wishProduct && (
        <div className="wishlist-table-container">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Status</th>
                <th>Shopping </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
      )}
      <div className="showMoreButton">
        <button className="show-more-button">LOAD MORE ITEMS</button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Wishlist Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <ProductDescriptionCard
              product={{
                imgSrc: selectedProduct.image,
                imageSlider: selectedProduct.imageSlider,
                rating: selectedProduct.rating,
                productName: selectedProduct.productName,
                oldPrice: selectedProduct.oldPrice,
                newPrice: selectedProduct.newPrice,
                setSale: selectedProduct.sale,
                setNew: selectedProduct.newProduct,
                discountPercentage: selectedProduct.discountPercentage,
                productDetails: selectedProduct.productDescription,
                productID: selectedProduct._id,
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="green-background-button">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Wishlist;
