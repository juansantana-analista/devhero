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
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepLevel = ({ navigation }) => {
  const { level, setLevel } = useOnboardingStore();
  const [selectedLevel, setSelectedLevel] = useState(level);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  const levelOptions = [
    { 
      id: 'beginner', 
      title: 'Nunca programei', 
      icon: '🌱',
      description: 'Vou começar do absoluto zero'
    },
    { 
      id: 'basic', 
      title: 'Conheço o básico', 
      icon: '📚',
      description: 'Já vi alguns conceitos'
    },
    { 
      id: 'intermediate', 
      title: 'Já fiz alguns exercícios', 
      icon: '💪',
      description: 'Pratiquei um pouco'
    },
    { 
      id: 'advanced', 
      title: 'Consigo resolver problemas simples', 
      icon: '🚀',
      description: 'Tenho experiência prática'
    },
  ];

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
    setLevel(levelId);
    
    // Haptic feedback
    safeHaptics.selection();
  };

  const handleContinue = () => {
    if (selectedLevel) {
      navigation.navigate('StepGoal');
    }
  };

  const canContinue = selectedLevel !== null;

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepLevel: Componente montado');
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
        <ProgressBar progress={0.5} /> {/* 3/6 = 0.5 */}
        
        <View style={styles.content}>
          {/* Avatar e Speech Bubble na mesma linha */}
          <View style={styles.headerRow}>
            <View style={styles.avatarContainer}>
              <HeroAvatar size={spacing.lg * 4} />
            </View>
            
            <View style={styles.bubbleContainer}>
              <SpeechBubble animate={true} arrowDirection="left">
                <TypewriterText 
                  text="Qual é o seu nível hoje?"
                  speed={50}
                  onComplete={handleTypewriterComplete}
                />
              </SpeechBubble>
            </View>
          </View>

          {/* Opções de Nível */}
          <ScrollView 
            style={styles.optionsScroll}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {levelOptions.map((levelOption) => (
              <OptionCard
                key={levelOption.id}
                title={levelOption.title}
                description={levelOption.description}
                icon={levelOption.icon}
                selected={selectedLevel === levelOption.id}
                onPress={() => handleLevelSelect(levelOption.id)}
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
  optionsScroll: {
    flex: 1,
  },
  optionsContainer: {
    paddingBottom: spacing.lg,
  },
});

export default StepLevel;