import React from "react";
import "../../styles/user/NotFound.css";
import error from '../../../src/assets/images/notfound-img/error.png'
import HeaderPage from "../../components/user/HeaderPage";
import Footer from "./Footer";


export default function NotFound() {
  return (
    <div>
      <HeaderPage/>
      <div className="notfound">
        <div className="error-cont">
          <h1>404 | Not Found</h1>
          <img src={error} alt=""></img>
          <h3>OOOPPS! THIS PAGE CAN'T BE FOUND.</h3>
          <p>It looks like nothing was found at this location.</p>
          <a href="/">GO TO HOME</a>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
}
