import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import FixedText from '../../components/FixedText';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepSummary = ({ navigation }) => {
  const { languages, level, dailyGoalMin, motivation, setCompleted } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);

  const languageLabels = {
    html: 'HTML',
    css: 'CSS', 
    javascript: 'JavaScript',
    python: 'Python',
    php: 'PHP'
  };

  const levelLabels = {
    beginner: 'Nunca programei',
    basic: 'Conheço o básico',
    intermediate: 'Já fiz alguns exercícios',
    advanced: 'Consigo resolver problemas simples'
  };

  const motivationLabels = {
    career: 'Trabalho/Carreira',
    education: 'Faculdade/Escola',
    personal: 'Projetos pessoais',
    interviews: 'Concursos/Entrevistas'
  };

  const handleStartMission = async () => {
    setIsLoading(true);
    
    // Simular preparação da primeira missão
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCompleted(true);
    
    // Haptic de sucesso
    safeHaptics.notification(Haptics.NotificationFeedbackType.Success);
    
    // TODO: Navegar para Home/Mapa quando criado
    console.log('Navegar para Home/Mapa - Primeira Missão');
    console.log('Dados do onboarding:', {
      languages,
      level,
      dailyGoalMin,
      motivation
    });
    
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={1} /> {/* 6/6 = 1 */}
        
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Título Principal */}
          <View style={styles.header}>
            <FixedText variant="h2" color={colors.textPrimary} style={styles.title}>
              Perfeito! Preparando sua primeira missão personalizada…
            </FixedText>
          </View>

          {/* Resumo das Escolhas */}
          <View style={styles.summaryContainer}>
            {/* Linguagens */}
            <View style={styles.summarySection}>
              <FixedText variant="h3" color={colors.primary} style={styles.sectionTitle}>
                🎯 Linguagens escolhidas:
              </FixedText>
              <FixedText variant="body" color={colors.textSecondary} style={styles.sectionContent}>
                {languages.map(lang => languageLabels[lang]).join(', ')}
              </FixedText>
            </View>

            {/* Nível */}
            <View style={styles.summarySection}>
              <FixedText variant="h3" color={colors.primary} style={styles.sectionTitle}>
                📊 Seu nível:
              </FixedText>
              <FixedText variant="body" color={colors.textSecondary} style={styles.sectionContent}>
                {levelLabels[level]}
              </FixedText>
            </View>

            {/* Meta Diária */}
            <View style={styles.summarySection}>
              <FixedText variant="h3" color={colors.primary} style={styles.sectionTitle}>
                ⏰ Meta diária:
              </FixedText>
              <FixedText variant="body" color={colors.textSecondary} style={styles.sectionContent}>
                {dailyGoalMin} minutos por dia
              </FixedText>
            </View>

            {/* Motivações */}
            <View style={styles.summarySection}>
              <FixedText variant="h3" color={colors.primary} style={styles.sectionTitle}>
                💪 Suas motivações:
              </FixedText>
              <FixedText variant="body" color={colors.textSecondary} style={styles.sectionContent}>
                {motivation.map(mot => motivationLabels[mot]).join(', ')}
              </FixedText>
            </View>
          </View>

          {/* Loading Indicator quando carregando */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <FixedText variant="body" color={colors.textSecondary} style={styles.loadingText}>
                Criando sua jornada personalizada...
              </FixedText>
            </View>
          )}
        </ScrollView>

        {/* Bottom CTA */}
        <BottomCTA
          primaryTitle="COMEÇAR MISSÃO"
          primaryOnPress={handleStartMission}
          primaryLoading={isLoading}
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
  summaryContainer: {
    backgroundColor: colors.surface,
    borderRadius: spacing.cardRadius,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summarySection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  sectionContent: {
    // Estilo já definido no FixedText
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default StepSummary;