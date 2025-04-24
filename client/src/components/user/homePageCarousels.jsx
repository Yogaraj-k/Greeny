import Slider from "react-slick";
import { useState, useEffect } from "react";

import product1 from "../../assets/images/homePageImage/products-carousel/01.png";
import product2 from "../../assets/images/homePageImage/products-carousel/02.png";
import banner from "../../assets/images/banner/banner-shape.png";
import "../../styles/user/carouselproducts.css";
import "../../styles/user/carouselfoods.css";

import vegetables from "../../assets/images/homePageImage/foods/01.jpg";
import fruits from "../../assets/images/homePageImage/foods/02.jpg";
import groceries from "../../assets/images/homePageImage/foods/03.jpg";
import dairy from "../../assets/images/homePageImage/foods/04.jpg";
import seafood from "../../assets/images/homePageImage/foods/05.jpg";
import vegan from "../../assets/images/homePageImage/foods/06.jpg";
import dryFood from "../../assets/images/homePageImage/foods/07.jpg";
import fastFood from "../../assets/images/homePageImage/foods/08.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faPercent, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { NextArrow, PrevArrow } from "../../pages/user/aboutUs";
import { Navigate, useNavigate } from "react-router";

const Highlight = () => {
	const data = [
		{
			id: 1,
			image: product1,
		},
		{
			id: 2,
			image: product2,
		},
	];
	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3600,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};
	const navigate = useNavigate();
	const handleClick = ()=>{
		navigate("/shop");
	}
	const handleAbout = () =>{
		navigate("/about")
	}
	return (
		<>
			<div className="highlight">
				<img src={banner} alt="" id="bgimg" />
				<Slider {...settings}>
					{data.map((d) => (
						<div className="slide">
							<div className="product" key={d.key}>
								<img src={d.image} alt="" id="proimg" />
								<div id="description">
									<h1>Free Home Delivery Within 24 Hours Now</h1>
									<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure sunt accusantium quod molestiae voluptatum, laboriosam dolor quis reprehenderit voluptatibus ad.</p>
									<div className="banner-btn">
										<button id="shop" onClick={handleClick}>
											<FontAwesomeIcon icon={faShoppingBasket} />
											Shop Now
										</button>
										<button id="offer" onClick={handleAbout}>
											<FontAwesomeIcon icon={faAddressCard} />
											About Us
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</>
	);
};

/* Carousel Foods */
const Foods = () => {
	const [slideCount, setSlideCount] = useState(5);
	const [slideScroll, setSlideScroll] = useState(2);

	useEffect(() => {
		const handleResize = () => {
			let newSlidesToScroll, newSlidesToShow;
			if (window.innerWidth >= 1180) {
				newSlidesToShow = 4;
			} else if (window.innerWidth >= 840) {
				newSlidesToShow = 3;
			} else {
				newSlidesToShow = 2;
				newSlidesToScroll = 1;
			}

			setSlideCount(newSlidesToShow);
			setSlideScroll(newSlidesToScroll);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.addEventListener("resize", handleResize);
		};
	}, []);

	const foodData = [
		{
			id: 1,
			key: 1,
			foodImg: vegetables,
			category: "Vegetable Foods",
			quantity: "63 Items",
		},
		{
			id: 2,
			foodImg: groceries,
			category: "Groceries",
			quantity: "63 Items",
		},
		{
			id: 3,
			foodImg: dairy,
			category: "Dairy",
			quantity: "63 Items",
		},
		{
			id: 4,
			foodImg: seafood,
			category: "Sea Foods",
			quantity: "63 Items",
		},
		{
			id: 15,
			foodImg: vegan,
			category: "Vegan Foods",
			quantity: "63 Items",
		},
		{
			id: 6,
			foodImg: dryFood,
			category: "Dry Foods",
			quantity: "63 Items",
		},
		{
			id: 7,
			foodImg: fastFood,
			category: "Fast Foods",
			quantity: "63 Items",
		},
		{
			id:8,
			foodImg: fruits,
			category: "Fruits",
			quantity: "63 Items",
		},
	];

	var setting = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: slideCount,
		slidesToScroll: slideScroll,
		autoplay: true,
		autoplaySpeed: 3600,
		prevArrow: <PrevArrow />,
		nextArrow: <NextArrow />,
	};

	return (
		<div className="suggest-food">
			{/* <div className="foods-list"> */}
			<Slider {...setting}>
				{foodData.map((d) => (
					<div className="food" key={d.key}>
						<div className="food-img">
							<img src={d.foodImg} alt={d.category} />
						</div>
						<div className="food-details">
							<h3>{d.category}</h3>
							<p>{d.quantity}</p>
						</div>
					</div>
				))}
			</Slider>
			{/* </div> */}
		</div>
	);
};

export { Highlight, Foods };

