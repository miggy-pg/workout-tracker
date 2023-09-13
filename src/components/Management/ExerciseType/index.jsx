export function ExerciseTypes({ dispatch, typeList }) {
  return (
    <>
      <p>Types</p>
      <ol>
        {/* TOFIX: use dispatch instead of function */}
        {typeList.map((exercise, key) => (
          <li
            key={key}
            onClick={() =>
              dispatch({ type: "selectedType", payload: exercise })
            }
          >
            <mark>{exercise.toUpperCase()}</mark>
          </li>
        ))}
      </ol>
    </>
  );
}
