import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import OptionCard from '../../components/OptionCard';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import FixedText from '../../components/FixedText';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepGoal = ({ navigation }) => {
  const { dailyGoalMin, setDailyGoalMin } = useOnboardingStore();
  const [selectedGoal, setSelectedGoal] = useState(dailyGoalMin);

  const goalOptions = [
    { 
      id: 5, 
      title: '5 minutos', 
      icon: '⚡',
      description: 'Começar devagar'
    },
    { 
      id: 10, 
      title: '10 minutos', 
      icon: '🎯',
      description: 'Recomendado'
    },
    { 
      id: 15, 
      title: '15 minutos', 
      icon: '🔥',
      description: 'Ritmo intenso'
    },
    { 
      id: 20, 
      title: '20 minutos', 
      icon: '💎',
      description: 'Dedicação máxima'
    },
  ];

  const handleGoalSelect = (goalMinutes) => {
    setSelectedGoal(goalMinutes);
    setDailyGoalMin(goalMinutes);
    
    // Haptic feedback
    safeHaptics.selection();
  };

  const handleContinue = () => {
    if (selectedGoal) {
      navigation.navigate('StepMotivation');
    }
  };

  const canContinue = selectedGoal !== null;

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.67} /> {/* 4/6 = ~0.67 */}
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <View style={styles.header}>
            <FixedText variant="h2" color={colors.textPrimary} style={styles.title}>
              Defina sua meta diária
            </FixedText>
            <FixedText variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Manter uma sequência diária acelera sua evolução.
            </FixedText>
          </View>

          {/* Opções de Meta */}
          <View style={styles.optionsContainer}>
            {goalOptions.map((goalOption) => (
              <OptionCard
                key={goalOption.id}
                title={goalOption.title}
                description={goalOption.description}
                icon={goalOption.icon}
                selected={selectedGoal === goalOption.id}
                onPress={() => handleGoalSelect(goalOption.id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <BottomCTA
          primaryTitle="CONTINUAR"
          primaryOnPress={handleContinue}
          primaryDisabled={!canContinue}
          showSecondary={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.bottomSafeArea,
  },
  header: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
});

export default StepGoal;