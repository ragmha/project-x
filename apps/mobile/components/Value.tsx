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

const styles = StyleSheet.create({
  label: { color: '#fff', fontSize: 20 },
  value: { fontSize: 45, color: '#AFB3BE', fontWeight: '500' },
});

export default Value;
