import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from './src/theme';

import WelcomeScreen from './src/screens/WelcomeScreen';
import TaskSelectScreen from './src/screens/TaskSelectScreen';
import AIContributionScreen from './src/screens/AIContributionScreen';
import ReflectionScreen from './src/screens/ReflectionScreen';
import ResultScreen from './src/screens/ResultScreen';
import DisclosureScreen from './src/screens/DisclosureScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createStackNavigator();

// Shared header style — flat, no shadow, teal tint
const headerStyle = {
  headerStyle: { backgroundColor: colors.background, elevation: 0, shadowOpacity: 0 },
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.text, fontWeight: '600' },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={headerStyle}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TaskSelect" component={TaskSelectScreen} options={{ title: 'Research Task' }} />
        <Stack.Screen name="AIContribution" component={AIContributionScreen} options={{ title: 'AI Contribution' }} />
        <Stack.Screen name="Reflection" component={ReflectionScreen} options={{ title: 'Reflection' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Your Reflection' }} />
        <Stack.Screen name="Disclosure" component={DisclosureScreen} options={{ title: 'Disclosure Draft' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
