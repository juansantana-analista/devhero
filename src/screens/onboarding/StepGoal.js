import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import HeroAvatar from '../../components/HeroAvatar';
import SpeechBubble from '../../components/SpeechBubble';
import OptionCard from '../../components/OptionCard';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import TypewriterText from '../../components/TypewriterText';
import FixedText from '../../components/FixedText';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepGoal = ({ navigation }) => {
  const { dailyGoalMin, setDailyGoalMin } = useOnboardingStore();
  const [selectedGoal, setSelectedGoal] = useState(dailyGoalMin);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

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

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepGoal: Componente montado');
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setIsTypewriterComplete(true);
  }, []);

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.67} /> {/* 4/6 = ~0.67 */}
        
        <View style={styles.content}>
          {/* Avatar e Speech Bubble na mesma linha */}
          <View style={styles.headerRow}>
            <View style={styles.avatarContainer}>
              <HeroAvatar size={spacing.lg * 4} />
            </View>
            
            <View style={styles.bubbleContainer}>
              <SpeechBubble animate={true} arrowDirection="left">
                <View style={styles.bubbleContent}>
                  <TypewriterText 
                    text="Defina sua meta diária"
                    speed={50}
                    onComplete={handleTypewriterComplete}
                  />
                  <FixedText variant="body" color={colors.textSecondary} style={styles.subtitle}>
                    Manter uma sequência diária acelera sua evolução.
                  </FixedText>
                </View>
              </SpeechBubble>
            </View>
          </View>

          {/* Opções de Meta */}
          <ScrollView 
            style={styles.optionsScroll}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>
        </View>

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
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.bottomSafeArea,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  bubbleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bubbleContent: {
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  optionsScroll: {
    flex: 1,
  },
  optionsContainer: {
    paddingBottom: spacing.lg,
  },
});

export default StepGoal;