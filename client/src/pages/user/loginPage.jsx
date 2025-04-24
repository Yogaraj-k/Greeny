import Header from "../../components/user/Header";
import Footer from "../../components/user/AuthenticFooter";
import "../../styles/user/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/slice/tokenSlice";
// import { jwtDecode } from "jwt-decode";
import { Url } from "../../config/config";

const LoginCmp = () => {

	const nav = useNavigate();
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		email: "",
		password: "",
		loader: false,
	});

	const [error, setError] = useState({
		email: { status: false, message: "" },
		password: { status: false, message: "" },
	});

	// const [adminStatus, setAdminStatus] = useState("");

	const [disable, setDisable] = useState(false);
	let cookieToken = null;

	const setCookie = (name, value, days) => {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days + 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		}

		document.cookie = name + "=" + encodeURIComponent(value) + expires + ";path=/";
	};
	const dispatch = useDispatch();
	const handleUserDataSubmit = async (event) => {
		event.preventDefault();

		let email = userData.email;
		let password = userData.password;

		if (email === "") {
			setError({ ...error, email: { status: true, message: "Email is required !" } });
		} else if (password === "") {
			setError({ ...error, password: { status: true, message: "Password is required !" } });
		} else {
			const handlePost = {
				email: userData.email,
				password: userData.password,
			};
			console.log(handlePost);
			setUserData({ ...userData, loader: true });
			await axios
				.post(`${Url}/login/loginUser`, handlePost)
				.then((res) => {
					console.log(res.data);
					const token = res.data;
					setCookie("LoginToken", token, 30);
					setDisable(true);
					if (token) {
						//Redux State Global Token
						// const id = jwtDecode(token);
						// console.log(id);
						axios.get(`${Url}/userDatas/getuser/${token}`).then((res) => {
							console.log(res.data)
							const adminStatus = res.data.isAdmin;
							console.log(adminStatus);
							if (adminStatus === true) {
								dispatch(setToken(token));
								setUserData({ ...userData, email: "", password: "" });
								toast.success("Login Successfull !", {
									autoClose: 2000,
									onClose: () => {
										setTimeout(() => {
											nav("/admin/dashboard");
										}, 200);
									},
								});
							}
							else if (adminStatus === false) {
								dispatch(setToken(token));
								setUserData({ ...userData, email: "", password: "" });
								toast.success("Login Successfull !", {
									autoClose: 2000,
									onClose: () => {
										setTimeout(() => {
											nav("/");
										}, 200);
									},
								});
							}
						}).catch((err) => {
							console.log(err);
						})
						
					}
				})
				.catch((error) => {
					console.log(error.code);
					if (error.code === "ERR_BAD_RESPONSE") {
						toast.error("Invalid credentials");
						setUserData({ ...userData, email: "", password: "" });
					}
				});
		}
	};


	useEffect(() => {
		cookieToken = Cookies.get("LoginToken");
		console.log(cookieToken);
		// if (cookieToken) {
		//   setToken(cookieToken);
		// } else {
		//   setToken(null);
		// }
		if (cookieToken) {
			navigate("/");
		}
	}, []);
	return (
		<div className="Authentic-container">
			<Header />
			<div className="card-login">
				<ToastContainer />
				<div className="Register-content">
					<div className="Register-content-heading">
						<h2>Welcome!</h2>
					</div>
					<p>Use Your Credentials To Access</p>
				</div>

				<div className="Register-row">
					<div className="Register-icons">
						<div className="socialBox" id="fb">
							<i className="fab fa-facebook socialIcon fb"></i>
							<p>Join With Facebook</p>
						</div>
						<div className="socialBox" id="tw">
							<i className="fab fa-twitter socialIcon tw"></i>
							<p>Join With Twitter</p>
						</div>
						<div className="socialBox" id="gl">
							<i className="fab fa-google socialIcon gl"></i>
							<p>Join With Google</p>
						</div>
						<div className="socialBox" id="ig">
							<i className="fab fa-instagram socialIcon ig"></i>
							<p>Join With Instagram</p>
						</div>
					</div>
					<div className="verticalLine">
						<div className="circle">
							<p>or</p>
						</div>
					</div>
					<div className="Register-form">
						<form onSubmit={handleUserDataSubmit}>
							<input
								type="email"
								placeholder="Enter your Email"
								name="email"
								value={userData.email}
								onChange={(event) => {
									setUserData({ ...userData, email: event.target.value });
									setError({ ...error, email: "" });
								}}
							/>

							{error.email.status === true ? (
								<div className="form_error">
									<div>
										<FaStar id="form_error_icon" />
									</div>
									<div>
										<span style={{ marginLeft: "5px" }}>{error.email.message}</span>
									</div>
								</div>
							) : (
								""
							)}

							<input
								type="password"
								placeholder="Enter your Password"
								name="password"
								value={userData.password}
								onChange={(event) => {
									setUserData({ ...userData, password: event.target.value });
									setError({ ...error, password: "" });
								}}
							/>

							{error.password.status === true ? (
								<div className="form_error">
									<div>
										<FaStar id="form_error_icon" />
									</div>
									<div>
										<span style={{ marginLeft: "5px" }}>{error.password.message}</span>
									</div>
								</div>
							) : (
								""
							)}

							<div className="header-terms">
								<input type="checkbox" id="header-terms" name="terms" />
								<label htmlFor="terms">Remember me</label>
							</div>

							{userData.loader === true ? (
								<div className="spinner_overview">
									<div className="spinner">
										<div className="spinner-border text-primary" id="spinner_d_flex" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</div>
								</div>
							) : (
								""
							)}

							<button type="submit" id={disable ? "register_form_btn" : ""} disabled={disable}>
								LOGIN
							</button>
							<div className="resetHere">
								<p>
									Forgot your password ?
									<Link to="/resetPassword" id="link">
										Reset Here
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="Register-card-bottom">
				<div className="bottom-content">
					<p>
						Don't Have Any Account?
						<Link to="/register" id="link">
							Register Here
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LoginCmp;
