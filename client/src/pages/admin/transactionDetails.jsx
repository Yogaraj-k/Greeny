import "../../styles/admin/transactionDetails.css";
import HeaderPage from "../../components/user/HeaderPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../pages/user/Footer";
function TransactionDetails() {
  return (
    <>
      <HeaderPage />
      <div className="transaction-admin" style={{ padding: "1% 5%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="transaction-details vendor">
          <span className="total-transactions">
            <h3>20357</h3>
            <p>Total transactions</p>
          </span>
          <span className="successful-transactions">
            <h3>20225</h3>
            <p>Successful Transactions</p>
          </span>
          <span className="failed-transactions">
            <h3>98</h3>
            <p>Failed Transactions</p>
          </span>
          <span className="pending-transactions">
            <h3>34</h3>
            <p>Pending Transactions</p>
          </span>
        </div>
        <div className="transaction-details">
          <h2 className="cb">Recent Transactions</h2>

          <div className="pagination">
            <p>Filter:</p>
            <select name="rows-per-page transaction" id="rows-per-page">
              <option value="15">Total</option>
              <option value="5">Successful</option>
              <option value="10">Failed</option>
              <option value="15">Pending</option>
            </select>
            <p>Show:</p>
            <select name="rows-per-page" id="rows-per-page">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className="transaction-table">
            <table>
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Transaction Date</th>
                  <th>Payment Method</th>
                  <th>Order Id</th>
                  <th>Received Amount</th>
                  <th>Order Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-paid">Recieved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-due">Due</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-cancel">Cancel</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-paid">Recieved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-due">Due</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-cancel">Cancel</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-paid">Recieved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-due">Due</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-cancel">Cancel</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-paid">Recieved</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-due">Due</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>02 February 2023</td>
                  <td>Order Altered</td>
                  <td>Order (26881)</td>
                  <td>$345.89</td>
                  <td>$345.89</td>
                  <td className="transaction-cancel">Cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="showing-results">
            <div className="sr-text">
              <p>Showing 12 of 60 results</p>
            </div>

            <div className="transaction-page-buttons">
              <button>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button>1</button>
              <p>....</p>
              <button>60</button>
              <button>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TransactionDetails;
