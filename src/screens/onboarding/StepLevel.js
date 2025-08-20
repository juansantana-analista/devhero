import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import OptionCard from '../../components/OptionCard';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

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
            <Text style={styles.title}>
              Qual é o seu nível hoje?
            </Text>
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
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.h2.fontSize,
  },
  optionsContainer: {
    flex: 1,
  },
});

export default StepLevel;