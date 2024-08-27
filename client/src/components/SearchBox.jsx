import "../assets/css/search_box.css";
import { memo, useState } from "react";

const SearchBox = ({ onChange, placeholder }) => {
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("");

  const toggler = () => {
    if (toggle) {
      setToggle(false);
      if (!value) return;
      setValue("");
      onChange("");
    } else {
      setToggle(true);
    }
  };

  const changeValue = (e) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };

  return (
    <div className={`search-box ${toggle ? "active" : ""}`}>
      <input
        type="text"
        maxLength="50"
        value={value}
        placeholder={placeholder}
        onChange={changeValue}
      />
      <span onClick={toggler}>
        <i className={`fas ${toggle ? "fa-times-circle" : "fa-search-plus"}`} />
      </span>
    </div>
  );
};

export default memo(SearchBox);
