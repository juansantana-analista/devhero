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

const StepMotivation = ({ navigation }) => {
  const { motivation, setMotivation } = useOnboardingStore();
  const [selectedMotivations, setSelectedMotivations] = useState(motivation);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

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

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepMotivation: Componente montado');
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
        <ProgressBar progress={0.83} /> {/* 5/6 = ~0.83 */}
        
        <View style={styles.content}>
          {/* Avatar e Speech Bubble na mesma linha */}
          <View style={styles.headerRow}>
            <View style={styles.avatarContainer}>
              <HeroAvatar size={spacing.lg * 4} />
            </View>
            
            <View style={styles.bubbleContainer}>
              <SpeechBubble animate={true} arrowDirection="left">
                <TypewriterText 
                  text="Por que você quer aprender?"
                  speed={50}
                  onComplete={handleTypewriterComplete}
                />
              </SpeechBubble>
            </View>
          </View>

          {/* Opções de Motivação */}
          <ScrollView 
            style={styles.optionsScroll}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
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

export default StepMotivation;