import "../assets/bootstrap/css/bootstrap-theme.css";
import "../assets/bootstrap/css/bootstrap-theme.css.map";
import "../assets/bootstrap/css/bootstrap-theme.min.css";
import "../assets/bootstrap/css/bootstrap-theme.min.css.map";
import "../assets/bootstrap/css/bootstrap.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/bootstrap/css/bootstrap.min.css.map";
import "../assets/css/style.css";

function HomePage() {
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
              <div className="text-center steps__single steps__single-first">
                <img src="assets/images/step1.png" alt="" />
                <p>Type</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center steps__single">
                <img src="assets/images/step2.png" alt="" />
                <p>LOREM IPSUM DOLOR SIT AMET</p>
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
