const exercise_list = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  paddingLeft: "0",
  paddingRight: "0",
  color: "#39B4C6",
};

export function ExerciseList({ selectedType, exerciseTypes, dispatch }) {
  return (
    <div className="text-center steps__single">
      <ol>
        {exerciseTypes.map(
          (exercise, key) =>
            exercise.type === selectedType && (
              <li
                style={exercise_list}
                key={key}
                onClick={() =>
                  dispatch({
                    type: "selectedList",
                    selectedList: key,
                  })
                }
              >
                {exercise.name.toUpperCase()}
              </li>
            )
        )}
      </ol>
    </div>
  );
}
