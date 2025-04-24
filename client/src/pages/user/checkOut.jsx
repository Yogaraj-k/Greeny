import banner from "../../assets/images/banner/single-banner.jpg";
import HeaderPage from "../../components/user/HeaderPage";
import "../../styles/user/checkout.css";

import payPal from "../../assets/images/payment-options/01.png";
import visa from "../../assets/images/payment-options/02.png";
import maestro from "../../assets/images/payment-options/03.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import Footer from "./Footer";
import products from "../../pages/user/productList";
import ProductDescriptionCard from "./productDescriptionCard";
import { useSelector, useDispatch } from "react-redux";
import { useSlider } from "../../pages/user/home";
import axios from "axios";
import { toastWarn } from "./myProfile";
import { useNavigate } from "react-router";

function CheckOut() {
	const nav = useNavigate();

	const profiles = document.querySelectorAll(".profiles-content");
	const token = useSelector((state) => state.tokenDetails.token);
	const [productDetails, setProductDetails] = useState([]);
	const [userDetails, setUserDetails] = useState([]);

	const { isSidebarOpen, setSidebarOpen, userCartItem, setUserCartItem } = useSlider();
	let responseUserArray = [];
	const url = "http://localhost:8000";
	const [totalCardPrice, setTotalCardPrice] = useState(0);
	const [totalCartItem, setTotalCartItem] = useState(0);
	useEffect(() => {
		const findUser = async () => {
			try {
				const id = token;
				const userData = await axios.get(`${url}/login/getuser/${id}`);
				setUserDetails(userData.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (userCartItem.length == 0) {
			setTotalCardPrice(0);
			setTotalCartItem(0);
		}
		userCartItem.map((items) => {
			const productID = items.productID;
			console.log(items);
			axios
				.get(`http://localhost:8000/get-userDetails/${productID}`)
				.then((response) => {
					console.log(response.data.data);
					const productResponse = response.data.data;
					const userItem = {
						productdetail: productResponse,
						quantity: items.quantity,
					};
					responseUserArray.push(userItem);
					console.log(responseUserArray);
					let totalPrice = 0;
					let count = 0;

					responseUserArray.forEach((product) => {
						totalPrice += product.productdetail.newPrice * product.quantity;
						count = count + 1;
					});
					console.log("Price" + totalPrice);
					setTotalCardPrice(totalPrice);
					console.log("product count " + count);
					setTotalCartItem(count);
				})
				.catch((error) => {
					console.error("Error fetching product data:", error);
				});
		});
		console.log(responseUserArray);
		setProductDetails(responseUserArray);
		findUser();
	}, [userCartItem]);

	const [selectContact, setSelectContact] = useState(false);
	const [selectedPhone, setSelectedPhone] = useState(0);
	const [selectAddress, setSelectAddress] = useState(false);
	const [selectedAdd, setSelectedAdd] = useState("");
	const selectPhone = () => {
		setSelectContact(true);
	};
	const selectPhoneClose = () => {
		const contactNum = document.getElementById("select-phone").value;
		setSelectedPhone(contactNum);
		setSelectContact(false);
		selectDeliveryAddress();
	};

	const selectDeliveryAddress = () => {
		setSelectAddress(true);
	};
	const selectDeliveryAddressClose = () => {
		const address = document.getElementById("select-adress").value;
		setSelectedAdd(address);
		setSelectAddress(false);
	};

	useEffect(() => {
		// console.log(selectedAdd);
		makeOrder(totalCardPrice).then((res) => {
			console.log(res);
		});
	}, [selectedAdd]);
	const makeOrder = async (amount) => {
		console.log(amount);
		if (amount != 0) {
			const postData = {
				token: token,
				amountToAdd: amount,
			};

			var options = {
				key: "rzp_test_wHOtfkPpntJDBS",
				key_secret: "LEwbicytmeNgeSaggWwGfNTJ",
				amount: amount * 100,
				currency: "INR",
				name: "Demo",
				description: "for testing purpose",
				handler: async (response) => {
					console.log(response);
					if (response.razorpay_payment_id) {
						const orderId = response.razorpay_payment_id;
						console.log("Order ID:", orderId);
						try {
							// Create payload object with order details
							const paymentDetails = {
								token,
								orderId,
								amount,
								paymentDate: new Date().toISOString(),
								productDetails,
								userDetails,
								address: selectedAdd,
								contact: selectedPhone,
							};

							await axios
								.post(`${url}/orderDetails`, paymentDetails, {
									headers: {
										"Content-Type": "application/json",
									},
								})
								.then((res) => {
									console.log(res.data);
								})
								.then(() => {
									nav("/orderhistory");
								});

							console.log("Order details sent successfully!");
							setUserCartItem([]);
							setTotalCardPrice(0);
							setTotalCartItem(0);
						} catch (error) {
							console.error("Error sending order details:", error);
						}
						await axios
							.post(`${url}/walletData`, postData)

							.catch((err) => {
								console.log(err);
							});
					} else {
						toastWarn("Payment failed");
					}
				},
				prefill: {
					name: "IDM Techpark",
					email: "idm@gmail.com",
					contact: "7904425541",
				},
				notes: {
					address: "Razorpay Corporate office",
				},
				theme: {
					color: "#119744",
				},
			};
			var pay = new window.Razorpay(options);
			pay.open();
		}
	};

	const DeleteCartProduct = (product) => {
		console.log(product.productdetail._id);
		const id = product.productdetail._id;
		try {
			axios.delete(`http://localhost:8000/DeleteProductFromCart/${id}/${token}`).then((res) => {
				console.log(res.data);
				setUserCartItem(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	profiles.forEach((profile) => {
		profile.addEventListener("click", () => {
			profiles.forEach((p) => p.classList.remove("active"));
			profile.classList.add("active");
		});
	});

	const [showContact, setShowContact] = useState(false);
	const [showEditContact, setShowEditContact] = useState(false);
	const [showAddress, setShowAddress] = useState(false);
	const [showEditAddress, setShowEditAdress] = useState(false);
	const [showCard, setShowCard] = useState(false);

	const [editIndex, setEditIndex] = useState(null);

	const handleContactClose = () => {
		const contactType = document.getElementById("contactType").value;
		const contactNumber = document.getElementById("contact-number").value;
		if (contactNumber.length != 10) {
			toastWarn("Phone Must Contains 10 digit");
			return;
		}
		const postData = {
			token: token,
			contactNumbers: [
				{
					contactType: contactType,
					contactNumber: contactNumber,
				},
			],
		};
		console.log(postData);
		axios
			.post(`${url}/profileData/contact`, postData)
			.then((response) => {
				console.log("Data posted successfully:", response.data);
				setContactDetails(response.data.contactNumbers);
			})
			.catch((error) => {
				console.error("Error posting data:", error);
			});

		setShowContact(false);
	};
	const handleContactShow = () => setShowContact(true);

	const handleEditContactShow = (index) => {
		setShowEditContact(true);
		setEditIndex(index);
	};

	const handleContactEditClose = async () => {
		const contactType = document.getElementById("contactType").value;
		const contactNumber = document.getElementById("contact-number").value;
		if (contactNumber.length != 10) {
			toastWarn("Phone Must Contains 10 digit");
			return;
		}
		const postData = {
			token: token,
			contactNumbers: [
				{
					contactType: contactType,
					contactNumber: contactNumber,
				},
			],
		};
		await axios
			.put(`${url}/profileData/editContact/${editIndex}`, postData)
			.then((res) => {
				console.log(res.data);
				setContactDetails(res.data.contactNumbers);
			})
			.catch((err) => {
				console.log(err);
			});

		setShowEditContact(false);
		setEditIndex(null);
	};

	const handleAddressClose = () => {
		setShowAddress(false);
		const address = document.getElementById("adress-profile").value;
		const addressType = document.getElementById("addressType").value;
		const postData = {
			token: token,
			addresses: [
				{
					address: address,
					addressType: addressType,
				},
			],
		};
		axios
			.post(`${url}/profileData/address`, postData)
			.then((response) => {
				console.log("Address data posted successfully:", response.data);
				setAddressDetails(response.data.addresses);
			})
			.catch((error) => {
				console.error("Error posting address data:", error);
			});
	};

	const handleAddressShow = () => setShowAddress(true);

	const handleEditAdressShow = (index) => {
		setShowEditAdress(true);
		setEditIndex(index);
	};

	const handleEditAddressClose = async () => {
		setShowEditAdress(false);
		const address = document.getElementById("adress-profile").value;
		const addressType = document.getElementById("addressType").value;
		const postData = {
			token: token,
			addresses: [
				{
					address: address,
					addressType: addressType,
				},
			],
		};
		axios
			.put(`${url}/profileData/address/${editIndex}`, postData)
			.then((response) => {
				console.log("Address data posted successfully:", response.data);
				setAddressDetails(response.data.addresses);
			})
			.catch((error) => {
				console.error("Error posting address data:", error);
			});

		setEditIndex(null);
	};

	const handleCardShow = () => setShowCard(true);
	const handleCardClose = () => {
		setShowCard(false);
		const cardType = document.getElementById("card-type").value;
		const cardNumber = document.getElementById("card-number").value;
		const cardOwnerName = document.getElementById("card-owner-name").value;
		let validationError = false;
		if (cardNumber.length !== 16) {
			toastWarn("Card Number Must Contain 16 Digits");
			validationError = true;
			return;
		}
		if (!/^\d+$/.test(cardNumber)) {
			validationError = true;
			toastWarn("Card Must Not Contain any Special Character");
			return;
		}
		if (validationError) return;
		const postData = {
			token: token,
			cardType: cardType,
			cardNumber: cardNumber,
			ownerName: cardOwnerName,
		};
		axios
			.post(`${url}/profileData/card`, postData)
			.then((response) => {
				console.log("Data posted successfully:", response.data);
				setCardDetails(response.data.cards);
			})
			.catch((error) => {
				console.error("Error posting data:", error);
			});
	};

	const [contactDetails, setContactDetails] = useState([]);
	const [addressDetails, setAddressDetails] = useState([]);
	const [cardDetails, setCardDetails] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const profileDataRes = await axios.get(`${url}/profileData/${token}`);

				setContactDetails(profileDataRes.data.contactNumbers);
				setAddressDetails(profileDataRes.data.addresses);
				setCardDetails(profileDataRes.data.cards);
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
		};
		fetchData();
		console.log(token);
	}, []);

	const handelDeleteContact = async (index) => {
		await axios
			.delete(`${url}/profileData/delContact/${token}/${index}`)
			.then((res) => {
				console.log(res.data);
				setContactDetails(res.data.contactNumbers);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const renderContactDetails = () => {
		return contactDetails.map((contact, index) => (
			<div className="primary-number profiles-content" key={index}>
				<h5>{contact.contactType}</h5>
				<p>{contact.contactNumber}</p>
				<div className="profile-action-buttons">
					<button className="profile-action-edit-btn" onClick={() => handleEditContactShow(index)}>
						<FontAwesomeIcon icon={faPen} />
					</button>
					<button className="profile-action-del-btn" onClick={() => handelDeleteContact(index)}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</div>
		));
	};

	const handelDeleteAddress = async (index) => {
		await axios
			.delete(`${url}/profileData/delAddress/${token}/${index}`)
			.then((res) => {
				console.log(res.data);
				setAddressDetails(res.data.addresses);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const renderAddressDetails = () => {
		return addressDetails.map((address, index) => (
			<div className="delivery-primary-address profiles-content" key={index}>
				<h5>{address.addressType}</h5>
				<p>{address.address}</p>
				<div className="profile-action-buttons">
					<button className="profile-action-edit-btn" onClick={() => handleEditAdressShow(index)}>
						<FontAwesomeIcon icon={faPen} />
					</button>
					<button className="profile-action-del-btn">
						<FontAwesomeIcon icon={faTrash} onClick={() => handelDeleteAddress(index)} />
					</button>
				</div>
			</div>
		));
	};

	const handleDeleteCard = async (index) => {
		// console.log(index);
		await axios
			.delete(`${url}/profileData/delCard/${token}/${index}`)
			.then((res) => {
				console.log(res.data);
				setCardDetails(res.data.cards);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const renderCardDetails = () => {
		return cardDetails.map((card, index) => {
			let cardImage;
			if (card.cardType === "paypal") {
				cardImage = payPal;
			} else if (card.cardType === "maestro") {
				cardImage = maestro;
			} else {
				cardImage = visa;
			}
			return (
				<div className="payment-card profiles-content" key={index}>
					<img src={cardImage} alt="" />
					<h5>
						Card Number <br />
						************{card.cardNumber.slice(-4)}
					</h5>
					<p>{card.ownerName}</p>
					<button className="profile-action-del-btn">
						<FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteCard(index)} />
					</button>
				</div>
			);
		});
	};

	useEffect(() => {
		if (contactDetails) {
			renderContactDetails();
		}
	}, [contactDetails]);

	useEffect(() => {
		if (addressDetails);
		renderAddressDetails();
	}, [addressDetails]);

	useEffect(() => {
		if (cardDetails) renderCardDetails();
	}, [cardDetails]);

	// const [liked, setLiked] = useState(false);

	// const toggleLike = () => {
	// 	setLiked(!liked);
	// };
	const [showModal, setShowModal] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const toggleDescription = (product) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<HeaderPage />

			<div className="myprofile-banner">
				<img src={banner} alt="Banner" />
				<div className="myprofile-banner-content">
					<h1>CHECKOUT</h1>
				</div>
				<div className="myprofile-banner-anchors">
					<p>
						<a href="/">Home</a> / Checkout
					</p>
				</div>
			</div>

			<div className="myprofile-section">
				<div className="myprofile-details">
					<div className="returning-customer">
						<p>
							Returning Customer? <a href="...">Click here to login</a>
						</p>
					</div>

					<div className="checkout profile-element">
						<div className="contact-head myprofile-headers">
							<h2>Your Order</h2>
						</div>
						<div className="wishlist-table-container">
							<table className="wishlist-table">
								<thead>
									<tr>
										<th>Serial</th>
										<th>Product</th>
										<th>Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{productDetails.map((product, index) => (
										<tr>
											<td>{index + 1}</td>
											<td>
												<img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="empty" />
											</td>
											<td>{product.productdetail.productName}</td>
											<td>$ {product.productdetail.newPrice}</td>

											<td>{product.quantity}</td>
											<td>$ {product.productdetail.newPrice * product.quantity}</td>
											<td>
												<FontAwesomeIcon icon={faEye} className="wishlist-view" onClick={() => toggleDescription(product)} />

												<FontAwesomeIcon
													icon={faTrash}
													className="wishlist-delete"
													onClick={() => {
														DeleteCartProduct(product);
													}}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="checkout-summary" style={{ textAlign: "center" }}>
							<a href="..." style={{ color: "#119744" }}>
								Do you have a coupon code?
							</a>

							<span>
								<h5>Sub Total</h5>
								<h5>${totalCardPrice}</h5>
							</span>
							<span>
								<h5>Delivery Fee</h5>
								<h5>$0</h5>
							</span>
							<span>
								<h5>Discount</h5>
								<h5>$0</h5>
							</span>
							<span style={{ color: "#119744" }}>
								<h5>Total(incl.VAT)</h5>
								<h5>${totalCardPrice}</h5>
							</span>
						</div>
					</div>

					<div className="select-contact-popup">
						<Modal size="xl" centered show={selectContact} onHide={() => setSelectContact(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Select Phone</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div>
									<label htmlFor="select-phone">Select Phone</label>
									<select name="PhoneNumber" id="select-phone">
										{contactDetails.map((contact) => {
											return <option value={contact.contactNumber}>{contact.contactNumber}</option>;
										})}
									</select>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<p style={{ color: "#119744" }}>This selected number will be used for contacting you at the time of delivery</p>
								<Button variant="secondary" onClick={selectPhoneClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="select-address-popup">
						<Modal size="xl" centered show={selectAddress} onHide={() => setSelectAddress(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Select Address</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div>
									<label htmlFor="select-address">Select Address</label>
									<select name="Address" id="select-adress">
										{addressDetails.map((address) => {
											return <option value={address.address}>{address.address}</option>;
										})}
									</select>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<p style={{ color: "#119744" }}>This selected address will be used as a delivery address</p>
								<Button variant="secondary" onClick={selectDeliveryAddressClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="add-contact-popup">
						<Modal show={showContact} onHide={() => setShowContact(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Add Contact</Modal.Title>
							</Modal.Header>
							<Modal.Body className="edit-contact-modal">
								<div>
									<select name="contactType" id="contactType">
										<option value="Primary">Primary</option>
										<option value="Secondary">Secondary</option>
									</select>
									<label htmlFor="profile-contact">Enter Number</label>
									<input type="number" id="contact-number" />
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleContactClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="edit-contact-popup">
						<Modal show={showEditContact} onHide={() => setShowEditContact(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Edit Contact</Modal.Title>
							</Modal.Header>
							<Modal.Body className="edit-contact-modal">
								<div>
									<select name="contactType" id="contactType">
										<option value="Primary">Primary</option>
										<option value="Secondary">Secondary</option>
									</select>
									<label htmlFor="profile-contact">Enter Number</label>
									<input type="number" id="contact-number" />
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleContactEditClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="add-address-popup">
						<Modal show={showAddress} onHide={() => setShowAddress(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Edit Address</Modal.Title>
							</Modal.Header>
							<Modal.Body className="edit-address-modal">
								<div>
									<label htmlFor="profile-contact">Enter Address</label>
									<textarea style={{ width: "90%" }} type="number" id="adress-profile" />
								</div>
								<div>
									<label htmlFor="adress-type">Adress Type</label>
									<select name="addressType" id="addressType">
										<option value="Primary">Primary</option>
										<option value="Secondary">Secondary</option>
									</select>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleAddressClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="edit-address-popup">
						<Modal show={showEditAddress} onHide={() => setShowEditAdress(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Edit Address</Modal.Title>
							</Modal.Header>
							<Modal.Body className="edit-address-modal">
								<div>
									<label htmlFor="profile-contact">Enter Address</label>
									<textarea style={{ width: "90%" }} type="number" id="adress-profile" />
								</div>
								<div>
									<label htmlFor="adress-type">Adress Type</label>
									<select name="addressType" id="addressType">
										<option value="Primary">Primary</option>
										<option value="Secondary">Secondary</option>
									</select>
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleEditAddressClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="add-card-popup">
						<Modal show={showCard} onHide={() => setShowCard(false)}>
							<Modal.Header closeButton>
								<Modal.Title>Edit Prfofile</Modal.Title>
							</Modal.Header>
							<Modal.Body className="edit-address-modal">
								<div>
									<select name="card-type" id="card-type">
										<option value="visa">Visa</option>
										<option value="maestro">Mastero</option>
										<option value="paypal">PayPal</option>
									</select>
								</div>
								<div>
									<label htmlFor="profile-contact">Enter Card Number</label>
									<input type="text" id="card-number" />
								</div>
								<div>
									<label htmlFor="card-owner-name">Name</label>
									<input type="text" id="card-owner-name" />
								</div>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={handleCardClose}>
									Submit
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					<div className="contact-details profile-element">
						<div className="contact-head myprofile-headers">
							<h2>Contact Details</h2>
							<button className="profile-head-btn add-contact" onClick={handleContactShow}>
								Add Contact
							</button>
						</div>
						<div className="contact-content profiles-content-containers">{renderContactDetails()}</div>
					</div>

					<div className="delivery-address profile-element">
						<div className="delivery-address-head myprofile-headers">
							<h2>Delivery Address</h2>
							<button className="profile-head-btn add-address" onClick={handleAddressShow}>
								Add Address
							</button>
						</div>
						<div className="delivery-address-content profiles-content-containers">{renderAddressDetails()}</div>
					</div>

					<div className="payment-option-profile profile-element">
						<div className="payment-option-head myprofile-headers">
							<h2>Payment Option</h2>
							<button className="profile-head-btn add-card" onClick={handleCardShow}>
								Add Card
							</button>
						</div>
						<div className="payment-option-content profiles-content-containers">{renderCardDetails()}</div>
					</div>
				</div>
				<div className="makeOrder">
					<button
						onClick={() => {
							/*makeOrder(totalCardPrice)*/ selectPhone();
						}}>
						Place Order
					</button>
				</div>
			</div>
			<Modal show={showModal} className="model-container" onHide={closeModal} centered size="lg">
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					{selectedProduct && selectedProduct.productdetail && (
						<ProductDescriptionCard
							product={{
								imgSrc: selectedProduct.productdetail.image,
								imageSlider: selectedProduct.productdetail.imageSlider,
								rating: selectedProduct.productdetail.rating,
								productName: selectedProduct.productdetail.productName,
								oldPrice: selectedProduct.productdetail.oldPrice,
								newPrice: selectedProduct.productdetail.newPrice,
								setSale: selectedProduct.productdetail.sale,
								setNew: selectedProduct.productdetail.newProduct,
								discountPercentage: selectedProduct.productdetail.discountPercentage,
								productDetails: selectedProduct.productdetail.productDescription,
								productID: selectedProduct.productdetail._id,
							}}
							onClose={closeModal}
						/>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" className="green-background-button" onClick={closeModal}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Footer />
		</>
	);
}

export default CheckOut;
