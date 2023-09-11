import { useEffect, useState } from "react";
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

const apiKey = "EbXNorgMnC8zB/xZxM3CNg==FOyxrD2aAhQMHMXc";
const headers = {
  "X-API-Key": apiKey,
};

const initialState = {
  exercises: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {}

function HomePage() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [exercises, setExercises] = useState([]);

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
          .then((json) =>
            json.map((exercise, key) => ({ ...exercise, id: key }))
          )
          .then((res) => setExercises(res));
      } catch (e) {}
    };
    makeAPICall();
  }, []);

  // filter out exercise types
  const typeList = [];
  exercises.filter(
    (arr, index, self) =>
      index === self.findIndex((t) => t.type === arr.type) &&
      typeList.push(arr.type)
  );

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleSelectList = (exercise) => {
    setSelectedList(exercise);
  };

  return (
    <section className="steps">
      <div className="container">
        <div className="page-section text-center">
          <Header />
          <div className="row">
            <Container>
              <ExerciseTypes
                typeList={typeList}
                handleSelectType={handleSelectType}
              />
            </Container>
            <Container>
              <ExerciseList
                selectedType={selectedType}
                exercises={exercises}
                handleSelectList={handleSelectList}
              />
            </Container>
            <Container>
              {selectedList && <Timer selectedList={selectedList} />}
            </Container>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
