import { memo } from "react";

const TextArea = ({ placeholder, name, value, maxLength, onChange }) => {
  return (
    <div className={`items-area ${value && "active"}`}>
      <textarea
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        title={name}
      />
      <span></span>
      <label>{placeholder}</label>
    </div>
  );
};

export default memo(TextArea);
