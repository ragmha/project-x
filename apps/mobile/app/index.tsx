import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import RingProgress from '../components/RingProgress';
import Value from '../components/Value';
import { useHealthData } from '../hooks/use-health-data';

const STEPS_GOAL = 10000;

export default function App() {
  const todaysDate = new Date();
  const [refreshing, setRefreshing] = useState(false);
  const { steps, distance, flights, refetch } = useHealthData(todaysDate);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <RingProgress radius={150} strokeWidth={40} progress={steps / STEPS_GOAL} />
        <View style={styles.values}>
          <Value label="Goal" value={STEPS_GOAL.toString()} />
          <Value label="Steps" value={steps.toString()} />
          <Value label="Distance" value={`${(distance / 1000).toFixed(2)}km`} />
          <Value label="Flights Climbed" value={flights.toString()} />
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  values: { flexDirection: 'row', gap: 25, flexWrap: 'wrap', marginTop: 100 },
});
