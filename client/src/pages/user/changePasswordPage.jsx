import Header from "../../components/user/Header";
import Footer from "../../components/user/AuthenticFooter";
import "../../styles/user/changePassword.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ChangePassword = () => {

	const url = "http://localhost:8000";


  const { token } = useParams();

  const nav = useNavigate();


  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  })

  const [error, setError] = useState({
    newPassword: { status: false, message: "" },
    confirmPassword: { status: false, message: "" }
  })

	const [disable, setDisable] = useState(false);


  const [loader, setLoader] = useState(false);

  const handleChangePassword = (e)=>{
    e.preventDefault();
    let newPass = password.newPassword;
    let confirmPass = password.confirmPassword

		const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  
    if(newPass === ""){
      setError({...error, newPassword:{status:true, message:"New password Field is empty!"}})
    }
    else if (newPass.length < 8) {
			setError({ ...error, newPassword: { status: true, message: "Your password should have at least 8 characters" } });
		}
    else if(!pattern.test(newPass)){
			setError({ ...error, newPassword: { status: true, message: "Your password must have atleast one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)." } });
    }
    else if(confirmPass === ""){
      setError({...error, confirmPassword:{status:true, message:"Confirm passord Field is empty!"}})
    }
    else if(newPass !== confirmPass){
      setError({...error, confirmPassword:{status:true, message:"Password does not match!"}})
    }
    else{
      const passwordData = {
        newPassword:newPass,
        confirmPassword:confirmPass
      }
      console.log(token);
       setLoader(true);
      axios.post(`${url}/changePassword/changeUserPassword/${token}`, passwordData).then((res)=>{
        let resposeData = res.data.message;

        if(resposeData === "Password Changed Successfully"){
          setDisable(true);
          setLoader(false);
          toast.success("Password Updated !", {
            autoClose: 2000,
            onClose: () => {
              setTimeout(() => {
                nav("/login")
              }, 200);
            },
          });
        }

      }).catch((error)=>{
        console.log(error);
        if(error.response.data.message === "Invalid token"){
          toast.error("Reset Link incorrect !", {
            autoClose: 2000,
            onClose: () => {
              setTimeout(() => {
                nav("/resetPassword");
              }, 200);
            },
          });
        }
        else if(error.response.data.message === "Token expired"){
          toast.error("Reset Link Expired !", {
            autoClose: 2000,
            onClose: () => {
              setTimeout(() => {
                nav("/resetPassword");
              }, 200);
            },
          });
        }
        else{
          toast.error("Something went Wrong ! Try again !", {
            autoClose: 2000,
            onClose: () => {
              setTimeout(() => {
                nav("/resetPassword");
              }, 200);
            },
          });
        }
      })
    }
  
  }


  return (
    <div className="Authentic-container">
      <Header />
				<ToastContainer />
      <div className="card-changePassword">
        <div className="Register-content">
          <div className="Register-content-heading">
            <h2>Any Issue ?</h2>
          </div>
          <p id="content-p">Make Sure Your Current Password Is Strong</p>
        </div>

        <div className="form-changePassword">
          <form onSubmit={handleChangePassword}>
            {/* <input type="password" placeholder="Old Password" name="password" /> */}

            <input
              type="password"
              placeholder="New Password"
              name="password"
              value={password.newPassword}
              onChange={(e) => {
                setPassword({...password, newPassword:e.target.value});
                setError({ ...password, newPassword: { status: false, message: "" } })
              }}
            />

            {error.newPassword.status === true ? (
              <div className="form_error">
                <div>
                  <FaStar id="form_error_icon" />
                </div>
                <div>
                  <span style={{ marginLeft: "5px" }}>{error.newPassword.message}</span>
                </div>
              </div>
            ) : (
              ""
            )}


            <input
              type="password"
              placeholder="Confirm Password"
              name="repeatPassword"
              value={password.confirmPassword}
              onChange={(e) => {
                setPassword({...password, confirmPassword:e.target.value});
                setError({ ...password, confirmPassword: { status: false, message: "" } })
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

            <button type="submit" id={disable ? "register_form_btn" : ""} disabled={disable}>Change Password</button>
          </form>
        </div>
      </div>
      <div className="card-changePassword-bottom">
        <div className="bottom-content">
          <p>
            Go Back To
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

export default ChangePassword;
