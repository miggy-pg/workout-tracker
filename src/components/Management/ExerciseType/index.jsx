export function ExerciseTypes(props) {
  return (
    <>
      <p>Types</p>
      <ol>
        {/* TOFIX: use dispatch instead of function */}
        {props.typeList.map((exercise, key) => (
          <li key={key} onClick={() => props.handleSelectType(exercise)}>
            <mark>{exercise.toUpperCase()}</mark>
          </li>
        ))}
      </ol>
    </>
  );
}
