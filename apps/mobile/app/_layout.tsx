import { Stack } from 'expo-router';

const StackLayout = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
);

export default StackLayout;
