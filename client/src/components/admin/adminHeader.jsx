import { Link, useNavigate } from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import SubMenu from "./subMenu";
import "../../styles/admin/adminHeader.css";
import { SidebarData } from "./sidebarData";
import logo from "../../assets/images/logo.png";
import { CgProfile } from "react-icons/cg";
import ProfileCard from "./profileCard";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
const OffCanvasContext = createContext();

export const OffCanvasProvider = ({ children }) => {
  const [showOffCanvas, setShowOffCanvas] = useState(true);
  const [backdrop, setBackdrop] = useState(true);

  const handleClose = () => setShowOffCanvas(false);
  const handleToggleOffCanvas = () => {
    setShowOffCanvas((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 780) {
        setBackdrop(true);
        setShowOffCanvas(false);
      } else {
        setBackdrop(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <OffCanvasContext.Provider value={{ showOffCanvas, backdrop, handleToggleOffCanvas, handleClose, setShowOffCanvas }}>{children}</OffCanvasContext.Provider>;
};

export const useOffCanvasContext = () => {
  return useContext(OffCanvasContext);
};

const Sidebar = () => {
  const { showOffCanvas, handleToggleOffCanvas, handleClose, backdrop, setShowOffCanvas } = useOffCanvasContext();
  // console.log("main :" + showOffCanvas);

  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileCardRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 780) {
      setShowOffCanvas(false);
    }
    return () => {
      setShowOffCanvas(true);
    };
  }, [setShowOffCanvas]);

  const toggleProfileCard = () => {
    setShowOffCanvas(false);
    setShowProfileCard(!showProfileCard);
  };
  const handleToggle = () => setShowProfileCard(!showProfileCard);
  const handleClickOutside = (event) => {
    if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
      setShowProfileCard(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const nav = useNavigate();
  return (
    <>
      <div className="nav" ref={profileCardRef}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="nav-logo" onClick={() => nav("/admin")} />
        </div>
        <Link to="#">
          <FaIcon.FaBars onClick={handleToggleOffCanvas} className="menu-bar" />
        </Link>
        <div className="right-section">
          <button
            className="nav-button"
            onClick={() => {
              window.location = "/admin/addproduct";
            }}
          >
            Create product
          </button>
          <button
            className="nav-button"
            onClick={() => {
              window.location = "/";
            }}
          >
            Visit Site
          </button>
          <div className="profile-container" onClick={toggleProfileCard}>
            <CgProfile className="profile-icon" />
            <div className="profile-info">
              <span className="profile-name">Sakthi</span>
              <span className="profile-role">Super Admin</span>
            </div>
          </div>
          {showProfileCard && <ProfileCard></ProfileCard>}
        </div>
      </div>

      <Offcanvas show={showOffCanvas} onHide={handleClose} placement="start" className="admin-sidebar" style={{ width: "350px", top: "80px" }} backdrop={backdrop} scroll={true}>
        <Offcanvas.Header className="admin-offcanvas-header" onClick={handleClose}>
          <img src={logo} alt="Logo" />
          <i className="fas fa-times" style={{ color: "#119744", fontSize: "24px" }}></i>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ overflow: "visible" }} className="sidebar">
          <div>
            <div className="sidebar-wrap">
              {SidebarData.map((item, index) => (
                <SubMenu item={item} key={index} />
              ))}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {/* {showProfileCard && (
        <div>
          <Offcanvas show={showProfileCard} onHide={handleToggle} placement="end" style={{ width: "200px" }}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Profile Card</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body></Offcanvas.Body>
          </Offcanvas>
        </div>
      )} */}
    </>
  );
};

export default Sidebar;
