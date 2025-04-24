import ProductCard from "../../pages/user/productCard";
import HeaderPage from "../../components/user/HeaderPage";
import banner from "../../assets/images/banner/single-banner.jpg";
import "../../styles/user/shop.css";
import shopImage from "../../assets/images/ProductImage/shopImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toastWarn } from "./myProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../pages/user/Footer";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
const ShopPage = ({ products }) => {
	const [productDetails, setProductDetails] = useState([]);
	const searchedProducts = useSelector((state) => state.searchProductDetails.productDetails);

	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const filterByPrice = () => {
		const filteredProducts = searchedProducts.filter((product) => {
			const productPrice = product.newPrice;
			return (!minPrice || productPrice >= parseInt(minPrice)) && (!maxPrice || productPrice <= parseInt(maxPrice));
		});
		setProductDetails(filteredProducts);
	};
	useEffect(() => {
		filterByPrice();
	}, [minPrice, maxPrice]);

	const [selectedRatings, setSelectedRatings] = useState([]);
	const handleRatingChange = (rating) => {
		const isRatingSelected = selectedRatings.includes(rating);

		if (isRatingSelected) {
			setSelectedRatings(selectedRatings.filter((selectedRating) => selectedRating !== rating));
		} else {
			setSelectedRatings([...selectedRatings, rating]);
		}
	};
	useEffect(() => {
		filterProductsByRating();
	}, [selectedRatings]);

	const [tag, setTag] = useState({
		newItem: false,
		saleItem: false,
		featured: false,
	});
	const filteredProductsByTag = () => {
		let filteredProducts = productDetails;

		if (tag.newItem) {
			filteredProducts = filteredProducts.filter((product) => product.newProduct);
		}
		if (tag.saleItem) {
			filteredProducts = filteredProducts.filter((product) => product.sale);
		}
		if (tag.featured) {
			filteredProducts = filteredProducts.filter((product) => product.featuredItems);
		}
		setProductDetails(filteredProducts);
	};
	useEffect(() => {
		filteredProductsByTag();
		if (!tag.featured && !tag.saleItem && !tag.newItem) {
			setProductDetails(searchedProducts);
		}
	}, [tag]);

	const [newItemsCount, setNewItemsCount] = useState(0);
	const [saleItemCount, setSaleItemCount] = useState(0);
	const [featuredCount, setFeaturedCount] = useState(0);

	useEffect(() => {
		let newCount = productDetails.filter((product) => product.newProduct).length;
		setNewItemsCount(newCount);
		newCount = productDetails.filter((product) => product.sale).length;
		setSaleItemCount(newCount);
		newCount = productDetails.filter((product) => product.featuredItems).length;
		setFeaturedCount(newCount);
	}, [tag, searchedProducts, productDetails]);

	// Function to filter products based on selected ratings
	const filterProductsByRating = () => {
		if (selectedRatings.length === 0) {
			setProductDetails(searchedProducts);
		} else {
			const filteredProducts = searchedProducts.filter((product) => selectedRatings.includes(product.rating));
			setProductDetails(filteredProducts);
		}
	};

	const renderFilterByRating = () => {
		return [5, 4, 3, 2, 1].map((star) => {
			// const productsWithStarRating = searchedProducts.filter((product) => product.rating === star);
			// const productCount = productsWithStarRating.length;
			return (
				<div className="filter-rating" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<div className="filter-star" onChange={() => handleRatingChange(star)}>
						<label key={star} style={{ display: "flex", padding: "10px" }}>
							<input type="checkbox" style={{ marginRight: "5px" }} checked={selectedRatings.includes(star)} />
							{[...Array(5)].map((_, index) => (
								<FontAwesomeIcon key={index} icon={faStar} style={{ color: star >= index + 1 ? "gold" : "gray", marginRight: "5px" }} />
							))}
						</label>
					</div>
					{/* <div className="ratingCount">
						<p style={{ padding: "7px" }}>{productCount}</p>
					</div> */}
				</div>
			);
		});
	};

	const search = useSelector((state) => state.searchVal.search);

	useEffect(() => {
		setMaxPrice(0);
		setMinPrice(0);
		setSelectedRatings([]);
	}, [search]);

	useEffect(() => {
		// axios
		//   .get(`http://localhost:8000/get-productDetails`)
		//   .then((response) => {
		//     setProductDetails(response.data.data);
		//   })
		//   .catch((error) => {
		//     console.error("Error fetching product data:", error);
		//   });
		setProductDetails(searchedProducts);
		// console.log(searchedProducts);
	}, [searchedProducts]);
	return (
		<>
			<HeaderPage />
			<div className="">
				<div className="offers-banner">
					<img src={banner} alt="Offer Banner" />
					<div className="offer-banner-content">
						<h1>SHOP</h1>
						<a href="/">Home</a>/<a href="/shop">Shop Grid</a>
					</div>
				</div>
				<div className="shop-container">
					<div className="filter-container">
						<div className="shop-image">
							<img src={shopImage} alt="shop Banner" />
						</div>
						<div className="filter-card">
							<span className="filter-tile">FILTER BY PRICE</span>
							<div className="filterHr"></div>
							<div className="filter-price-content">
								<div className="filter-input">
									<div>
										<label htmlFor="">Min Price</label>
										<input type="text" placeholder="Min-00" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="min-price" />
									</div>
									<div>
										<label htmlFor="">Max Price</label>
										<input type="text" placeholder="Max-5k" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="max-price" />
									</div>
								</div>
								{/* <div className="filter-search" onClick={handlePriceFilter}>
									<FontAwesomeIcon icon={faSearch} />
									<span>Search</span>
								</div> */}
								<div
									className="filter-search"
									onClick={() => {
										setMaxPrice(0);
										setMinPrice(0);
									}}>
									<FontAwesomeIcon icon={faTrashAlt} />
									<span>Clear Filter</span>
								</div>
							</div>
						</div>
						<div className="filter-card">
							<span className="filter-tile">FILTER BY RATING</span>
							<div className="filterHr"></div>
							{renderFilterByRating()}
							<div className="filter-search" onClick={() => setSelectedRatings([])}>
								<FontAwesomeIcon icon={faTrashAlt} />
								<span>Clear Filter</span>
							</div>
						</div>
						<div className="filter-card">
							<span className="filter-tile">FILTER BY TAG</span>
							<div className="filterHr"></div>
							<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
								<div
									className="f-tag"
									onClick={() => {
										setTag((prevState) => ({ ...prevState, newItem: !prevState.newItem }));
									}}>
									<input type="checkbox" style={{ marginRight: "10px" }} checked={tag.newItem} />
									<span>New Item</span>
								</div>
								<div className="tag-count">
									<span>{newItemsCount}</span>
								</div>
							</div>
							<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
								<div
									className="f-tag"
									onClick={() => {
										setTag((prevState) => ({ ...prevState, saleItem: !prevState.saleItem }));
									}}>
									<input type="checkbox" style={{ marginRight: "10px" }} checked={tag.saleItem} />
									<span>Sale Item</span>
								</div>
								<div className="tag-count">
									<span>{saleItemCount}</span>
								</div>
							</div>
							<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
								<div
									className="f-tag"
									onClick={() => {
										setTag((prevState) => ({ ...prevState, featured: !prevState.featured }));
									}}>
									<input type="checkbox" style={{ marginRight: "10px" }} checked={tag.featured} />
									<span>Feature Item</span>
								</div>
								<div className="tag-count">
									<span>{featuredCount}</span>
								</div>
							</div>
							<div
								className="filter-search"
								onClick={() =>
									setTag({
										saleItem: false,
										featured: false,
										newItem: false,
									})
								}>
								<FontAwesomeIcon icon={faTrashAlt} />
								<span>Clear Filter</span>
							</div>
						</div>
						<div className="filter-card">
							<span className="filter-tile">FILTER BY BRAND</span>
							<div className="filterSearchBar">
								<input type="text" placeholder="Search.." />
							</div>
							<div className="brand-content" style={{ height: "100px", overflow: "auto", marginTop: "20px", paddingRight: "10px" }}>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
							</div>
							<div className="filter-search">
								<FontAwesomeIcon icon={faTrashAlt} />
								<span>Clear Filter</span>
							</div>
						</div>
						<div className="filter-card">
							<span className="filter-tile">FILTER BY CATEGORY</span>
							<div className="filterSearchBar">
								<input type="text" placeholder="Search.." />
							</div>
							<div className="brand-content" style={{ height: "100px", overflow: "auto", marginTop: "20px", paddingRight: "10px" }}>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
								<div className="filter-tag" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "10px 0px" }}>
									<div className="f-tag">
										<input type="checkbox" style={{ marginRight: "10px" }} />
										<span>New Item</span>
									</div>
									<div className="tag-count">
										<span>(13)</span>
									</div>
								</div>
							</div>
							<div className="filter-search">
								<FontAwesomeIcon icon={faTrashAlt} />
								<span>Clear Filter</span>
							</div>
						</div>
					</div>
					<div className="shop-page-product">
						<div className="shop-top">
							<div className="shop-top-1">
								<span> SHOW:</span>

								<select style={{ bordeRadius: "5px", backgroundColor: "transparent", border: "1px solid #ccc", outline: "none", padding: "8px", color: "#555", fontSize: "14px" }}>
									<option value="">12</option>
									<option value="option1A">24</option>
									<option value="option1B">36</option>
								</select>
							</div>
							<div className="shop-top-2">
								<span> SORT BY:</span>
								<select style={{ bordeRadius: "5px", backgroundColor: "transparent", border: "1px solid #ccc", outline: "none", padding: "8px", color: "#555", fontSize: "14px" }}>
									<option value="">Default</option>
									<option value="option1A">Treading</option>
									<option value="option1B">Featured</option>
									<option value="option1B">Recommend</option>
								</select>
							</div>
						</div>
						<div className="shop-product">
							<div className="shop-product-grid">
								{productDetails.map((product) => (
									<ProductCard
										key={product._id}
										imgSrc={product.image}
										imageSlider={product.imageSlider}
										rating={product.rating}
										productName={product.productName}
										oldPrice={product.oldPrice}
										newPrice={product.newPrice}
										setNew={product.newProduct}
										setSale={product.sale}
										discountPercentage={product.discountPercentage}
										productDetails={product.productDescription}
										product={product}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<ToastContainer
				//container
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

			<Footer />
		</>
	);
};

export default ShopPage;
