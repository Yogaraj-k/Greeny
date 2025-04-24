import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from "react-router-dom";
import { faShoppingBag, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useSlider } from "../../pages/user/home";
import axios from "axios";
import { setWishlist } from "../../features/slice/wishListSlice";

const ProductDescriptionCard = ({ product, onClose }) => {
	const { imgSrc, imageSlider, rating, productName, oldPrice, newPrice, setNew, discountPercentage, productDetails, productID } = product;
	const [mainImage, setMainImage] = useState(imgSrc);
	const [slidesToShow, setSlidesToShow] = useState(4);
	const [backToCart, setBacktoCart] = useState(false);
	const token = useSelector((state) => state.tokenDetails.token);
	const { isSidebarOpen, setSidebarOpen, userCartItem, setUserCartItem } = useSlider();
	useEffect(() => {
		let foundInCart = false;
		userCartItem.map((prod) => {
			if (prod.productID === productID) {
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
		} else {
			console.log("user invalid");
		}
	};

	const url = `http://localhost:8000`;

	const dispatch = useDispatch();
	const wishlist = useSelector((state) => state.wishlist.wishlist);
	const [wishListData, setwishListData] = useState(wishlist);

	const toggleLike = async () => {
		const wishListPostData = {
			token: token,
			productId: productID,
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

	const handleGoCartClick = () => {
		if (onClose) {
			onClose();
		}
		setSidebarOpen(true);
	};
	const handleClick = (product) => {
		if (backToCart) {
			handleGoCartClick();
		} else {
			handleAddToCard(product);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 500) {
				setSlidesToShow(4);
			} else if (window.innerWidth < 1100) {
				setSlidesToShow(3);
			} else {
				setSlidesToShow(4);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const slickSliderRef = useRef(null);
	const handleThumbnailClick = (image) => {
		setMainImage(image);
		slickSliderRef.current.slickNext();
	};

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: slidesToShow,
		slidesToScroll: 1,
	};

	return (
		<div className="product-description-card">
			<div className="description-left">
				<div className="description-image">
					<img src={`http://localhost:8000/uploads/productImage/${mainImage}`} alt={productName} />
					<span className="discount-label">-{discountPercentage}%</span>
					<span className={`new-label-des ${setNew ? "visible" : "hidden"}`}>New</span>
				</div>
				<div className="description-thumbnails">
					<Slider {...sliderSettings} ref={slickSliderRef}>
						{[...imageSlider].map((image, index) => (
							<div key={index} onClick={() => handleThumbnailClick(image)}>
								<img src={`http://localhost:8000/uploads/productImage/${image}`} alt={"product"} />
							</div>
						))}
					</Slider>
				</div>
			</div>
			<div className="description-content">
				<div className="des-product-name">
					{productName}
					<p>
						SKU: 1234567 <span>BRAND: RADHUNI</span>
					</p>
				</div>
				<div className="des-product-rating">
					{Array.from({ length: rating }, (_, index) => (
						<FontAwesomeIcon icon={faStar} className="star-icon" key={index} />
					))}
					<p>({rating} Reviews)</p>
				</div>
				<div className="des-product-price">
					<span className="oldPrice">₹{oldPrice}</span>
					<span className="newPrice">₹{newPrice}/piece</span>
				</div>
				<div className="des-product">
					<p>{productDetails}</p>
				</div>
				<div className="des-add-to-cart-icon" onClick={() => handleClick(productID)}>
					<FontAwesomeIcon icon={faShoppingBag} className="shop-icon" />
					{backToCart ? <span>GO TO CART</span> : <span>ADD TO CART</span>}
				</div>
				<div className="des-add-to-like-icon" onClick={toggleLike}>
					<FontAwesomeIcon icon={faHeart} className="like" />
					{wishlist.includes(productID) && <span>REMOVE FROM WISH</span>}
					{!wishlist.includes(productID) && <span>ADD TO WISH</span>}
				</div>
			</div>
		</div>
	);
};

export default ProductDescriptionCard;
