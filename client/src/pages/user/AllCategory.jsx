import React from "react";
import "../../styles/user/AllCategory.css";
import HeaderPage from "../../components/user/HeaderPage";
import Footer from "./Footer";
import banner from "../../assets/images/banner/single-banner.jpg";
import dairy from "../../../src/assets/images/AllCategory/dairy.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import product1 from "../../../src/assets/images/AllCategory/01.jpg";
import product2 from "../../../src/assets/images/AllCategory/02.jpg";
import product3 from "../../../src/assets/images/AllCategory/03.jpg";
import product4 from "../../../src/assets/images/AllCategory/04.jpg";
import product5 from "../../../src/assets/images/AllCategory/05.jpg";
import product6 from "../../../src/assets/images/AllCategory/drinks.jpg";
import product7 from "../../../src/assets/images/AllCategory/fastfoods.jpg";
import product8 from "../../../src/assets/images/AllCategory/fish.jpg";
import product9 from "../../../src/assets/images/AllCategory/fruits.jpg";
import product10 from "../../../src/assets/images/AllCategory/groceries.jpg";
import product11 from "../../../src/assets/images/AllCategory/meat.jpg";
import product12 from "../../../src/assets/images/AllCategory/vegetables.jpg";


export default function AllCategory() {
  return (
    <div>
      <HeaderPage />

      <div className="offers-banner">
        <img src={banner} alt="Offer Banner" />
        <div className="offer-banner-content">
          <h1>ALL CATEGORY</h1>
          <a href="/">Home</a>/<a href="#.">All-Category</a>
        </div>
      </div>
      <div className="allcategory-cont">
        <div className="totalorder1">
          <div className="order-selection1">
            <label className="form-label1">Show:</label>
            <select className="select-history1">
              <option value="">12</option>
              <option value="">24</option>
              <option value="">36</option>
            </select>
          </div>
          <div className="order-selection1">
            <label className="form-label1">Short By :</label>
            <select className="select-history1">
              <option value="">Default</option>
              <option value="">Trending</option>
              <option value="">Featured</option>
              <option value="">Recommend</option>
            </select>
          </div>
        </div>
        <div className="category-list">
          <div className="category-data">
            <div className="category-top">
              <img src={dairy} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product6} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product7} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product8} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product9} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product10} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product11} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product12} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product1} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product7} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={dairy} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product9} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product10} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product8} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product5} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product4} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product3} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product2} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
          <div className="category-data">
            <div className="category-top">
              <img src={product1} alt="" />
              <div className="category-body">
                <a href="..."><i><FontAwesomeIcon icon={faLink} className="category-icons" /></i></a>
              </div>
            </div>
            <div className="category-bottom">
              <h4>Dairy Items</h4>
              <p>(25 items)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
