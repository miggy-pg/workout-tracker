export function ExerciseList({ selectedType, exercises }) {
  return (
    <div className="text-center steps__single">
      <ol>
        {exercises.map(
          (exercise, key) =>
            exercise.type === selectedType && <li key={key}>{exercise.name}</li>
        )}
      </ol>
    </div>
  );
}
