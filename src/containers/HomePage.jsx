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

const apiKey = "EbXNorgMnC8zB/xZxM3CNg==FOyxrD2aAhQMHMXc";
const headers = {
  "X-API-Key": apiKey,
};

function HomePage() {
  const [selectedType, setSelectedType] = useState("");
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

  return (
    <section className="steps">
      <div className="container">
        <div className="page-section text-center">
          <Header />
          <div className="row">
            <Container>
              <div className="text-center steps__single steps__single-first"></div>
              <ExerciseTypes
                typeList={typeList}
                handleSelectType={handleSelectType}
              />
            </Container>
            <Container>
              <ExerciseList selectedType={selectedType} exercises={exercises} />
            </Container>
            <Container>
              <div className="text-center steps__single steps__single-last">
                <img src="assets/images/step3.png" alt="" />
                <p>LOREM IPSUM DOLOR SIT AMET</p>
              </div>
            </Container>
          </div>
          <a className="button" href="#rwar">
            START NOW
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
