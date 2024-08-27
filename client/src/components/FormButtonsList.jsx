import { useState, memo } from "react";

const FormButtonsList = ({
  buttOneValue,
  buttTowValue,
  buttThreeValue,
  buttTowAction,
  buttThreeAction,
}) => {
  const [state, setState] = useState("");
  const toggle = () => {
    state ? setState("") : setState("active");
  };

  const reset = (action) => {
    setState("");
    action();
  };
  return (
    <div className={`form-buttons ${state}`}>
      <ul>
        <li>
          <input type="submit" value={buttOneValue} />
          <span onClick={toggle} />
        </li>
        <li>
          <input
            type="button"
            value={buttTowValue}
            onClick={() => reset(buttTowAction)}
          />
        </li>
        <li>
          <input
            type="button"
            value={buttThreeValue}
            onClick={() => reset(buttThreeAction)}
          />
        </li>
      </ul>
    </div>
  );
};

export default memo(FormButtonsList);
