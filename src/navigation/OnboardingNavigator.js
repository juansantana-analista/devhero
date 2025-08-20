import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Onboarding Screens
import StepIntro from '../screens/onboarding/StepIntro';
import StepLanguages from '../screens/onboarding/StepLanguages';
import StepLevel from '../screens/onboarding/StepLevel';
import StepGoal from '../screens/onboarding/StepGoal';
import StepMotivation from '../screens/onboarding/StepMotivation';
import StepSummary from '../screens/onboarding/StepSummary';

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="StepIntro" component={StepIntro} />
      <Stack.Screen name="StepLanguages" component={StepLanguages} />
      <Stack.Screen name="StepLevel" component={StepLevel} />
      <Stack.Screen name="StepGoal" component={StepGoal} />
      <Stack.Screen name="StepMotivation" component={StepMotivation} />
      <Stack.Screen name="StepSummary" component={StepSummary} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;