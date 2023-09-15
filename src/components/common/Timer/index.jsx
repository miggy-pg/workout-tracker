import { useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const value = 0.99;

export function Timer({
  imageExercise,
  dispatch,
  fitnessSeconds,
  selectedListID,
  newExerciseList,
}) {
  console.log("timerselectedListID: ", selectedListID);
  const mins = Math.floor(10 / 60);
  const seconds = 10 % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "tick",
        selectedListID: selectedListID,
        imageExercise: imageExercise,
      });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch, selectedListID, imageExercise]);
  console.log("timerImageExercise", imageExercise);
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
      <p>
        {fitnessSeconds}
        {/* {mins}:{seconds} */}
      </p>
    </div>
  );
}
