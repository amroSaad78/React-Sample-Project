import "../assets/css/sub_course_card.css";
import * as labels from "../constants/labels";
import { memo } from "react";

const moment = require("moment");

function SubCourseCard({
  id,
  price,
  hours,
  startDate,
  isActive,
  del,
  send,
  edit,
  toggle,
}) {
  const onEdit = () => {
    const payload = {
      id: id,
      price: price.toString(),
      hours: hours.toString(),
      startDate: moment(startDate).format("YYYY-MM-DD"),
      isActive: isActive,
    };
    edit(payload);
  };

  const onDelete = () => {
    const payload = {
      id: id,
    };
    del(payload);
  };

  const onToggle = () => {
    const payload = {
      id: id,
      isActive: isActive,
    };
    toggle(payload);
  };

  const onSend = () => {
    const payload = { subCourseId: id };
    send(payload);
  };

  return (
    <div className={"sub-course-card"}>
      <div className="sub-course-toggle" onClick={onToggle}>
        <i
          className={`fas ${isActive ? "fa-unlock success" : "fa-lock danger"}`}
        />
      </div>
      <div className="sub-course-body">
        <span onClick={onSend}>
          <i className="far fa-envelope" />
        </span>
        <h2>{moment(startDate).format("DD MMM yyyy")}</h2>
        <p>{`${labels.price}:${price}`}</p>
        <p>{`${labels.hours}:${hours}`}</p>
      </div>
      <div className="sub-course-buttons">
        <span onClick={onDelete} className="delBtn">
          {labels.delBtn}
        </span>
        <span onClick={onEdit} className="editBtn">
          {labels.editBtn}
        </span>
      </div>
    </div>
  );
}

export default memo(SubCourseCard);
