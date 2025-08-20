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

const StepLanguages = ({ navigation }) => {
  const { languages, setLanguages } = useOnboardingStore();
  const [selectedLanguages, setSelectedLanguages] = useState(languages);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  const languageOptions = [
    { id: 'html', title: 'HTML', icon: '🌐', description: 'Estrutura de páginas web' },
    { id: 'css', title: 'CSS', icon: '🎨', description: 'Estilização e design' },
    { id: 'javascript', title: 'JavaScript', icon: '⚡', description: 'Interatividade e lógica' },
    { id: 'python', title: 'Python', icon: '🐍', description: 'Programação versátil' },
    { id: 'php', title: 'PHP', icon: '🚀', description: 'Desenvolvimento web backend' },
  ];

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepLanguages: Componente montado');
  }, []);

  const handleLanguageSelect = (languageId) => {
    const isSelected = selectedLanguages.includes(languageId);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedLanguages.filter(id => id !== languageId);
    } else {
      newSelection = [...selectedLanguages, languageId];
    }
    
    setSelectedLanguages(newSelection);
    setLanguages(newSelection);
    
    // Haptic feedback
    safeHaptics.selection();
  };

  const handleContinue = () => {
    if (selectedLanguages.length > 0) {
      navigation.navigate('StepLevel');
    }
  };

  const handleTypewriterComplete = useCallback(() => {
    setIsTypewriterComplete(true);
  }, []);

  const canContinue = selectedLanguages.length > 0;

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.33} /> {/* 2/6 = ~0.33 */}
        
        <View style={styles.content}>
          {/* Avatar e Speech Bubble na mesma linha */}
          <View style={styles.headerRow}>
            <View style={styles.avatarContainer}>
              <HeroAvatar size={spacing.lg * 4} />
            </View>
            
            <View style={styles.bubbleContainer}>
              <SpeechBubble animate={true} arrowDirection="left">
                <TypewriterText 
                  text="Qual linguagem você quer aprender primeiro?"
                  speed={50}
                  onComplete={handleTypewriterComplete}
                />
              </SpeechBubble>
            </View>
          </View>

          {/* Opções de Linguagens */}
          <ScrollView 
            style={styles.optionsScroll}
            contentContainerStyle={styles.optionsContainer}
            showsVerticalScrollIndicator={false}
          >
            {languageOptions.map((language) => (
              <OptionCard
                key={language.id}
                title={language.title}
                description={language.description}
                icon={language.icon}
                selected={selectedLanguages.includes(language.id)}
                onPress={() => handleLanguageSelect(language.id)}
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

export default StepLanguages;