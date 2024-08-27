import "../assets/css/profile_card.css";
import { config } from "../config/configurations";
import { RolesMap } from "../helper/RolesMap";
import * as labels from "../constants/labels";
import { memo } from "react";

function ProfileCard({
  id,
  name,
  role,
  email,
  tel,
  identity,
  isActive,
  del,
  edit,
  send,
  toggle,
}) {
  const onEdit = () => {
    const payload = {
      id: id,
      name: name,
      role: role,
      email: email,
      tel: tel,
      identity: identity,
    };
    edit(payload);
  };
  const onToggle = () => {
    toggle({ id: id, isActive: isActive });
  };

  const onSend = () => {
    send({ receiverId: id, title: ` رسالة لـ ${name}` });
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
        <span onClick={onSend}>
          <i className="far fa-envelope" />
        </span>
      </div>
      <div className="profile-body">
        <h2>{name}</h2>
        <h3>{RolesMap.get(role)}</h3>
        <div>
          <p>{`${labels.shortEmail}: ${email}`}</p>
          <p>{`${labels.shortTel}: ${tel}`}</p>
          <p>{`${labels.shortIdentity}: ${identity}`}</p>
        </div>
      </div>
      <div className="profile-footer">
        <span onClick={() => del(id)}>
          <i className="fas fa-trash-alt" />
        </span>
        <span onClick={onEdit}>
          <i className="fas fa-pencil-alt" />
        </span>
        <span onClick={onToggle}>
          <i className={`fas ${isActive ? "fa-lock" : "fa-unlock"}`} />
        </span>
      </div>
    </div>
  );
}

export default memo(ProfileCard);
