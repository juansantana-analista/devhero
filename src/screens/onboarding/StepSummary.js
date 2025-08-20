import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Animated } from 'react-native';
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
  const [showMissionMode, setShowMissionMode] = useState(false);
  
  const avatarScaleAnim = useRef(new Animated.Value(1)).current;

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
    
    // Ativar modo missão - limpar tela e animar avatar
    setShowMissionMode(true);
    
    // Animar avatar do canto superior direito para o centro com zoom
    Animated.spring(avatarScaleAnim, {
      toValue: 2.5,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
    
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

  const getAvatarStyle = () => {
    if (!showMissionMode) {
      return styles.avatarContainer;
    }
    
    return {
      ...styles.avatarContainer,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [
        { scale: avatarScaleAnim },
      ],
      zIndex: 1000,
    };
  };

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Progress Bar */}
        <ProgressBar progress={1} /> {/* 6/6 = 1 */}
        
        {!showMissionMode ? (
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
          </View>
        ) : (
          /* Modo Missão - Avatar centralizado com zoom */
          <View style={styles.missionModeContainer}>
            <Animated.View style={getAvatarStyle()}>
              <HeroAvatar size={spacing.lg * 4} />
            </Animated.View>
            
            {/* Loader embaixo */}
            <View style={styles.missionLoaderContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <FixedText variant="body" color={colors.textSecondary} style={styles.missionLoaderText}>
                Preparando sua primeira missão...
              </FixedText>
            </View>
          </View>
        )}

        {/* Bottom CTA - Só mostra quando não está no modo missão */}
        {!showMissionMode && (
          <BottomCTA
            primaryTitle="COMEÇAR MISSÃO"
            primaryOnPress={handleStartMission}
            primaryLoading={isLoading}
            showSecondary={false}
          />
        )}
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
  missionModeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  missionLoaderContainer: {
    position: 'absolute',
    bottom: spacing.xl * 2,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  missionLoaderText: {
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default StepSummary;