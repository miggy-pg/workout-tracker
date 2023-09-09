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
  console.log(selectedType);
  return (
    <section className="steps">
      <div className="container">
        <div className="page-section text-center">
          <h2 className="page-section__title">Fitness Steps</h2>
          <div className="page-section__title-style">
            <span className="first-line"></span>
            <span className="second-line"></span>
          </div>
          <p className="page-section__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
          <div className="row">
            <div className="col-md-4">
              <div className="text-center steps__single steps__single-first"></div>

              <div className="exercise-types">
                <p>Types</p>
                <ol>
                  {typeList.map((exercise, key) => (
                    <li key={key} onClick={() => handleSelectType(exercise)}>
                      <mark>{exercise.toUpperCase()}</mark>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center steps__single">
                <ol>
                  {exercises.map(
                    (exercise, key) =>
                      exercise.type === selectedType && (
                        <li key={key}>{exercise.name}</li>
                      )
                  )}
                </ol>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center steps__single steps__single-last">
                <img src="assets/images/step3.png" alt="" />
                <p>LOREM IPSUM DOLOR SIT AMET</p>
              </div>
            </div>
          </div>
          <a className="button" href="#rwar">
            TRY NOW
          </a>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
