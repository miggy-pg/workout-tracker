import { useEffect } from "react";

export function Header({ selectedType, selectedListID, exerciseListLength }) {
  return (
    <>
      <h2 className="page-section__title">Fitness Steps</h2>;
      <div className="page-section__title-style">
        <span className="first-line"></span>
        <span className="second-line"></span>
      </div>
      <p className="page-section__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et
      </p>
      {selectedType && <progress max={exerciseListLength} value={0} />}
    </>
  );
}
