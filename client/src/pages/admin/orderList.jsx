import "../../styles/admin/orderList.css";
// import products from "../../pages/user/productList";
import { completedOrders, pendingOrders, canceledOrders } from "../../pages/user/productList";
import AdminHomePage from "../../components/admin/adminHeader";
import { Modal, Button } from "react-bootstrap";
import { useOffCanvasContext } from "../../components/admin/adminHeader";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
const getStatusColor = (status) => {
  let statusColor;

  switch (status) {
    case "Complete":
      statusColor = "green";
      break;
    case "Pending":
      statusColor = "orange";
      break;
    case "Cancelled":
      statusColor = "red";
      break;
    default:
      statusColor = "red";
  }

  return {
    backgroundColor: statusColor,
    color: "white",
    padding: "5px 7px",
    borderRadius: "5px",
    margin: "0px 10px",
    cursor: "pointer",
  };
};
const getStatusLabel = (pending, dispatch, complete) => {
  if (pending) {
    return <span style={{ color: "orange" }}>Pending</span>;
  } else if (dispatch) {
    return <span style={{ color: "orange" }}>Dispatch</span>;
  } else if (complete) {
    return <span style={{ color: "orange" }}>complete</span>;
  } else {
    return <span style={{ color: "green" }}>New Order</span>;
  }
};
const YourOrders = () => {
  const [order, setOrder] = useState([]);
  const [acceptedOrder, setAcceptOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailArray, setProductDetailArray] = useState([]);
  const [orderID, setOrderID] = useState([]);
  const [showAcceptModal, setAcceptModal] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);

  const handleAccept = (order) => {
    setAcceptOrder(order);
    setAcceptModal(true);
  };
  const handleCancelModel = (order) => {
    setAcceptOrder(order);
    setCancelModal(true);
  };
  const handleCancelConfirm = () => {
    console.log(acceptedOrder._id);
    const orderId = acceptedOrder._id;

    try {
      axios.put(`http://localhost:8000/editCancelOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setCancelModal(false);
  };
  const handleConfirm = () => {
    console.log(acceptedOrder._id);
    const orderId = acceptedOrder._id;

    try {
      axios.put(`http://localhost:8000/editOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setAcceptModal(false);
  };

  const handleCancel = () => {
    setAcceptModal(false);
    setCancelModal(false);
  };

  const handleShowModal = (order) => {
    console.log(order.productDetails);
    setOrderID(order.orderId);
    setProductDetailArray(order.productDetails);
    setShowModal(true);
  };
  let responseUserArray = [];
  useEffect(() => {
    productDetailArray.map((product) => {
      try {
        const response = axios.get(`http://localhost:8000/get-userDetails/${product.productdetail}`).then((response) => {
          // console.log(response.data.data);
          const productResponse = response.data.data;
          const userItem = {
            productdetail: productResponse,
            quantity: product.quantity,
          };
          // responseUserArray.push(userItem);
          setProductDetails((product) => [...product, userItem]);
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    });
  }, [productDetailArray]);
  console.log(productDetails);

  const handleCloseModal = () => {
    setShowModal(false);
    setProductDetails([]);
    setProductDetailArray([]);
  };
  const fetchOrderDetails = () => {
    axios
      .get("http://localhost:8000/getOrderDetails")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const { showOffCanvas } = useOffCanvasContext();

  return (
    <>
      <AdminHomePage />
      <div className={`orderList-container ${showOffCanvas ? "content-shifted" : ""} `}>
        <table className="orderList-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Order ID</th>
              <th>Product </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Price</th>
              <th>Accept</th>
              <th>Cancel</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr key={index + 1}>
                <td>
                  <p>{index + 1}</p>
                </td>
                <td>
                  <p>{order.orderId}</p>
                </td>
                <td>{order.productDetails.length}</td>
                <td>
                  {order.userDetails.map((user) => (
                    <p>{user.name}</p>
                  ))}
                </td>
                <td>
                  {order.userDetails.map((user) => (
                    <p>{user.email}</p>
                  ))}
                </td>
                <td>
                  <p>{order.paymentDate}</p>
                </td>
                <td>${order.amount}</td>
                <td className="orderList-status">
                  <div className="status">
                    {order.pending || order.dispatch || order.complete ? (
                      <span> Already Accepted</span>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => {
                          handleAccept(order);
                        }}
                      >
                        Accept
                      </Button>
                    )}
                  </div>
                </td>
                <td className="orderList-status">
                  <div className="status">
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleCancelModel(order);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </td>
                <td>{getStatusLabel(order.pending, order.dispatch, order.complete)}</td>
                <td>
                  <FaEye
                    onClick={() => {
                      handleShowModal(order);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Payment ID : {orderID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderList-container modelTable">
            <table className="orderList-table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Product </th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="product" />
                    </td>
                    <td>
                      <p>{product.productdetail.productName}</p>
                    </td>
                    <td>
                      <p>{product.quantity}</p>
                    </td>
                    <td>
                      <p>{product.productdetail.newPrice}</p>
                    </td>
                    <td>${product.productdetail.newPrice * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                      <Button variant="secondary" className="green-background-button">
                        Close
                      </Button>
                    </Modal.Footer> */}
      </Modal>
      <Modal show={showAcceptModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Acceptance Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to accept this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCancelModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleCancelConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const PendingOrders = () => {
  const [pendingOrder, setPendingOrder] = useState([]);
  const [dispatchOrder, setDispatchOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailArray, setProductDetailArray] = useState([]);
  const [orderID, setOrderID] = useState([]);
  const [showDispatchModal, setDispatchModal] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);

  const handleDispatch = (order) => {
    setDispatchOrder(order);
    setDispatchModal(true);
  };
  const handleCancelModel = (order) => {
    setDispatchOrder(order);
    setCancelModal(true);
  };
  const handleCancelConfirm = () => {
    console.log(dispatchOrder._id);
    const orderId = dispatchOrder._id;

    try {
      axios.put(`http://localhost:8000/editDispatchCancelOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setCancelModal(false);
  };
  const handleConfirm = () => {
    console.log(dispatchOrder._id);
    const orderId = dispatchOrder._id;

    try {
      axios.put(`http://localhost:8000/editDispatchOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setDispatchModal(false);
  };

  const handleCancel = () => {
    setDispatchModal(false);
    setCancelModal(false);
  };

  const handleShowModal = (order) => {
    console.log(order.productDetails);
    setOrderID(order.orderId);
    setProductDetailArray(order.productDetails);
    setShowModal(true);
  };
  let responseUserArray = [];
  useEffect(() => {
    productDetailArray.map((product) => {
      try {
        const response = axios.get(`http://localhost:8000/get-userDetails/${product.productdetail}`).then((response) => {
          // console.log(response.data.data);
          const productResponse = response.data.data;
          const userItem = {
            productdetail: productResponse,
            quantity: product.quantity,
          };
          // responseUserArray.push(userItem);
          setProductDetails((product) => [...product, userItem]);
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    });
  }, [productDetailArray]);
  console.log(productDetails);

  const handleCloseModal = () => {
    setShowModal(false);
    setProductDetails([]);
    setProductDetailArray([]);
  };
  const fetchOrderDetails = () => {
    axios
      .get("http://localhost:8000/getOrderDetails")
      .then((response) => {
        setPendingOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const { showOffCanvas } = useOffCanvasContext();

  return (
    <>
      <AdminHomePage />
      <div className={`orderList-container ${showOffCanvas ? "content-shifted" : ""} `}>
        <table className="orderList-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Order ID</th>
              <th>Product </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Price</th>
              <th>Dispatch</th>
              <th>Cancel</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrder.map((order, index) => {
              if (order.pending) {
                return (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p>{order.orderId}</p>
                    </td>
                    <td>{order.productDetails.length}</td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.name}</p>
                      ))}
                    </td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.email}</p>
                      ))}
                    </td>
                    <td>
                      <p>{order.paymentDate}</p>
                    </td>
                    <td>${order.amount}</td>
                    <td className="orderList-status">
                      <div className="status">
                        <Button
                          variant="success"
                          onClick={() => {
                            handleDispatch(order);
                          }}
                        >
                          Dispatch
                        </Button>
                      </div>
                    </td>
                    <td className="orderList-status">
                      <div className="status">
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleCancelModel(order);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "orange" }}>Pending</span>
                    </td>
                    <td>
                      <FaEye
                        onClick={() => {
                          handleShowModal(order);
                        }}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Payment ID : {orderID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderList-container modelTable">
            <table className="orderList-table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Product </th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="product" />
                    </td>
                    <td>
                      <p>{product.productdetail.productName}</p>
                    </td>
                    <td>
                      <p>{product.quantity}</p>
                    </td>
                    <td>
                      <p>{product.productdetail.newPrice}</p>
                    </td>
                    <td>${product.productdetail.newPrice * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                      <Button variant="secondary" className="green-background-button">
                        Close
                      </Button>
                    </Modal.Footer> */}
      </Modal>
      <Modal show={showDispatchModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Acceptance Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to dispatch this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCancelModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleCancelConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DispatchedOrders = () => {
  const [dispatchedOrder, setdispatchedOrder] = useState([]);
  const [CompletedOrder, setCompletedOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailArray, setProductDetailArray] = useState([]);
  const [orderID, setOrderID] = useState([]);
  const [showDispatchModal, setDispatchModal] = useState(false);
  const [showCancelModal, setCancelModal] = useState(false);

  const handleDispatch = (order) => {
    setCompletedOrder(order);
    setDispatchModal(true);
  };
  const handleCancelModel = (order) => {
    setCompletedOrder(order);
    setCancelModal(true);
  };
  const handleCancelConfirm = () => {
    console.log(CompletedOrder._id);
    const orderId = CompletedOrder._id;

    try {
      axios.put(`http://localhost:8000/editCompleteCancelOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setCancelModal(false);
  };
  const handleConfirm = () => {
    console.log(CompletedOrder._id);
    const orderId = CompletedOrder._id;

    try {
      axios.put(`http://localhost:8000/editCompleteOrderDetails/${orderId}`).then((res) => {
        console.log(res.data);
        fetchOrderDetails();
      });
    } catch (error) {
      console.log(error);
    }
    setDispatchModal(false);
  };

  const handleCancel = () => {
    setDispatchModal(false);
    setCancelModal(false);
  };

  const handleShowModal = (order) => {
    console.log(order.productDetails);
    setOrderID(order.orderId);
    setProductDetailArray(order.productDetails);
    setShowModal(true);
  };
  let responseUserArray = [];
  useEffect(() => {
    productDetailArray.map((product) => {
      try {
        const response = axios.get(`http://localhost:8000/get-userDetails/${product.productdetail}`).then((response) => {
          // console.log(response.data.data);
          const productResponse = response.data.data;
          const userItem = {
            productdetail: productResponse,
            quantity: product.quantity,
          };
          // responseUserArray.push(userItem);
          setProductDetails((product) => [...product, userItem]);
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    });
  }, [productDetailArray]);
  console.log(productDetails);

  const handleCloseModal = () => {
    setShowModal(false);
    setProductDetails([]);
    setProductDetailArray([]);
  };
  const fetchOrderDetails = () => {
    axios
      .get("http://localhost:8000/getOrderDetails")
      .then((response) => {
        setdispatchedOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const { showOffCanvas } = useOffCanvasContext();

  return (
    <>
      <AdminHomePage />
      <div className={`orderList-container ${showOffCanvas ? "content-shifted" : ""} `}>
        <table className="orderList-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Order ID</th>
              <th>Product </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Price</th>
              <th>Complete</th>
              <th>Pending</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dispatchedOrder.map((order, index) => {
              if (order.dispatch) {
                return (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p>{order.orderId}</p>
                    </td>
                    <td>{order.productDetails.length}</td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.name}</p>
                      ))}
                    </td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.email}</p>
                      ))}
                    </td>
                    <td>
                      <p>{order.paymentDate}</p>
                    </td>
                    <td>${order.amount}</td>
                    <td className="orderList-status">
                      <div className="status">
                        <Button
                          variant="success"
                          onClick={() => {
                            handleDispatch(order);
                          }}
                        >
                          Complete
                        </Button>
                      </div>
                    </td>
                    <td className="orderList-status">
                      <div className="status">
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleCancelModel(order);
                          }}
                        >
                          Pending
                        </Button>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: "orange" }}>Dispatch</span>
                    </td>
                    <td>
                      <FaEye
                        onClick={() => {
                          handleShowModal(order);
                        }}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Payment ID : {orderID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderList-container modelTable">
            <table className="orderList-table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Product </th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="product" />
                    </td>
                    <td>
                      <p>{product.productdetail.productName}</p>
                    </td>
                    <td>
                      <p>{product.quantity}</p>
                    </td>
                    <td>
                      <p>{product.productdetail.newPrice}</p>
                    </td>
                    <td>${product.productdetail.newPrice * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                      <Button variant="secondary" className="green-background-button">
                        Close
                      </Button>
                    </Modal.Footer> */}
      </Modal>
      <Modal show={showDispatchModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Acceptance Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to dispatch this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCancelModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to make this order pending?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleCancelConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const CompletedOrders = () => {
  const [CompletedOrder, setCompletedOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [productDetailArray, setProductDetailArray] = useState([]);
  const [orderID, setOrderID] = useState([]);

  const handleShowModal = (order) => {
    console.log(order.productDetails);
    setOrderID(order.orderId);
    setProductDetailArray(order.productDetails);
    setShowModal(true);
  };
  let responseUserArray = [];
  useEffect(() => {
    productDetailArray.map((product) => {
      try {
        const response = axios.get(`http://localhost:8000/get-userDetails/${product.productdetail}`).then((response) => {
          // console.log(response.data.data);
          const productResponse = response.data.data;
          const userItem = {
            productdetail: productResponse,
            quantity: product.quantity,
          };
          // responseUserArray.push(userItem);
          setProductDetails((product) => [...product, userItem]);
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    });
  }, [productDetailArray]);
  console.log(productDetails);

  const handleCloseModal = () => {
    setShowModal(false);
    setProductDetails([]);
    setProductDetailArray([]);
  };
  const fetchOrderDetails = () => {
    axios
      .get("http://localhost:8000/getOrderDetails")
      .then((response) => {
        setCompletedOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  const { showOffCanvas } = useOffCanvasContext();

  return (
    <>
      <AdminHomePage />
      <div className={`orderList-container ${showOffCanvas ? "content-shifted" : ""} `}>
        <table className="orderList-table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Order ID</th>
              <th>Product </th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CompletedOrder.map((order, index) => {
              if (order.complete) {
                return (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p>{order.orderId}</p>
                    </td>
                    <td>{order.productDetails.length}</td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.name}</p>
                      ))}
                    </td>
                    <td>
                      {order.userDetails.map((user, idx) => (
                        <p key={idx}>{user.email}</p>
                      ))}
                    </td>
                    <td>
                      <p>{order.paymentDate}</p>
                    </td>
                    <td>${order.amount}</td>

                    <td>
                      <span style={{ color: "orange" }}>Completed</span>
                    </td>
                    <td>
                      <FaEye
                        onClick={() => {
                          handleShowModal(order);
                        }}
                      />
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Payment ID : {orderID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="orderList-container modelTable">
            <table className="orderList-table">
              <thead>
                <tr>
                  <th>Serial</th>
                  <th>Product </th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product, index) => (
                  <tr key={index + 1}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <img src={`http://localhost:8000/uploads/productImage/${product.productdetail.image}`} alt="product" />
                    </td>
                    <td>
                      <p>{product.productdetail.productName}</p>
                    </td>
                    <td>
                      <p>{product.quantity}</p>
                    </td>
                    <td>
                      <p>{product.productdetail.newPrice}</p>
                    </td>
                    <td>${product.productdetail.newPrice * product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                      <Button variant="secondary" className="green-background-button">
                        Close
                      </Button>
                    </Modal.Footer> */}
      </Modal>

      {/* <Modal show={showCancelModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
            No
          </Button>
          <Button variant="success" onClick={handleCancelConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};
export { CompletedOrders, PendingOrders, DispatchedOrders, YourOrders };
