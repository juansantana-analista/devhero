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

const StepLanguages = ({ navigation }) => {
  const { languages, setLanguages } = useOnboardingStore();
  const [selectedLanguages, setSelectedLanguages] = useState(languages);

  const languageOptions = [
    { id: 'html', title: 'HTML', icon: '🌐', description: 'Estrutura de páginas web' },
    { id: 'css', title: 'CSS', icon: '🎨', description: 'Estilização e design' },
    { id: 'javascript', title: 'JavaScript', icon: '⚡', description: 'Interatividade e lógica' },
    { id: 'python', title: 'Python', icon: '🐍', description: 'Programação versátil' },
    { id: 'php', title: 'PHP', icon: '🚀', description: 'Desenvolvimento web backend' },
  ];

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

  const canContinue = selectedLanguages.length > 0;

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={0.33} /> {/* 2/6 = ~0.33 */}
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título */}
          <View style={styles.header}>
            <FixedText variant="h2" color={colors.textPrimary} style={styles.title}>
              Qual linguagem você quer aprender primeiro?
            </FixedText>
          </View>

          {/* Opções de Linguagens */}
          <View style={styles.optionsContainer}>
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

export default StepLanguages;