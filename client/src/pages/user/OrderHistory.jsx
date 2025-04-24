import React, { useEffect, useState } from "react";
import HeaderPage from "../../components/user/HeaderPage";
import Footer from "./Footer";
import "../../styles/user/OrderHistory.css";
import contimg from "../../../src/assets/images/contactus-image/back-faq.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

export default function OrderHistory() {
	const token = useSelector((state) => state.tokenDetails.token);
	const [orderHist, setOrderHist] = useState([]);
	const [productId, setProductId] = useState([]);
	const [clickedIndex, setClickedIndex] = useState(0);
	const [productDetails, setProductDetails] = useState([]);
	const url = "http://localhost:8000";
	const fetchOrderHistory = async () => {
		const orderHistory = await axios.get(`${url}/getOrderDetails/${token}`);
		setOrderHist(orderHistory.data);
	};
	useEffect(() => {
		fetchOrderHistory();
	}, []);

	useEffect(() => {
		if (orderHist[0]) {
			setProductId(orderHist[0].productDetails);
		}
		console.log(orderHist);
	}, [orderHist]);

	useEffect(() => {
		const fetchProductDetails = async () => {
			const uniqueProductIds = new Set(productId.map((prodDet) => prodDet.productdetail));
			const uniqueProductDetails = [];

			for (const id of uniqueProductIds) {
				const res = await axios.get(`${url}/get-userDetails/${id}`);
				const productDet = res.data.data;
				uniqueProductDetails.push(productDet);
			}

			setProductDetails(uniqueProductDetails);
		};
		fetchProductDetails();
	}, [productId]);

	// useEffect(() => {
	// 	console.log(productDetails);
	// }, [productDetails]);

	const renderOrderHistory = () => {
		return orderHist.map((order, index) => {
			return (
				<div
					className="list-of-order"
					onClick={() => {
						setClickedIndex(index);
						setProductId(order.productDetails);
					}}>
					<div className="order-list">
						<div>
							<div className="order1">
								<h5>Order#{index + 1}</h5>
								{order.complete && <h5>Order Delivered</h5>}
								{order.dispatch && <h5>Order Shipped</h5>}
								{order.pending && <h5>Order Processed</h5>}
								{!order.complete && !order.dispatch && !order.pending && <h5>Order Recieved</h5>}
							</div>
							{/* <div className="order-track">
								<li className="track-item active">
									<i>
										<FontAwesomeIcon icon={faCheck} />
									</i>
									<span>Order Recieved</span>
								</li>
								<li className="track-item">
									<i class="fa-solid fa-xmark"></i>
									<span>Order Processed</span>
								</li>
								<li className="track-item">
									<i class="fa-solid fa-xmark"></i>
									<span>Order Shipped</span>
								</li>
								<li className="track-item">
									<i class="fa-solid fa-xmark"></i>
									<span>Order Delivered</span>
								</li>
							</div> */}
							{clickedIndex === index && (
								<div className="delivary-list">
									<div className="order-details">
										<li>
											<h6>Order ID</h6>
											<p>14667</p>
										</li>
										<li>
											<h6>Totl Item</h6>
											<p>{order.productDetails.length} Items</p>
										</li>
										<li>
											<h6>Order Time</h6>
											<p>{order.paymentDate.slice(0, 10)}</p>
										</li>
										<li>
											<h6>Delivery Time</h6>
											<p>{order.paymentDate.slice(0, 10)}</p>
										</li>
									</div>
									<div className="order-details">
										<li>
											<h6>Sub Total</h6>
											<p>Rs.{order.amount}</p>
										</li>
										<li>
											<h6>Discount</h6>
											<p>Rs.0</p>
										</li>
										<li>
											<h6>Delivery Fee</h6>
											<p>Rs.0</p>
										</li>
										<li>
											<h6>Total(Incl. VAT)</h6>
											<p>Rs.{order.amount}</p>
										</li>
									</div>
									<div className="order-address">
										<h6>Delivery Location</h6>
										<p>{order.address}</p>
									</div>
								</div>
							)}
							{clickedIndex === index && (
								<div className="registerAdmindata1">
									<div className="table-row1">
										<div className="table-listdata1">
											<table>
												<thead className="tablehead">
													<tr>
														<th>Serial</th>
														<th>Product</th>
														<th>Name</th>
														<th>Price</th>
														<th>Brand</th>
														<th>Quantity</th>
													</tr>
												</thead>
												<tbody className="tablebody">
													{productDetails &&
														productDetails.map((product, index) => {
															const quantity = productId[index] ? productId[index].quantity : 0;
															return (
																<tr>
																	<td>
																		<h6>{index + 1}</h6>
																	</td>
																	<td className="tablename">
																		<img src={`${url}/uploads/productImage/${product.image}`} alt="" />
																	</td>
																	<td>
																		<h6>{product.productName}</h6>
																	</td>
																	<td>
																		<h6>$19/kilo</h6>
																	</td>
																	<td>
																		<h6>Fresh Company</h6>
																	</td>
																	<td>
																		<h6>{quantity}</h6>
																	</td>
																</tr>
															);
														})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<div>
			<HeaderPage />
			<div className="offers-banner">
				<img src={contimg} alt="Offer Banner" />
				<div className="offer-banner-content">
					<h1>ORDER HISTORY</h1>
					<a href="/">Home</a>/<a href="...">Orderlist</a>
				</div>
			</div>
			<div className="order-history">
				<div className="totalorder">
					<h5>Total Oreder - ({orderHist.length})</h5>
					<div className="order-selection">
						<label className="form-label">Short By :</label>
						<select className="select-history">
							<option value="">All Order</option>
							<option value="">Recieved Order</option>
							<option value="">Processed Order</option>
							<option value="">Shipped order</option>
							<option value="">Delivered order</option>
						</select>
					</div>
				</div>
				{renderOrderHistory()}
			</div>
			<Footer />
		</div>
	);
}
