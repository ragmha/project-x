import { create } from 'zustand';

import exercises from '../../data/exercises.json';

type Exercise = {
  dayNumber: number;
  dayTitle: string;
};

interface ExerciseState {
  exercises: Exercise[];
  exerciseChecked: Record<number, boolean>;
  setExerciseChecked: (exerciseId: number, checked: boolean) => void;
}

const useExerciseStore = create<ExerciseState>((set) => ({
  exercises,
  exerciseChecked: {},
  setExerciseChecked: (exerciseId, checked) =>
    set((state) => ({
      exerciseChecked: {
        ...state.exerciseChecked,
        [exerciseId]: checked,
      },
    })),
}));

export default useExerciseStore;
