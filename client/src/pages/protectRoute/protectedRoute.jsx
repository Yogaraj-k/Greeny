import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../user/home";
import Shop from "../user/shop";
import products from "../user/productList";

export const ProtectedLoginRoute = (props) => {
	const [token, setToken] = useState(null);
	const navigate = useNavigate();
	const { Component } = props;

	useEffect(() => {
		const cookieToken = Cookies.get("LoginToken");
		// console.log(cookieToken);
		if (!cookieToken) {
			navigate("/login", { replace: true });
		}
	}, [navigate]);
	let isHomeComponent = Component === Home || Component === Shop;

	console.log("home ...." + isHomeComponent);

	return <div>{isHomeComponent ? <Component products={products} /> : <Component />}</div>;
};
