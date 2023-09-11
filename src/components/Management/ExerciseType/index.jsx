export function ExerciseTypes(props) {
  return (
    <>
      <p>Types</p>
      <ol>
        {props.typeList.map((exercise, key) => (
          <li key={key} onClick={() => props.handleSelectType(exercise)}>
            <mark>{exercise.toUpperCase()}</mark>
          </li>
        ))}
      </ol>
    </>
  );
}
