import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import ErrorBoundary from './src/utils/errorBoundary';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator 
            screenOptions={{
              headerShown: false,
              animation: 'fade_from_bottom',
              animationDuration: 300
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            {/* Adicionar outras telas aqui quando criadas */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}