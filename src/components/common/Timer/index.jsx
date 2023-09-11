import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fitness_image } from "../../../assets/media/fitness_image";

const value = 0.99;

export function Timer({ selectedList }) {
  const image = fitness_image.filter((image) => image.includes(selectedList));

  return (
    <div className="wrapper-timer">
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
        <img style={{ width: 200 }} src={image} alt="doge" />
      </CircularProgressbarWithChildren>
      <a className="button mt-2" href="#rwar">
        START NOW
      </a>
    </div>
  );
}
