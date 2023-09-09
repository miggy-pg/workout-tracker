export function ExerciseTypes(props) {
  return (
    <div className="exercise-types">
      <p>Types</p>
      <ol>
        {props.typeList.map((exercise, key) => (
          <li key={key} onClick={() => props.handleSelectType(exercise)}>
            <mark>{exercise.toUpperCase()}</mark>
          </li>
        ))}
      </ol>
    </div>
  );
}
