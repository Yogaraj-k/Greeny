// FeaturedItems.js
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEye } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import "../../styles/user/productCard.css";
import ProductDescriptionCard from "./productDescriptionCard";
import "../../styles/user/productDescriptionCard.css";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { faShoppingBag, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useSlider } from "../../pages/user/home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { setWishlist } from "../../features/slice/wishListSlice";
const FeaturedItems = ({ imgSrc, imageSlider, rating, productName, oldPrice, newPrice, setSale, setNew, discountPercentage, featuredItem, productDetails, product }) => {
	const [liked, setLiked] = useState(false);

	const token = useSelector((state) => state.tokenDetails.token);
	const { isSidebarOpen, setSidebarOpen, userCartItem, setUserCartItem } = useSlider();
	const [showModal, setShowModal] = useState(false);
	const [backToCart, setBacktoCart] = useState(false);
	useEffect(() => {
		let foundInCart = false;
		userCartItem.map((prod) => {
			if (prod.productID === product._id) {
				foundInCart = true;
				console.log(prod.productID);
			}
		});
		setBacktoCart(foundInCart);
	}, [userCartItem]);

	const handleAddToCard = (prod) => {
		console.log(prod);
		console.log(token);
		const productID = prod;
		axios
			.post("http://localhost:8000/post-AddToCardDetails", { productID, token })
			.then((response) => {
				console.log("Product added to cart:", response.data);
				setUserCartItem(response.data);
			})
			.catch((error) => {
				console.error("Error adding product to cart:", error);
			});
		// setSidebarOpen(true);
	};

	const handleGoCartClick = () => {
		setSidebarOpen(true);
	};
	const handleClick = (product) => {
		if (backToCart) {
			handleGoCartClick();
		} else {
			handleAddToCard(product);
		}
	};

	const url = `http://localhost:8000`;

	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const [wishListData, setwishListData] = useState(wishlist);

	const toggleLike = async () => {
		const wishListPostData = {
			token: token,
			productId: product._id,
		};
		await axios
			.post(`${url}/wishlist/`, wishListPostData)
			.then((res) => {
				setwishListData(res.data.productID);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (wishlist) {
			dispatch(setWishlist(wishListData));
		} else {
			dispatch(setWishlist(wishListData));
		}
	}, [wishListData]);

	const toggleDescription = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="featuredItem-card">
			<div className="featureItem-card-left">
				<div className={`featureLike ${wishlist.includes(product._id) ? "liked" : ""}`} onClick={toggleLike}>
					<AiFillHeart className="icon" />
				</div>
				<div className="label">
					<span className="feature-label">Feature</span>
				</div>

				<img src={`http://localhost:8000/uploads/productImage/${imgSrc}`} alt={productName} className="feature-img" />
				<div className="viewIcon" onClick={toggleDescription}>
					<FaEye />
				</div>
				<Modal show={showModal} onHide={closeModal} className="model-container" centered size="lg">
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body>
						<ProductDescriptionCard
							product={{
								imgSrc: imgSrc,
								imageSlider: imageSlider,
								rating: rating,
								productName: productName,
								oldPrice: oldPrice,
								newPrice: newPrice,
								setSale: setSale,
								setNew: setNew,
								discountPercentage: discountPercentage,
								productDetails: productDetails,
								productID: product._id,
							}}
							onClose={closeModal}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" className="green-background-button" onClick={closeModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div class="feature-line"></div>
			<div className="featureItem-card-right">
				<div className="feature-name">{productName}</div>
				<div className="feature-rating">
					{Array.from({ length: rating }, (_, index) => (
						<FontAwesomeIcon icon={faStar} className="star-icon" key={index} />
					))}
					<p>({rating})</p>
				</div>
				<div className="feature-price">
					<span className="oldPrice">₹{oldPrice}</span>
					<span className="newPrice">₹{newPrice}/piece</span>
				</div>
				<div className="feature-des">{productDetails}</div>
				<div className="add-to-cart-icon" onClick={() => handleClick(product._id)}>
					<FontAwesomeIcon icon={faShoppingBag} className="icon" />
					{backToCart ? <span>Go Cart</span> : <span>Add</span>}
				</div>
			</div>
		</div>
	);
};

FeaturedItems.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	imageSlider: PropTypes.arrayOf(PropTypes.string).isRequired,
	rating: PropTypes.number.isRequired,
	productName: PropTypes.string.isRequired,
	oldPrice: PropTypes.number.isRequired,
	newPrice: PropTypes.number.isRequired,
	setSale: PropTypes.bool.isRequired,
	setNew: PropTypes.bool.isRequired,
	discountPercentage: PropTypes.number.isRequired,
	featuredItem: PropTypes.bool.isRequired,
	productDetails: PropTypes.string.isRequired,
};

export default FeaturedItems;
