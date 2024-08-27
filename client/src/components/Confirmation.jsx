import "../assets/css/confirmation.css";
import { ProcessConfirmation } from "../constants/messages";
import { confirmation } from "../constants/titles";
import { memo } from "react";

const Confirmation = ({ show, close, del }) => {
  if (!show) return <></>;
  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <div className="confirmation-header">{confirmation}</div>
        <div className="confirmation-body">
          <span>
            <i className="fas fa-ban" />
          </span>
          <p>{ProcessConfirmation}</p>
        </div>
        <div className="confirmation-footer">
          <span onClick={close}>
            <i className="fas fa-times danger" />
          </span>
          <span onClick={del}>
            <i className="fas fa-check success" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Confirmation);
