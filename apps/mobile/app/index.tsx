import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ValueProps {
  label: string;
  value: string;
}

const Value: FC<ValueProps> = ({ label, value }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.values}>
        <Value label="Steps" value="1219" />
        <Value label="Distance" value="0,75km" />
        <Value label="Flights Climbed" value="12" />
      </View>
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
  values: { flexDirection: 'row', gap: 25, flexWrap: 'wrap' },
  label: { color: '#fff', fontSize: 20 },
  value: { fontSize: 45, color: '#AFB3BE', fontWeight: '500' },
});
