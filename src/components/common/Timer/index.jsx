import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const value = 0.99;

export function Timer({ imageExercise }) {
  console.log("image: ", imageExercise);
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
        <img style={{ width: 200 }} src={imageExercise} alt="doge" />
      </CircularProgressbarWithChildren>
      <a className="button mt-2" href="#rwar">
        START NOW
      </a>
    </div>
  );
}
