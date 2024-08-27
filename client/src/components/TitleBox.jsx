import "../assets/css/title_box.css";
import { memo, useState } from "react";

const TitleBox = ({ title }) => {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <div className={`search-box ${toggle ? "active" : ""}`}>
      <label className="trim">{title}</label>
      <span onClick={toggler}>
        <i className={`fas ${toggle ? "fa-times-circle" : "fa-angle-right"}`} />
      </span>
    </div>
  );
};

export default memo(TitleBox);
