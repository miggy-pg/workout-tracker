import { useEffect, useReducer, useState } from "react";
import "../assets/bootstrap/css/bootstrap-theme.css";
import "../assets/bootstrap/css/bootstrap-theme.css.map";
import "../assets/bootstrap/css/bootstrap-theme.min.css";
import "../assets/bootstrap/css/bootstrap-theme.min.css.map";
import "../assets/bootstrap/css/bootstrap.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/bootstrap/css/bootstrap.min.css.map";
import "../assets/css/style.css";
import "../assets/scss/style.scss";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import { ExerciseTypes } from "../components/Management/ExerciseType";
import { ExerciseList } from "../components/Management/ExerciseList";
import { Timer } from "../components/common/Timer";
import { Loader } from "../components/common/Loader";
import { Error } from "../components/common/Error";
import { fitness_image } from "../assets/media/fitness_image";

const apiKey = "EbXNorgMnC8zB/xZxM3CNg==FOyxrD2aAhQMHMXc";
const headers = {
  "X-API-Key": apiKey,
};

const initialState = {
  exerciseTypes: [],
  newExerciseList: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  points: 0,
  selectedType: "",
  selectedListID: null,
  exerciseListLength: 0,
  imageExercise: "",
  fitnessSeconds: 3,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, exerciseTypes: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "selectedType":
      const exerciseList = state.exerciseTypes.filter(
        (exercise) => exercise.type === action.payload
      );
      const exerciseListLength = exerciseList.length;
      const newExerciseList = Array.from(
        { length: exerciseListLength },
        (_, index) => ({ ...exerciseList[index], id: index })
      );
      return {
        ...state,
        selectedType: action.payload,
        newExerciseList: newExerciseList,
        exerciseListLength: exerciseListLength,
      };
    case "selectedList":
      const payload =
        state.newExerciseList[action.selectedListID].name.toLowerCase();
      return {
        ...state,
        selectedListID: action.selectedListID,
        imageExercise: fitness_image.filter((image) => image.includes(payload)),
      };
    case "tick":
      console.log("state: ", state);
      console.log("action: ", action.selectedListID);
      // const index = ;
      // const nextPayload = console.log("nextPayload: ", nextPayload);
      // console.log("image: ", image);
      const newID =
        state.fitnessSeconds === 0
          ? action.selectedListID + 1
          : state.selectedListID;
      return {
        ...state,
        fitnessSeconds: state.fitnessSeconds - 1,
        selectedListID: newID,
        imageExercise: fitness_image.filter((image) =>
          image.includes(state.newExerciseList[newID].name.toLowerCase())
        ),
      };
    default:
      throw new Error("Action unknown.");
  }
}

function HomePage() {
  const [isPlayed, setIsPlayed] = useState(false);

  // normally this is the syntax of useReducer
  // const [ state, dispatch ] = useReducer(reducer, initialState)

  // we are destructuring 'state' in this part
  // so state is destructured into 'exerciseTypes, status'
  const [
    {
      exerciseTypes,
      status,
      points,
      newExerciseList,
      exerciseListLength,
      selectedType,
      selectedListID,
      imageExercise,
      fitnessSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log("imageExercise: ", imageExercise);
  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises`,
          {
            mode: "cors",
            headers,
          }
        );
        await response
          .json()
          .then((data) =>
            data.map((exercise, key) => ({ ...exercise, id: key, points: 10 }))
          )
          .then((data) => dispatch({ type: "dataReceived", payload: data }));
      } catch (e) {
        dispatch((err) => dispatch({ type: "dataFailed" }));
      }
    };
    makeAPICall();
  }, []);
  console.log("selectListID: ", selectedListID);
  // filter out exercise types and remove duplicates
  const typeList = [];
  exerciseTypes.filter(
    (arr, index, self) =>
      index === self.findIndex((t) => t.type === arr.type) &&
      typeList.push(arr.type)
  );
  return (
    <section className="steps">
      <div className="container">
        <div className="page-section text-center">
          <Header
            selectedType={selectedType}
            selectedListID={selectedListID}
            exerciseListLength={exerciseListLength}
          />
          <div className="row">
            {status === "loading" && (
              <Container>
                <Loader />
              </Container>
            )}
            {status === "error" && (
              <Container>
                <Error />
              </Container>
            )}
            {status === "ready" && (
              <>
                <Container>
                  <ExerciseTypes typeList={typeList} dispatch={dispatch} />
                </Container>
                <Container>
                  <ExerciseList
                    newExerciseList={newExerciseList}
                    selectedType={selectedType}
                    dispatch={dispatch}
                  />
                </Container>
                <Container>
                  {(selectedListID === 0 || selectedListID) && (
                    <Timer
                      imageExercise={imageExercise[0]}
                      dispatch={dispatch}
                      newExerciseList={newExerciseList}
                      selectedListID={selectedListID}
                      fitnessSeconds={fitnessSeconds}
                    />
                  )}
                </Container>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
