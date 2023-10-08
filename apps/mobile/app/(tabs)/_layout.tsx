import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
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
          tabBarIcon: () => {
            return <MaterialCommunityIcons name="weight-lifter" size={20} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
