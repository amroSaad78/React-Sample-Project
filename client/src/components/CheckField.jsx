import { memo } from "react";

const CheckField = ({ value, placeholder, toggle }) => {
  return (
    <div className="items-check active">
      <p onClick={toggle}>
        {value ? "مفتوحة" : "مُغلقة"}
        <i
          className={`fas ${value ? "fa-unlock success" : "fa-lock danger"}`}
        />
      </p>
      <span></span>
      <label>{placeholder}</label>
    </div>
  );
};

export default memo(CheckField);
