import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import useExerciseStore from '../stores/ExerciseStore';

const TabLayout = () => {
  const exercises = useExerciseStore((state) => state.exercises);
  const exerciseChecked = useExerciseStore((state) => state.exerciseChecked);
  const completed = Object.values(exerciseChecked).filter(Boolean).length;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => {
            return <Feather name="home" size={20} />;
          },
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: `Exercises (${completed}/${exercises.length})`,
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="weight-lifter" size={20} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
