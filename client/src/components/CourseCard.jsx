import "../assets/css/course_card.css";
import { delBtn, editBtn, addBtn } from "../constants/labels";
import { config } from "../config/configurations";
import { memo } from "react";

function CourseCard({ id, name, details, del, edit, add, list }) {
  const onEdit = () => {
    const payload = {
      id: id,
      name: name,
      details: details,
    };
    edit(payload);
  };
  const onAdd = () => {
    add({ courseId: id, name: name });
  };
  const onList = () => {
    list({ courseId: id, name: name });
  };
  const onDel = () => {
    del(id);
  };
  return (
    <div className={"course-card"}>
      <div className="course-list" onClick={onList}>
        <i className="fas fa-list" />
      </div>
      <div className="course-body">
        <h2 className="trim">{name}</h2>
        <div>
          <p>{details}</p>
        </div>
      </div>
      <div className="course-image">
        <img
          alt=""
          className="thump-img"
          data-src={`${config.API_URL}/pics/course/${id}`}
          src="images/no_image.jpg"
        />
      </div>
      <div className="course-buttons">
        <span onClick={onDel} className="delBtn">
          {delBtn}
        </span>
        <span onClick={onEdit} className="editBtn">
          {editBtn}
        </span>
        <span onClick={onAdd} className="addBtn">
          {addBtn}
        </span>
      </div>
    </div>
  );
}

export default memo(CourseCard);
