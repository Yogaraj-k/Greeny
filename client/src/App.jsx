import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/user/registerPage";
import Login from "./pages/user/loginPage";
import ResetPassword from "./pages/user/resetPasswordPage";
import ChangePassword from "./pages/user/changePasswordPage";
//import HeaderPage from "./components/user/HeaderPage";
import Wishlist from "./pages/user/wishlist";
import NotFound from "./pages/user/NotFound";
import Privacy from "./pages/user/Privacy";
import Footer from "./pages/user/Footer";
import FAQ from "./pages/user/FAQ";
import AddCategory from "./components/admin/addCategory";
import Dashboard from "./components/admin/dashboard";
import Offers from "./pages/user/offers";
import MyProfile from "./pages/user/myProfile";
import MyWallet from "./pages/user/myWallet";
import UserContact from "./pages/user/UserContact";
import ComingSoon from "./pages/user/comingSoon";
import AddProductdata from "./components/admin/AddProductdata";
import CheckOut from "./pages/user/checkOut";
import AboutUs from "./pages/user/aboutUs";
// import ProductDescriptionCard from "./pages/user/productDescriptionCard";
import Home from "./pages/user/home";
import TransactionDetails from "./pages/admin/transactionDetails";
import { YourOrders, DispatchedOrders, CompletedOrders, PendingOrders } from "./pages/admin/orderList";
import ShopPage from "./pages/user/shop";
// import AdminHeader from "./components/admin/adminHeader";
import { OffCanvasProvider } from "../../client/src/components/admin/adminHeader";
import OrderHistory from "./pages/user/OrderHistory";
import RegisterData from "./components/admin/RegisterData";
import AllCategory from "./pages/user/AllCategory";
import AllProducts from "./components/admin/allProducts";
import EditProduct from "./components/admin/editProduct";
import { ProtectedLoginRoute } from "./pages/protectRoute/protectedRoute";
import OfferTime from "./components/admin/OfferTime";
import { SliderProvider } from "../src/pages/user/home";
import AddNewProduct from "./components/admin/AddNewProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <SliderProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allCategory" element={<AllCategory />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/us" element={<UserContact />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/offers" element={<ProtectedLoginRoute Component={Offers} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/changePassword/:token" element={<ChangePassword />} />
            <Route path="/comingSoon" element={<ProtectedLoginRoute Component={ComingSoon} />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/shop" element={<ProtectedLoginRoute Component={ShopPage} />}></Route>
            <Route path="/myProfile" element={<ProtectedLoginRoute Component={MyProfile} />} />
            <Route path="/about" element={<ProtectedLoginRoute Component={AboutUs} />} />
            <Route path="/myWallet" element={<ProtectedLoginRoute Component={MyWallet} />} />
            <Route path="/transactionDetails" element={<TransactionDetails />} />
            {/* admin panel */}
            <Route
              path="/admin/*"
              element={
                <OffCanvasProvider>
                  <Routes>
                    {/* <Route path="admin" element={<AdminHeader />} /> */}
                    <Route path="addcategory" element={<AddCategory />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="allProducts" element={<AllProducts />} />
                    <Route path="editProduct" element={<EditProduct />} />
                    <Route path="addProduct" element={<AddProductdata />} />
                    <Route path="completedOrders" element={<CompletedOrders />} />
                    <Route path="yourOrders" element={<YourOrders />} />
                    <Route path="pendingOrders" element={<PendingOrders />} />
                    <Route path="dispatchOrders" element={<DispatchedOrders />} />
                    <Route path="/registerdata" element={<RegisterData />} />
                    <Route path="/addnewproduct" element={<AddNewProduct />} />
                  </Routes>
                </OffCanvasProvider>
              }
            />
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </SliderProvider>
      </Router>
    </div>
  );
}

export default App;
