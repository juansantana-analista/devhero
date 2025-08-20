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

const StepLevel = ({ navigation }) => {
  const { level, setLevel } = useOnboardingStore();
  const [selectedLevel, setSelectedLevel] = useState(level);

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

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.5} /> {/* 3/6 = 0.5 */}
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <View style={styles.header}>
            <FixedText variant="h2" color={colors.textPrimary} style={styles.title}>
              Qual é o seu nível hoje?
            </FixedText>
          </View>

          {/* Opções de Nível */}
          <View style={styles.optionsContainer}>
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
  },
  optionsContainer: {
    flex: 1,
  },
});

export default StepLevel;