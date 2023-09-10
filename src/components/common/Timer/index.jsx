import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import image from "../../../assets/media/atlas_stones.png";

const value = 0.66;
// const image = require("");

export function Timer() {
  return (
    <div>
      <CircularProgressbarWithChildren
        value={value}
        maxValue={1}
        text={`${value * 100}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#f54e4e",
          trailColor: "rgba(255,255,255,.2)",
        })}
      >
        <img style={{ width: 140, margin: "auto" }} src={image} alt="doge" />
      </CircularProgressbarWithChildren>
    </div>
  );
}
