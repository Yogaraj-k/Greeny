import Header from "../../components/user/Header";
import Footer from "../../components/user/AuthenticFooter";
import "../../styles/user/resetPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const url = "http://localhost:8000";

  const nav = useNavigate();

  const [email, setEmail] = useState("");

  const [error, setError] = useState({
    email: { status: false, message: "" },
  });

  const [loader, setLoader] = useState(false);

  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (email === "") {
      setError({ ...error, email: { status: true, message: "Email is required !" } });
    } else {
      setLoader(true);
      axios
        .post(`${url}/forgetPassword/forgetUser`, { email })
        .then((res) => {
          setLoader(false);
          console.log(res);
          let resetLink = res.data.message;
          if (resetLink === "Link sent successfully") {
            setDisable(true);
            toast.success("Check your Registered Email !", {
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
          console.log(error);
        });
    }
  };

  return (
    <div className="Authentic-container">
      <Header />
      <ToastContainer />
      <div className="card-resetPassword">
        <div className="Register-content">
          <div className="Register-content-heading">
            <h2>Worried?</h2>
          </div>
          <p id="content-p">No Problem! Just Follow The Simple Way</p>
        </div>

        <div className="form-changePassword">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="password"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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

            {loader === true ? (
              <div className="spinner_overview" style={{ marginBottom: "8px" }}>
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
              GET RESET LINK
            </button>
          </form>
        </div>
      </div>
      <div className="card-changePassword-bottom">
        <div className="content">
          <p>
            Go Back To
            <Link to="/login" id="link">
              Login Here
            </Link>
          </p>
        </div>
      </div>

      <Footer />
      <Link to="/changePassword">Change Password</Link>
    </div>
  );
};

export default ResetPassword;
