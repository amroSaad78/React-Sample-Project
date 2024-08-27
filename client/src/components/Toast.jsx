import "../assets/css/toast.css";
import { MessageTypes } from "../actions/selectors";
import { memo, useEffect } from "react";

const Toast = ({ type, message, reset }) => {
  useEffect(() => {
    if (type === MessageTypes.None) return;
    const timer = setTimeout(reset, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [reset, type]);
  if (type === MessageTypes.None) return <></>;
  return (
    <div className="toast-container">
      <p className="trim">
        {message}
        <span>
          <i
            className={`fas ${
              type === MessageTypes.Error
                ? "fa-times-circle danger"
                : "fa-check-circle success"
            }`}
          />
        </span>
      </p>
    </div>
  );
};

export default memo(Toast);
