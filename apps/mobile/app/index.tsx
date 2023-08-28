import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ValueProps {
  label: string;
  value: string;
}

const Value: FC<ValueProps> = ({ label, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Value label="Steps" value="1219" />
        <Value label="Distance" value="0,75" />
      </View>
      <Value label="Flights Climbed" value="0,75km" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  valueContainer: { marginRight: 50, marginVertical: 10 },
  label: { color: '#fff', fontSize: 20 },
  value: { fontSize: 35, color: '#AFB3BE', fontWeight: '500' },
});
