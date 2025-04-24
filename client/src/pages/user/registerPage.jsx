import Header from "../../components/user/Header";
import Footer from "../../components/user/AuthenticFooter";
import "../../styles/user/register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const url = "http://localhost:8000";

  const nav = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
    loader: false,
  });

  const [disable, setDisable] = useState(false);
  const [error, setError] = useState({
    userName: { status: false, message: "" },
    email: { status: false, message: "" },
    password: { status: false, message: "" },
    confirmPassword: { status: false, message: "" },
    checkBox: { status: false, message: "" },
  });

  const handleUserDataSubmit = (e) => {
    e.preventDefault();

    let name = userData.userName;
    let email = userData.email;
    let password = userData.password;
    let confirmPassword = userData.confirmPassword;
    let checkBox = userData.checkBox;

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (name === "") {
      setError({ ...error, userName: { status: true, message: "Username is required !" } });
    } else if (email === "") {
      setError({ ...error, email: { status: true, message: "Email is required !" } });
    } else if (password === "") {
      setError({ ...error, password: { status: true, message: "Password is required !" } });
    } else if (password.length < 8) {
      setError({ ...error, password: { status: true, message: "Your password should have at least 8 characters" } });
    } else if (!pattern.test(password)) {
      setError({ ...error, password: { status: true, message: "Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)." } });
    } else if (confirmPassword === "") {
      setError({ ...error, confirmPassword: { status: true, message: "confirm Password is required !" } });
    } else if (password !== confirmPassword) {
      setError({ ...error, confirmPassword: { status: true, message: "confirm Password is not same !" } });
    } else if (!checkBox) {
      setError({ ...error, checkBox: { status: true, message: "Agree Terms & conditions !" } });
    } else {
      const handlePost = {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      };
      setUserData({ ...userData, loader: true });
      axios
        .post(`${url}/userDatas/users`, handlePost)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUserData({
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setUserData({ ...userData, loader: false });
            setDisable(true);
            toast.success("Registered Successfull !", {
              autoClose: 2000,
              onClose: () => {
                setTimeout(() => {
                  nav("/login");
                }, 200);
              },
            });
          }
        })
        .catch((error) => {
          console.log(error.response.status);
          const dataError = error.response.status;
          console.log(dataError);
          if (dataError === 500) {
            console.log("User already exists one");
            setUserData({ ...userData, loader: false });
            toast.error("User Already Exist!");
          } else {
            toast.error("Internal Server Error!");
          }
        });
    }
  };

  return (
    <div className="Authentic-container">
      <Header />
      <div className="Register-card">
        <ToastContainer />
        <div className="Register-content">
          <div className="Register-content-heading">
            <h2>Join Now!</h2>
          </div>
          <p>Setup A New Account In A Minute</p>
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
          <div className="verticalLine-register">
            <div className="circle-register">
              <p>or</p>
            </div>
          </div>
          <div className="Register-form">
            <form onSubmit={handleUserDataSubmit}>
              <input
                type="text"
                placeholder="Enter your Name"
                name="name"
                value={userData.userName}
                onChange={(e) => {
                  setUserData({ ...userData, userName: e.target.value });
                  setError({ ...error, userName: { status: false, message: "" } });
                }}
              />
              {error.userName.status === true ? (
                <div className="form_error">
                  <div>
                    <FaStar id="form_error_icon" />
                  </div>
                  <div>
                    <span style={{ marginLeft: "5px" }}>{error.userName.message}</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  setError({ ...error, email: { status: false, message: "" } });
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
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError({ ...error, password: { status: false, message: "" } });
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

              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                value={userData.confirmPassword}
                onChange={(e) => {
                  setUserData({ ...userData, confirmPassword: e.target.value });
                  setError({ ...error, confirmPassword: { status: false, message: "" } });
                }}
              />
              {error.confirmPassword.status === true ? (
                <div className="form_error">
                  <div>
                    <FaStar id="form_error_icon" />
                  </div>
                  <div>
                    <span style={{ marginLeft: "5px" }}>{error.confirmPassword.message}</span>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="header-terms">
                <input
                  type="checkbox"
                  checked={userData.checkBox}
                  onChange={(e) => {
                    setUserData({ ...userData, checkBox: e.target.checked });
                    setError({ ...error, checkBox: { status: false, message: "" } });
                  }}
                  id="terms"
                  name="terms"
                />

                <label htmlFor="terms">
                  Accept all the <a href="...">Terms & Conditions</a>
                </label>
              </div>
              {error.checkBox.status === true ? (
                <div className="form_error">
                  <div>
                    <FaStar id="form_error_icon" />
                  </div>
                  <div>
                    <span style={{ marginLeft: "5px" }}>{error.checkBox.message}</span>
                  </div>
                </div>
              ) : (
                ""
              )}

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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="Register-card-bottom">
        <div className="bottom-content">
          <p>
            Already Have An Account?
            <Link to="/login" id="link">
              Login Here
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
