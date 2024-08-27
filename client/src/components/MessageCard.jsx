import { config } from "../config/configurations";
import { memo } from "react";

function MessageCard({ id, name, subject, delBtn, openBtn, del, open, reply }) {
  const onDelete = () => {
    del();
  };
  const onOpen = () => {
    open();
  };
  const onReply = () => {
    reply();
  };

  return (
    <div className={"message-card"}>
      <div className="message-reply" onClick={onReply}>
        <i className="fas fa-reply" />
      </div>
      <div className="message-body">
        <h2 className="trim">{name}</h2>
        <div>
          <p>{subject}</p>
        </div>
      </div>
      <div className="user-image">
        <img
          alt=""
          className="thump-img"
          data-src={`${config.API_URL}/pics/user/${id}`}
          src="images/no_image.jpg"
        />
      </div>
      <div className="message-buttons">
        <span onClick={onDelete} className="delBtn">
          {delBtn}
        </span>
        <span onClick={onOpen} className="addBtn">
          {openBtn}
        </span>
      </div>
    </div>
  );
}

export default memo(MessageCard);
