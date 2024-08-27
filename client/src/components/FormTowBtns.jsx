import "../assets/css/tow_btns.css";
const FormTowBtns = ({ leftBtn, rightBtn, onClick }) => {
  return (
    <div className="tow_btns-container">
      <input
        type="button"
        value={leftBtn}
        className="form-btn solid"
        onClick={onClick}
      />
      <input type="submit" value={rightBtn} className="form-btn solid" />
    </div>
  );
};

export default FormTowBtns;
