import "../assets/css/profile_card.css";
import { config } from "../config/configurations";
import { RolesMap } from "../helper/RolesMap";
import * as labels from "../constants/labels";
import { memo } from "react";

function AssignCard({ id, name, role, email, isActive, checked, toggle }) {
  const onToggle = () => {
    toggle({ userId: id, checked: checked });
  };
  return (
    <div className={`profile-card ${isActive ? "" : "locked"}`}>
      <div className="profile-header">
        <img
          alt=""
          className="thump-img"
          data-src={`${config.API_URL}/pics/user/${id}`}
          src="images/no_image.jpg"
        />
      </div>
      <div className="profile-body">
        <h2>{name}</h2>
        <h3>{RolesMap.get(role)}</h3>
        <div>
          <p>{`${labels.shortEmail}: ${email}`}</p>
        </div>
      </div>
      <div className="profile-footer">
        <span onClick={onToggle}>
          <i className={`fas fa-check-circle ${checked ? "checked" : ""}`} />
        </span>
      </div>
    </div>
  );
}

export default memo(AssignCard);
