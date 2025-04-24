import React, { useEffect, useState } from "react";
import "../../styles/admin/dashboard.css";
import greenyIcon from "../../assets/images/logo.png";
import AdminHeader, { useOffCanvasContext } from "../../components/admin/adminHeader";
// import * as AiIcons from "react-icons/ai";
import ordercomplete from "../../../src/assets/images/AddProduct/ordercompleted.png";
import orderpending from "../../../src/assets/images/AddProduct/pending.png";
import ordercancel from "../../../src/assets/images/AddProduct/cancel.png";
import totalorder from "../../../src/assets/images/AddProduct/totalorders.png";
import dispatch from "../../../src/assets/images/AddProduct/dispatch.png";
import wallet from "../../../src/assets/images/AddProduct/wallet.png";
import user from "../../../src/assets/images/AddProduct/user.png";
import product from "../../../src/assets/images/AddProduct/totalproduct.png";
import axios from "axios";

function Dashboard() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const categoriesPerPage = rowsPerPage;

  const [orderDetailsCount, setOrderDetailsCount] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [dispatchCount, setDispatchCount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:8000/getOrderDetails")
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
    axios
      .get(`http://localhost:8000/get-productDetails`)
      .then((response) => {
        setTotalProduct(response.data.data.length);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);
  useEffect(() => {
    let pending = 0;
    let complete = 0;
    let dispatch = 0;
    let count = 0;

    orderDetails.forEach((order) => {
      count++;
      if (order.pending) pending++;
      if (order.complete) complete++;
      if (order.dispatch) dispatch++;
    });
    setOrderDetailsCount(count);
    setPendingCount(pending);
    setCompleteCount(complete);
    setDispatchCount(dispatch);
  }, [orderDetails]);
  const categories = [];

  const loopList = () => {
    for (var i = 1; i < 30; i++) {
      categories.push({
        id: i,
        name: "Fruits",
        details: "healthy",
        icon: greenyIcon,
        group: "Groceries",
      });
    }
  };
  loopList();

  // const indexOfLastCategory = currentPage * categoriesPerPage;
  // const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  // const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleRowsPerPageChange = (event) => {
  // 	setRowsPerPage(Number(event.target.value));
  // 	setCurrentPage(1);
  // };
  const { showOffCanvas } = useOffCanvasContext();

  //   let valueDisplay = document.querySelectorAll(".num");
  //   let interval = 1000;

  //   valueDisplay.forEach((valueDisplay) => {
  //     let startValue = 0;
  //     let endValue = parseInt(valueDisplay.getAttribute("value"));
  //     let duration = Math.floor(interval / endValue);
  //     let counter = setInterval(function () {
  //       startValue += 1;
  //       valueDisplay.textContent = startValue;
  //       if (startValue === endValue) {
  //         clearInterval(counter);
  //       }
  //     }, duration);
  //   });

  return (
    <>
      <AdminHeader />
      <div className={`orderList-container ${showOffCanvas ? "content-shifted" : ""} `}>
        <div className="dashboard-card">
          <div className="dashboard-body-item4">
            <div className="body-cards">
              <div className="ordericon">
                <img src={totalorder} alt="" />
              </div>
              <span className="num" value={orderDetailsCount}>
                {orderDetailsCount}
              </span>
              <h6>Total Order</h6>
            </div>
          </div>
          <div className="dashboard-body-item3">
            <div className="body-cards">
              <div className="ordericon">
                <img src={orderpending} alt="" />
              </div>
              <span className="num" value="40">
                {pendingCount}
              </span>
              <h6>Pending Order</h6>
            </div>
          </div>
          <div className="dashboard-body-item5">
            <div className="body-cards">
              <div className="ordericon">
                <img src={dispatch} alt="" />
              </div>
              <span className="num" value="240">
                {dispatchCount}
              </span>
              <h6>Dispatch Order</h6>
            </div>
          </div>
          <div className="dashboard-body-item2">
            <div className="body-cards">
              <div className="ordericon">
                <img src={ordercancel} alt="" />
              </div>
              <span className="num" value="100">
                00
              </span>
              <h6>Cancel Order</h6>
            </div>
          </div>
          <div className="dashboard-body-item1">
            <div className="body-cards">
              <div className="ordericon">
                <img src={ordercomplete} alt="" />
              </div>
              <span className="num" value="350">
                {completeCount}
              </span>
              <h6>Completed Order</h6>
            </div>
          </div>
          <div className="dashboard-body-item6">
            <div className="body-cards">
              <div className="ordericon">
                <img src={wallet} alt="" />
              </div>
              <span className="num" value="400">
                00
              </span>
              <h6>Wallet Amount</h6>
            </div>
          </div>
          <div className="dashboard-body-item7">
            <div className="body-cards">
              <div className="ordericon">
                <img src={user} alt="" />
              </div>
              <span className="num" value="32">
                00
              </span>
              <h6>Registerd User</h6>
            </div>
          </div>
          <div className="dashboard-body-item8">
            <div className="body-cards">
              <div className="ordericon">
                <img src={product} alt="" />
              </div>
              <span className="num" value="600">
                {totalProduct}
              </span>
              <h6>Total Products</h6>
            </div>
          </div>
        </div>

        {/* <div className="category-table-page">
					<div className="rows-per-page-dropdown">
						<label htmlFor="rowsPerPage">Rows per page:</label>
						<select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange}>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
						</select>
					</div>
					<table className="category-table">
						<thead>
							<tr>
								<th className="table-header">ID</th>
								<th className="table-header">Name</th>
								<th className="table-header">Details</th>
								<th className="table-header">Icon</th>
								<th className="table-header">Group</th>
								<th className="table-header">Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentCategories.map((category) => (
								<tr key={category.id}>
									<td className="category-id">{category.id}</td>
									<td>{category.name}</td>
									<td>{category.details}</td>
									<td>
										<img src={category.icon} alt={`${category.name} Icon`} className="category-icon" />
									</td>
									<td>{category.group}</td>
									<td>
										<button className="edit-button">Edit</button>
										<button className="delete-button">Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<div className="rows-per-page-container">
						<ul className="pagination">
							{Array.from({ length: Math.ceil(categories.length / rowsPerPage) }, (_, i) => (
								<li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
									<button onClick={() => paginate(i + 1)} className="page-link">
										{i + 1}
									</button>
								</li>
							))}
						</ul>
					</div>
				</div> */}
      </div>
    </>
  );
}

export default Dashboard;
