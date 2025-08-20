import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import HeroAvatar from '../../components/HeroAvatar';
import SpeechBubble from '../../components/SpeechBubble';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import TypewriterText from '../../components/TypewriterText';
import FixedText from '../../components/FixedText';
import { useOnboardingStore } from '../../state/useOnboardingStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepSummary = ({ navigation }) => {
  const { languages, level, dailyGoalMin, motivation, setCompleted } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

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

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepSummary: Componente montado');
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
        <ProgressBar progress={1} /> {/* 6/6 = 1 */}
        
        <View style={styles.content}>
          {/* Speech Bubble e Avatar na mesma linha (invertido) */}
          <View style={styles.headerRow}>
            <View style={styles.bubbleContainer}>
              <SpeechBubble animate={true} arrowDirection="right">
                <TypewriterText 
                  text="Perfeito! Preparando sua primeira missão personalizada…"
                  speed={50}
                  onComplete={handleTypewriterComplete}
                />
              </SpeechBubble>
            </View>
            
            <View style={styles.avatarContainer}>
              <HeroAvatar size={spacing.lg * 4} />
            </View>
          </View>

          {/* Resumo das Escolhas */}
          <ScrollView 
            style={styles.summaryScroll}
            contentContainerStyle={styles.summaryContainer}
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>

          {/* Loading Indicator quando carregando */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <FixedText variant="body" color={colors.textSecondary} style={styles.loadingText}>
                Criando sua jornada personalizada...
              </FixedText>
            </View>
          )}
        </View>

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
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.bottomSafeArea,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  bubbleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avatarContainer: {
    marginLeft: spacing.md,
  },
  summaryScroll: {
    flex: 1,
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