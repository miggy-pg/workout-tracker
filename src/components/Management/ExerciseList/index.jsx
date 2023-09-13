const exercise_list = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  paddingLeft: "0",
  paddingRight: "0",
  color: "#39B4C6",
};

export function ExerciseList({ newExerciseList, dispatch }) {
  return (
    <div className="text-center steps__single">
      <ol>
        {newExerciseList.map((exercise, key) => (
          <li
            style={exercise_list}
            key={key}
            onClick={() =>
              dispatch({
                type: "selectedList",
                selectedListID: key + 1,
                payload: exercise.name.toLowerCase(),
              })
            }
          >
            {exercise.name.toUpperCase()}
          </li>
        ))}
      </ol>
    </div>
  );
}
