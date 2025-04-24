import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const handleItemClick = () => {
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className={`SubMenu ${item.subNav ? "HasSubNav" : ""}`}>
      <div className={`HeadingContainer ${item.isFirstHeading ? "FirstHeading" : ""}`}>{item.heading && <span className="Heading">{item.heading}</span>}</div>
      <Link to={item.path} className={`SidebarLink ${item.subNav ? "SubNav" : ""}`} onClick={() => (item.subNav ? showSubnav() : handleItemClick())}>
        <div className="TitleContainer">
          {item.icon}
          <span className="SidebarLabel">{item.title}</span>
        </div>
        <div className="ArrowContainer">{item.subNav && (subnav ? <IoIosArrowUp /> : <IoIosArrowDown />)}</div>
      </Link>
      {subnav && (
        <div className="SubItemsContainer">
          {item.subNav.map((subItem, index) => (
            <Link to={subItem.path} className="DropdownLink" key={index}>
              {subItem.icon}
              <span className="SidebarLabel">{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
