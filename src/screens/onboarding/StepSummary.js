import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

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
            <Text style={styles.title}>
              Perfeito! Preparando sua primeira missão personalizada…
            </Text>
          </View>

          {/* Resumo das Escolhas */}
          <View style={styles.summaryContainer}>
            {/* Linguagens */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>🎯 Linguagens escolhidas:</Text>
              <Text style={styles.sectionContent}>
                {languages.map(lang => languageLabels[lang]).join(', ')}
              </Text>
            </View>

            {/* Nível */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>📊 Seu nível:</Text>
              <Text style={styles.sectionContent}>
                {levelLabels[level]}
              </Text>
            </View>

            {/* Meta Diária */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>⏰ Meta diária:</Text>
              <Text style={styles.sectionContent}>
                {dailyGoalMin} minutos por dia
              </Text>
            </View>

            {/* Motivações */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>💪 Suas motivações:</Text>
              <Text style={styles.sectionContent}>
                {motivation.map(mot => motivationLabels[mot]).join(', ')}
              </Text>
            </View>
          </View>

          {/* Loading Indicator quando carregando */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>
                Criando sua jornada personalizada...
              </Text>
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
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.h2.fontSize,
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
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  sectionContent: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed * typography.body.fontSize,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default StepSummary;