import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/admin/addProduct.css";

import upload from "../../../src/assets/images/AddProduct/upload.png";
// import ipay from "../../../src/assets/images/AddProduct/applepay.svg";
// import bpay from "../../../src/assets/images/AddProduct/bitpay.svg";
// import gpay from "../../../src/assets/images/AddProduct/googlepay.svg";
// import mcpay from "../../../src/assets/images/AddProduct/mc.svg";
// import paypalpay from "../../../src/assets/images/AddProduct/paypal.svg";
// import vpay from "../../../src/assets/images/AddProduct/visa.svg";
import AdminHeader, { useOffCanvasContext } from "../../components/admin/adminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import footimg from "../../../src/assets/images/footer-img/back-faq.jpg";
import ProductCard from "../../pages/user/productCard";

export default function AddProductdata() {
  const { showOffCanvas } = useOffCanvasContext();
  const [preImage, setPreImage] = useState(null);
  const [ArrayOfimages, setArrayOfImages] = useState([]);
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);
  const [imageSlider, setImageSlider] = useState([]);
  const [rating, setRating] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [sale, setSale] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [featuredItems, setFeaturedItems] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get-productDetails`)
      .then((response) => {
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [setProductDetails]);

  // productDetails.map((product) => {
  //   console.log(product.image);
  // });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    if (file) {
      setPreImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };
  const handleImageSliderChange = (e) => {
    const fileList = e.target.files;
    const ArrayoffilleList = Array.from(fileList);
    console.log(ArrayoffilleList);
    setImageSlider(ArrayoffilleList);
    const newImages = ArrayoffilleList.map((file) => URL.createObjectURL(file));
    setArrayOfImages(newImages);
    console.log(fileList);
  };
  const handlePublish = () => {
    handleSubmit();
    successNotify();
  };

  const successNotify = () => {
    toast.success("Product successfully Published ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setPreImage(null);
    setArrayOfImages([upload, upload, upload, upload]);
    setFileName("");
    setImage(null);
    setImageSlider([]);
    setRating("");
    setProductName("");
    setProductDescription("");
    setOldPrice("");
    setNewPrice("");
    setSale(false);
    setNewProduct(false);
    setFeaturedItems(false);
    setDiscountPercentage("");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("rating", rating);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("oldPrice", oldPrice);
    formData.append("newPrice", newPrice);
    formData.append("discountPercentage", discountPercentage);
    formData.append("sale", sale);
    formData.append("newProduct", newProduct);
    formData.append("featuredItems", featuredItems);

    imageSlider.forEach((image) => {
      formData.append("imageSlider", image);
    });
    console.log(Object.fromEntries(formData));

    try {
      axios.post("http://localhost:8000/post-productDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  const handleReset = () => {
    setPreImage(null);
    setArrayOfImages([]);
    setFileName("");
    setImage(null);
    setImageSlider([]);
    setRating("");
    setProductName("");
    setProductDescription("");
    setOldPrice("");
    setNewPrice("");
    setSale(false);
    setNewProduct(false);
    setFeaturedItems(false);
    setDiscountPercentage("");
  };
  return (
    <>
      <AdminHeader />
      <form action="reset">
        <div className={`adddata ${showOffCanvas ? "content-shifted" : ""} `} style={{ padding: "20px" }}>
          <div>
            <div className="head1">
              <h6>Add New</h6>
            </div>
            <div className="add-image-title">
              <p>Create Product</p>
              {/* <div className="panel">
               <div className="image-upload-box">
                <div className="image-box">
                  <img src={preImage ? preImage : upload} alt="" className="center-image" />
                </div>
              </div>
              </div>
            <div className="ImageFileName">
              <p>{fileName}</p>
            </div>
            <div className="imageInputFiled">
              <input type="file" onChange={handleImageChange} accept="image/*" name="category-image" id="category-image" multiple style={{ display: "none", border: "lightgray" }} />
            </div> */}

              {/* <div className="ImageSliderUpload">
                <p>Product Image Slider</p>

                <div className="image-grid">
                  {ArrayOfimages.map((image, index) => (
                    <div className="image-upload-box">
                      <div className="image-box">
                        <img key={index} src={image ? image : upload} alt={`product ${index + 1}`} className="center-image" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="imageInputFiled">
                  <label htmlFor="multi-file-upload">Select Images</label>
                  <input type="file" id="multi-file-upload" style={{ display: "none" }} onChange={handleImageSliderChange} accept="image/*" multiple />
                </div>
              </div> 
            </div> */}
              {/* <div>
              <p>Product Image Slider</p>

              <div className="image-grid">
                {ArrayOfimages.map((image, index) => (
                  <div className="image-upload-box">
                    <div className="image-box">
                      <img key={index} src={image ? image : upload} alt={`product ${index + 1}`} className="center-image" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="imageInputFiled">
                <label htmlFor="multi-file-upload">Select Images</label>
                <input type="file" id="multi-file-upload" style={{ display: "none" }} onChange={handleImageSliderChange} accept="image/*" multiple />
              </div>
            </div> */}
              {/* <div className="cont-attribute">
                <div className="pu-attribute">
                  <div className="pu-attribute-input">
                    <p>Attributes</p>
                    <select className="select-wid" name="cars" id="cars">
                      <option value="volvo">Simple Product</option>
                      <option value="saab">Grouped Product</option>
                      <option value="opel">Variable Product</option>
                      <option value="audi">Services product</option>
                    </select>
                  </div>
                  <div className="rating">
                    <p>Rating*</p>
                    <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                  </div>
                </div>
              </div> */}

              <div className="user-product">
                <div className="label-id">
                  <div className="user-product-input">
                    <p>Attributes</p>
                    <select className="select-wid" name="cars" id="cars">
                      <option value="volvo">Simple Product</option>
                      <option value="saab">Grouped Product</option>
                      <option value="opel">Variable Product</option>
                      <option value="audi">Services product</option>
                    </select>
                  </div>
                  <div className="user-product-input">
                    <p>Rating*</p>
                    <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} />
                  </div>
                </div>
                <div className="label-id">
                  <div class="user-product-input">
                    <label>Product Title*</label>
                    <input type="text" placeholder="Enter Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                  </div>
                  <div className="user-product-input">
                    <label>Old Price*</label>
                    <input type="text" placeholder="Enter Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} required></input>
                  </div>
                  <div className="user-product-input">
                    <label>New Price*</label>
                    <input type="text" placeholder="Enter New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required></input>
                  </div>
                </div>
                <div className="label-id">
                  <div className="user-product-input">
                    <label>setSale*</label>
                    <select className="select-wid" name="car" id="car" onChange={(e) => setSale(e.target.value === "true")}>
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </div>
                  <div className="user-product-input">
                    <label>setNew*</label>
                    <select className="select-wid" name="cas" id="cas" onChange={(e) => setNewProduct(e.target.value === "true")}>
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </div>
                </div>
                <div className="label-id">
                  <div className="user-product-input label-id-input">
                    <label>Discount Percentage*</label>
                    <input type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} required></input>
                  </div>
                  <div className="user-product-input">
                    <label>FeaturedItems*</label>
                    <select className="select-wid" name="car" id="car" onChange={(e) => setFeaturedItems(e.target.value === "true")}>
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <p htmlFor="">Main Image</p>
                <div className="label-id" style={{ borderColor: "#F0F4F8", height: "28vh" }}>
                  <div className="image-input">
                    <div>
                      <label htmlFor="category-image">
                        <span style={{ fontSize: "256%" }}>
                          <FontAwesomeIcon icon={faCloudArrowUp} className="fonticon" />
                        </span>
                        <br />
                        <span>
                          <span style={{ color: "#009f7f" }}>Drag and drop your product images or browse your product images</span>
                        </span>
                      </label>
                    </div>
                    <div className="imageInputFiled">
                      <input type="file" onChange={handleImageChange} accept="image/*" name="category-image" id="category-image" style={{ display: "none", border: "lightgray" }} required />
                    </div>
                    <div className="image-box">
                      <img src={preImage ? preImage : upload} alt="" className="center-image" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p htmlFor="">Model Multi Image</p>
                <div className="" style={{ borderColor: "#F0F4F8" }}>
                  <div className="image-input multiImg" style={{ height: "25vh" }}>
                    <div>
                      <label htmlFor="multi-file-upload">
                        <span style={{ fontSize: "256%" }}>
                          <FontAwesomeIcon icon={faCloudArrowUp} />
                        </span>
                        <br />
                        <span>
                          <span style={{ color: "#009f7f" }}>Drag and drop your product images or browse your product images</span>
                        </span>
                      </label>
                      <div className="imageInputFiled">
                        <input type="file" name="multi-file-upload" id="multi-file-upload" style={{ cursor: "pointer", display: "none" }} onChange={handleImageSliderChange} accept="image/*" multiple required />
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
                <div className="image-grid-multi">
                  {ArrayOfimages.map((image, index) => (
                    <div className="image-upload-box">
                      <div className="imgborder">
                        <div className="image-box-multi">
                          <img key={index} src={image ? image : upload} alt={`product${index + 1}`} className="center-image"></img>
                        </div>
                        <div className="imgbutton">
                          <button>delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="label-id">
                <div className="user-product-input">
                  <p htmlFor="reset">Description*</p>
                  <textarea name="details" id="details" style={{ paddingLeft: "10px" }} cols="10" rows="5" placeholder="Enter Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required></textarea>
                </div>
              </div>
              {/* <div className="label-id payment-images">
              <div className="user-product-input label-id-input">
                <label>Payment Methods</label>
                <div className="payment-option">
                  <div className="payments">
                    <input class="hidden" type="radio" id="" value={""}></input>
                    <img src={ipay} alt="" width={"40px"} />
                  </div>
                  <div className="payments">
                    <input class="hidden" type="radio" id="" value={""}></input>
                    <img src={gpay} alt="" width={"40px"} />
                  </div>
                  <div className="payments">
                  <input class="hidden" type="radio" id="" value={""}></input>
                  <img src={bpay} alt="" width={"40px"} />
                </div>
                  <div className="payments">
                  <input class="hidden" type="radio" id="" value={""}></input>
                  <img src={paypalpay} alt="" width={"40px"} />
                </div>
                  <div className="payments">
                    <input class="hidden" type="radio" id="" value={""}></input>
                    <img src={vpay} alt="" width={"40px"} />
                  </div>
                  <div className="payments">
                  <input class="hidden" type="radio" id="" value={""}></input>
                  <img src={mcpay} alt="" width={"40px"} />
                </div>
                </div>
              </div>
            </div> */}
              <div className="products-button">
                <div className="pro-btn">
                  <button onClick={handleReset}>Reset</button>
                </div>
                <div className="pro-btn">
                  <button onClick={handlePublish}>Publish</button>
                </div>
              </div>
            </div>
            {/* <div className="product-preview ">
            <div className="previewproduct">
              <div>
                <label htmlFor="">Product card Preview</label>
              </div>
              <div className="imgview">
                <img src={footimg} alt="" style={{ width: '100%', height: '25%' }} />
                <div>
                  <h5 className="newprice">$20.00 </h5><span className="oldprice">$25.00</span>
                </div>
                <div className="pro-btn">
                  <button >Draft</button>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
