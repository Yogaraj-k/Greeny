import React from "react";
import "../../styles/user/Footer.css";
import footimg from "../../../src/assets/images/footer-img/back-faq.jpg";
import greenylogo from "../../../src/assets/images/footer-img/grocery-logo.png";
import apple from "../../../src/assets/images/footer-img/app-store.png";
import paypal1 from "../../../src/assets/images/footer-img/paypal.jpg";
import visa1 from "../../../src/assets/images/footer-img/visa.jpg";
import discover1 from "../../../src/assets/images/footer-img/discover.jpg";
import maestro1 from "../../../src/assets/images/footer-img/maestro.jpg";
import google from "../../../src/assets/images/footer-img/google-store.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faAt, faHeadset, faLock, faMapMarkerAlt, faMobile, faSyncAlt, faTruck } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const MoveToTopPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="userpanel-footer">
      <div className="office-discount">
        <div className="discount">
          <div className="image">
            <img src={footimg} alt="Offer Banner" />
            <div className="percent">
              <div className="geting">
                <h3>Get 20% Discount For Subscriber</h3>
                <p>Lorem ipsum dolor consectetur adipisicing accusantium</p>
              </div>
              <div className="subscribe">
                <input type="text" placeholder="Enter Your Email Address" />
                <button class="sub-button">@ Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="delivary">
        <div className="del-title">
          <div className="del">
            <div className="del-icons">
              <FontAwesomeIcon icon={faTruck} className="delivary-icon" />
            </div>
            <div className="home">
              <h5 className="wait">Free Home Delivery</h5>
              <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
            </div>
          </div>
          <div className="del">
            <div className="del-icons">
              <FontAwesomeIcon icon={faSyncAlt} />
            </div>
            <div className="return">
              <h5 className="wait">Instant Return Policy</h5>
              <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
            </div>
          </div>
          <div className="del">
            <div className="del-icons">
              <FontAwesomeIcon icon={faHeadset} />
            </div>
            <div className="support">
              <h5 className="wait">Quick Support System</h5>
              <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
            </div>
          </div>
          <div className="del">
            <div className="del-icons">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="payment">
              <h5 className="wait">Secure Payment Way</h5>
              <p>Lorem ipsum dolor sit amet adipisicing elit nobis.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-part">
          <div className="footer_box_social">
            <div className="footer-logo">
              <img src={greenylogo} alt="" height={"100px"} width={250} />
            </div>

            <p className="footer-desc">Adipisci asperiores ipsum ipsa repellat consequatur repudiandae quisquam assumenda dolor perspiciatis sit ipsum dolor amet.</p>
            <li className="footer-social">
              <li>
                <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
                <FontAwesomeIcon icon={faTwitter} />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
                <FontAwesomeIcon icon={faLinkedin} />
              </li>
              <li>
                <FontAwesomeIcon icon={faPinterest} />
              </li>
            </li>
          </div>
        </div>
        <div className="footer-part footer-cont">
          <h3 className="footer-title">Contact Us</h3>
          <div className="footer-contact">
            <li>
              <div>
                <FontAwesomeIcon icon={faAt} className="cont-i_first" />
              </div>
              <div>
                <span>
                  support@example.com
                  <br />
                  carrer@example.com
                </span>
              </div>
            </li>
            <li>
              <FontAwesomeIcon icon={faMobile} className="cont-i" />
              <p className="num">
                <span>+120 279 532 13</span>
                <br />
                <span>+120 279 532 14</span>
              </p>
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="cont-i" />
              <p>
                1Hd- 50, 010 Avenue,
                <br />
                United States
              </p>
            </li>
          </div>
        </div>
        <div className="footer-part link">
          <h3 className="footer-title link1">Quick Links</h3>
          <div className="footer-links">
            <div className="table">
              <tr>
                <td>
                  <a href="/myProfile">My&nbsp;&nbsp;Profile</a>
                </td>

                <td>
                  <a href="/checkout">Checkout</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/orderHistory">Order&nbsp;&nbsp;History</a>
                </td>
                <td>
                  <a href="/shop">Shop</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/wishlist">Wishlist</a>
                </td>
                <td>
                  <a href="/us">Contact</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/privacy">Privacy Policy</a>
                </td>
                <td>
                  <a href="/myWallet">Wallet</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/offers">Offers</a>
                </td>
                <td>
                  <a href="/faq">Faq</a>
                </td>
              </tr>
            </div>
          </div>
        </div>
        <div className="footer-part">
          <div className="app">
            <h3 className="footer-title">Download App</h3>
            <p className="footer-desc lorem">Lorem ipsum dolor sit amet tenetur dignissimos ipsum eligendi autem obcaecati minus ducimus totam reprehenderit exercitationem!</p>
            <div className="footer-app">
              <a href="...">
                <img src={apple} alt="" />
              </a>
              <a href="...">
                <img src={google} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="coder">
        <p className="copytext">
          © All Copyrights Reserved by
          <a href="..."> Segolsys</a>
        </p>
        <div className="coder-card">
          <a href="...">
            <img src={visa1} alt="" />
          </a>
          <a href="...">
            <img src={paypal1} alt="" />
          </a>
          <a href="...">
            <img src={maestro1} alt="" />
          </a>
          <a href="...">
            <img src={discover1} alt="" />
          </a>
        </div>
      </div>
      <div className="arow1">
        <div className="itemarow">
          <a className="arrow1" onClick={MoveToTopPage}>
            <FontAwesomeIcon icon={faArrowUp} />
          </a>
        </div>
      </div>
    </div>
  );
}
