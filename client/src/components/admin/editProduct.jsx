import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/admin/addProduct.css";
import uploadImage from "../../../src/assets/images/AddProduct/upload.png";
import AdminHeader, { useOffCanvasContext } from "../../components/admin/adminHeader";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uploa from "../../../src/assets/images/AddProduct/upload.png";

const EditProduct = () => {
  const imageDiv = {
    width: "150px",
    height: "170px",
    border: "2px solid black",
    borderRadius: "10px",
    marginTop: "10px",
  };

  const imageDivModal = {
    width: "130px",
    height: "150px",
    border: "1px solid green",
    padding: "5px",
    borderRadius: "10px",
    marginTop: "10px",
    cursor: "pointer",
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);
  const [onChangeImage2, setOnChangeImage2] = useState(null);
  const [onChangeImage, setOnChangeImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const { showOffCanvas } = useOffCanvasContext();
  const [upload, setUpload] = useState("");
  const [preImage, setPreImage] = useState(null);
  const [ArrayOfimages, setArrayOfImages] = useState([uploadImage, uploadImage, uploadImage, uploadImage]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
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
  const [productDetails, setProductDetails] = useState([]);
  const [productID, setProductID] = useState("");
  const location = useLocation();
  const { product } = location.state || {};
  //   console.log(product);

  useEffect(() => {
    if (product) {
      setRating(product.rating);
      setProductName(product.productName);
      setProductDescription(product.productDescription);
      setOldPrice(product.oldPrice);
      setNewPrice(product.newPrice);
      setDiscountPercentage(product.discountPercentage);
      setUpload(product.image);
      const SliderImages = product.imageSlider.map((image) => image);
      setArrayOfImages(SliderImages);
      setSale(product.sale);
      setNewProduct(product.newProduct);
      setFeaturedItems(product.featuredItems);
      setProductID(product._id);
      setFileName(product.image);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
    console.log(productID);
    if (file) {
      setPreImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
    const formData = new FormData();
    formData.append("mainImage", file);
    try {
      axios.put(`http://localhost:8000/edit-productMainImage/${productID}`, formData).then((res) => {
        console.log(res.data.image);
        setFileName(res.data.image);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImages = (e, id) => {
    const fileList = e.target.files;
    const ArrayoffilleList = Array.from(fileList);
    console.log(ArrayoffilleList);
    console.log(id);

    const formData = new FormData();
    ArrayoffilleList.forEach((image) => {
      formData.append("imageSlider", image);
    });
    console.log(Object.fromEntries(formData));
    try {
      axios
        .put(`http://localhost:8000/update-ProductSliderImage/${productID}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.imageSlider);
          setArrayOfImages(response.data.imageSlider);
        });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    // formData.append("image", image);
    // formData.append("upload", upload);
    formData.append("rating", rating);
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("oldPrice", oldPrice);
    formData.append("newPrice", newPrice);
    formData.append("discountPercentage", discountPercentage);
    formData.append("sale", sale);
    formData.append("newProduct", newProduct);
    formData.append("featuredItems", featuredItems);

    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    console.log(formDataObject);
    axios
      .put(`http://localhost:8000/update-productDetails/${productID}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditProduct = () => {
    handleSubmit();
    successNotify();
  };

  const successNotify = () => {
    toast.success("Product Edited Successfully ", {
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

  const handleImageDelete = async (deleteImage, id, index) => {
    setArrayOfImages((ArrayOfimage) => ArrayOfimage.filter((image) => image !== deleteImage));
    console.log(deleteImage);
    console.log(id);
    console.log(index);
    try {
      await axios.delete(`http://localhost:8000/delete-productSliderImage/${id}/${index}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAll = (id) => {
    try {
      axios.delete(`http://localhost:8000/delete-allSliderImage/${id}`);
      setArrayOfImages([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditButton = (img, ind) => {
    console.log(img);
    console.log(ind);
    setDisplayImage(true);
    setEditIndex(ind);
    setOnChangeImage(img);
  };

  const handleEditSubmit = (id) => {
    const formData = new FormData();
    formData.append("multipleFileEdit", onChangeImage2);
    console.log(id);

    axios
      .put(`http://localhost:8000/edit-SliderImage/${id}/${editIndex}`, formData)
      .then((res) => {
        console.log(res.data.message);
        setArrayOfImages(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    setDisplayImage(false);
    setOnChangeImage("");
  };

  return (
    <>
      <AdminHeader />
      <div className={`adddata ${showOffCanvas ? "content-shifted" : ""} `} style={{ padding: "20px" }}>
        <div>
          <div className="head1">
            <h6>Product Settings</h6>
          </div>
          <div className="add-image-title">
            {/* <p>Product Images</p> */}
            {/* <div className="panel">
              <div className="image-upload-box">
                <div className="image-box">{image ? <img src={preImage} alt={`product 2`} className="center-image" /> : <img src={`http://localhost:8000/uploads/productImage/${upload}`} alt={`product 2`} className="center-image" />}</div>
              </div>
              <div className="ImageFileName">{<p>{fileName}</p>}</div>
              <div className="imageInputFiled">
                <label htmlFor="file-upload">Add New Image</label>
                <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleImageChange} accept="image/*" />
              </div>
              <div className="ImageSliderUpload">
                <p>Product Image Slider</p>

                <div className="image-grid">
                  {ArrayOfimages.map((image, index) => (
                    <div>
                      <div className="image-upload-box">
                        <div className="image-box">
                          <div className="image-box">{image && <img src={`http://localhost:8000/uploads/productImage/${image}`} alt={`product 1`} className="center-image" />}</div>
                        </div>
                      </div>
                      <div className="ImageFileName">
                        <p>{image}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="imageInputFiled">
                  <button className="Delete-button" onClick={handleShowDeleteModal}>
                    Delete
                  </button>
                  <button className="Delete-button edit" onClick={handleShowEditModal}>
                    Edit
                  </button>
                  <label htmlFor="add-multi-file-upload">Add Images</label>
                  <input type="file" id="add-multi-file-upload" style={{ display: "none" }} onChange={(e) => handleAddImages(e, productID)} accept="image/*" multiple />
                </div>
              </div>
            </div> */}
            <br />
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
                  <div className="image-box">{image ? <img src={preImage} alt={`product 2`} className="center-image" /> : <img src={`http://localhost:8000/uploads/productImage/${upload}`} alt={`product 2`} className="center-image" />}</div>
                </div>
              </div>
            </div>
            <div className="ImageSliderUpload">
              <p>Model Multi Image</p>
              <div style={{ border: "1px solid lightgray", borderRadius: "8px" }}>
                <div className="image-grid-multi">
                  {ArrayOfimages.map((image, index) => (
                    <div>
                      <div className="image-upload-box">
                        <div className="imgborder">
                          <div className="image-box-multi">{image && <img src={`http://localhost:8000/uploads/productImage/${image}`} alt={`product 1`} className="center-image" />}</div>
                        </div>
                      </div>
                      {/* <div className="ImageFileName">
                        <p>{image}</p>
                      </div> */}
                    </div>
                  ))}
                </div>
                <div className="imageInputFiled" style={{ justifyContent: "center", textAlign: "center" }}>
                  <button className="Delete-button" onClick={handleShowDeleteModal}>
                    Delete
                  </button>
                  <button className="Delete-button edit" onClick={handleShowEditModal}>
                    Edit
                  </button>
                  <label htmlFor="add-multi-file-upload">Add Images</label>
                  <input type="file" id="add-multi-file-upload" style={{ display: "none" }} onChange={(e) => handleAddImages(e, productID)} accept="image/*" multiple />
                </div>
              </div>
            </div>

            <div className="label-id">
              <div className="user-product-input">
                <p htmlFor="">Description*</p>
                <textarea name="details" id="details" style={{ paddingLeft: "10px" }} cols="10" rows="5" placeholder="Enter Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required></textarea>
              </div>
            </div>
            <div className="products-button">
              <div className="pro-btn">
                <button type="reset">Cancel</button>
              </div>
              <div className="pro-btn">
                <button onClick={""}>Save</button>
              </div>
            </div>

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
              <div class="description-box">
                <p>Product Name*</p>
                <input type="text" placeholder="Enter Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
              </div>
            </div> */}
          </div>
          <br />
          {/* <div className="user-product">
            <div className="user-product-input pro-in">
              <label className="user-product-label">Description*</label>
              <input type="text" placeholder="Enter Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></input>
            </div>
            <div className="label-id">
              <div className="user-product-input label-id-input">
                <label>Brand Name</label>
                <input type="text" placeholder="Enter Brand Name"></input>
              </div>
              <div className="user-product-input">
                <label>Category</label>
                <select className="select-wid" name="car" id="car">
                  <option value="volvo">Electric</option>
                  <option value="saab">Grocery</option>
                  <option value="opel">Steel</option>
                  <option value="audi">Services</option>
                </select>
              </div>
            </div>
            <div className="label-id">
              <div className="user-product-input">
                <label>Old Price*</label>
                <input type="text" placeholder="Enter Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}></input>
              </div>
              <div className="user-product-input">
                <label>New Price*</label>
                <input type="text" placeholder="Enter New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)}></input>
              </div>
            </div>
            <div className="label-id">
              <div className="user-product-input label-id-input">
                <label>Schedule</label>
                <input type="date"></input>
              </div>
              <div className="user-product-input">
                <label>setSale*</label>
                <select className="select-wid" name="car" id="car" value={sale} onChange={(e) => setSale(e.target.value === "true")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </div>
            <div className="label-id">
              <div className="user-product-input">
                <label>setNew*</label>
                <select className="select-wid" name="cas" id="cas" value={newProduct} onChange={(e) => setNewProduct(e.target.value === "true")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="user-product-input">
                <label>FeaturedItems*</label>
                <select className="select-wid" name="car" id="car" value={featuredItems} onChange={(e) => setFeaturedItems(e.target.value === "true")}>
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </div>
            <div className="label-id">
              <div className="user-product-input label-id-input">
                <label>Discount Percentage*</label>
                <input type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)}></input>
              </div>
              <div className="user-product-input">
                <label>Status</label>
                <select className="select-wid" name="car" id="car">
                  <option value="volvo">Completed</option>
                  <option value="saab">Pending</option>
                  <option value="opel">OnProcess</option>
                </select>
              </div>
            </div>

            <div className="products-button">
              <div className="pro-btn">
                <button>Save to Drafts</button>
              </div>
              <div className="pro-btn">
                <button onClick={handleEditProduct}>Edit Product</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
            <div style={{ display: "flex", overflowX: "scroll", width: "90%" }}>
              {ArrayOfimages.map((image, index) => (
                <div style={{ padding: "10px" }}>
                  <img src={`http://localhost:8000/uploads/productImage/${image}`} alt={`product 1`} style={imageDivModal} />
                  <button className="imageDeleteButton" onClick={() => handleImageDelete(image, productID, index)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "red" }} onClick={() => handleDeleteAll(productID)}>
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
            <div style={{ display: "flex", overflowX: "scroll", width: "90%" }}>
              {ArrayOfimages.map((image, index) => (
                <div style={{ padding: "10px" }}>
                  <img src={`http://localhost:8000/uploads/productImage/${image}`} alt={`product 1`} style={imageDivModal} />
                  <button
                    className="imageDeleteButton"
                    onClick={() => {
                      handleEditButton(image, index);
                      setDisplayImage(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
          {displayImage === true ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", padding: "20px", border: "1px solid black" }}>
              <div>
                <div>
                  <input
                    type="file"
                    onChange={(e) => {
                      setOnChangeImage2(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  ></input>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button type="button" onClick={() => handleEditSubmit(productID)} style={{ marginTop: "20px", width: "100px", backgroundColor: "green", color: "#fff" }}>
                    Upload
                  </button>
                </div>
              </div>
              <div>
                <img src={onChangeImage2 === null ? `http://localhost:8000/uploads/productImage/${onChangeImage}` : URL.createObjectURL(onChangeImage2)} style={{ width: "100px", height: "100px", border: "2px solid black" }} alt="updateImage"></img>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button style={{ backgroundColor: "red" }} onClick={() => handleDeleteAll(productID)}>
            Delete All
          </Button> */}
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
