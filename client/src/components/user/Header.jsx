import image from "../../assets/images/logo.png";
const Header = () => {
  const HeadercontainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const imageStyle = {
    alignSelf: "center",
  };

  return (
    <div style={HeadercontainerStyle}>
      <img src={image} alt="logo" className="Authentic-logo" style={imageStyle} />
    </div>
  );
};

export default Header;
