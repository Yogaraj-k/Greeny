import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminHeader, { useOffCanvasContext } from "../../components/admin/adminHeader";
import "../../styles/admin/allProducts.css";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
const AllProducts = () => {
  const navigate = useNavigate();
  const { showOffCanvas } = useOffCanvasContext();
  const [productDetails, setProductDetails] = useState([]);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get-productDetails`)
      .then((response) => {
        setProductDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  // productDetails.map((product) => {
  //   console.log(product);
  // });

  const handleProductDelete = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`http://localhost:8000/delete-productDetails/${id}`);
      console.log(res.data);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductEdit = async (product) => {
    try {
      console.log(product);
      // setProductName(product.productName);
      navigate("/admin/editProduct", { state: { product } });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className={`allProducts ${showOffCanvas ? "content-shifted" : ""} `} style={{ padding: "20px" }}>
        <div className="product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Product</th>
                <th>Product Name</th>
                <th>Old Price</th>
                <th>New Price</th>
                <th>Rating</th>
                <th>Discount Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((product, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`http://localhost:8000/uploads/productImage/${product.image}`} alt="product" />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.oldPrice}</td>
                  <td>{product.newPrice}</td>
                  <td>{product.rating}</td>
                  <td>{product.discountPercentage}</td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="product-edit" onClick={() => handleProductEdit(product)} />
                    <FontAwesomeIcon icon={faTrash} className="product-delete" onClick={() => handleProductDelete(product._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
