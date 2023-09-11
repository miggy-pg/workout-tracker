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

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  points: 0,
  selectedList: "",
  imageExercise: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, exerciseTypes: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "selectedList":
      return {
        ...state,
        selectedList: action.selectedList,
        imageExercise: fitness_image.filter((image) =>
          image.includes(action.selectedList)
        ),
      };
    default:
      throw new Error("Action unknown.");
  }
}

function HomePage() {
  // normally this is the syntax of useReducer
  // const [ state, dispatch ] = useReducer(reducer, initialState)

  // we are destructuring 'state' in this part
  // so state is destructured into 'exerciseTypes, status'
  const [
    { exerciseTypes, status, points, selectedList, imageExercise },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [selectedType, setSelectedType] = useState("");

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

  // filter out exercise types
  const typeList = [];
  exerciseTypes.filter(
    (arr, index, self) =>
      index === self.findIndex((t) => t.type === arr.type) &&
      typeList.push(arr.type)
  );

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  // const handleSelectList = (exercise) => {
  //   setSelectedList(exercise);
  // };
  console.log("selectedList: ", selectedList);
  return (
    <section className="steps">
      <div className="container">
        <div className="page-section text-center">
          <Header />
          <div className="row">
            {status === "loading" && (
              <Container>
                {" "}
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
                  <ExerciseTypes
                    typeList={typeList}
                    handleSelectType={handleSelectType}
                  />
                </Container>
                <Container>
                  <ExerciseList
                    selectedType={selectedType}
                    exerciseTypes={exerciseTypes}
                    dispatch={dispatch}
                  />
                </Container>
                <Container>
                  {selectedList && <Timer imageExercise={imageExercise[0]} />}
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
