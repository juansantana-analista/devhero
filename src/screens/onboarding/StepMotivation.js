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

const StepMotivation = ({ navigation }) => {
  const { motivation, setMotivation } = useOnboardingStore();
  const [selectedMotivations, setSelectedMotivations] = useState(motivation);

  const motivationOptions = [
    { 
      id: 'career', 
      title: 'Trabalho/Carreira', 
      icon: '💼',
      description: 'Crescer profissionalmente'
    },
    { 
      id: 'education', 
      title: 'Faculdade/Escola', 
      icon: '🎓',
      description: 'Complementar estudos'
    },
    { 
      id: 'personal', 
      title: 'Projetos pessoais', 
      icon: '🛠️',
      description: 'Criar suas próprias soluções'
    },
    { 
      id: 'interviews', 
      title: 'Concursos/Entrevistas', 
      icon: '🎯',
      description: 'Preparar para seleções'
    },
  ];

  const handleMotivationSelect = (motivationId) => {
    const isSelected = selectedMotivations.includes(motivationId);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedMotivations.filter(id => id !== motivationId);
    } else {
      newSelection = [...selectedMotivations, motivationId];
    }
    
    setSelectedMotivations(newSelection);
    setMotivation(newSelection);
    
    // Haptic feedback
    safeHaptics.selection();
  };

  const handleContinue = () => {
    if (selectedMotivations.length > 0) {
      navigation.navigate('StepSummary');
    }
  };

  const canContinue = selectedMotivations.length > 0;

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.83} /> {/* 5/6 = ~0.83 */}
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <View style={styles.header}>
            <FixedText variant="h2" color={colors.textPrimary} style={styles.title}>
              Por que você quer aprender?
            </FixedText>
          </View>

          {/* Opções de Motivação */}
          <View style={styles.optionsContainer}>
            {motivationOptions.map((motivationOption) => (
              <OptionCard
                key={motivationOption.id}
                title={motivationOption.title}
                description={motivationOption.description}
                icon={motivationOption.icon}
                selected={selectedMotivations.includes(motivationOption.id)}
                onPress={() => handleMotivationSelect(motivationOption.id)}
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

export default StepMotivation;