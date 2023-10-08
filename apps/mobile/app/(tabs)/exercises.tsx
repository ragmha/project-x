import Checkbox from 'expo-checkbox';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import useExerciseStore from '../stores/ExerciseStore';

// Render a list of exercises with checkboxes
const Exercises = () => {
  const exercises = useExerciseStore((state) => state.exercises);
  const exercisesChecked = useExerciseStore((state) => state.exerciseChecked);
  const handleCheckedItem = useExerciseStore((state) => state.setExerciseChecked);

  return (
    <SafeAreaView>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Checkbox
              style={styles.checkbox}
              value={exercisesChecked[item.dayNumber] || false}
              onValueChange={(checked) => handleCheckedItem(item.dayNumber, checked)}
            />
            <Text style={[styles.text, exercisesChecked[item.dayNumber] && styles.textDone]}>
              {item.dayTitle}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.dayNumber.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignitems: 'center',
    borderTopWidth: 2,
    borderColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  text: {
    flex: 1,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
});

export default Exercises;
