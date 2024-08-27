import { memo } from "react";
import "../assets/css/progress_bar.css";

function ProgressBar({ value }) {
  return (
    <div className="progressbar">
      {value > 0 && (
        <>
          <p>{value + " %"}</p>
          <div style={{ width: value + `%` }}></div>
        </>
      )}
    </div>
  );
}

export default memo(ProgressBar);
