import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import HeroAvatar from '../../components/HeroAvatar';
import SpeechBubble from '../../components/SpeechBubble';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import TypewriterText from '../../components/TypewriterText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepIntro = ({ navigation }) => {
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  
  const message = "Oi, eu sou seu guia DevHero! Só 6 passos rápidos e começamos sua primeira missão.";

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepIntro: Componente montado');
  }, []);

  const handleContinue = useCallback(() => {
    navigation.navigate('StepLanguages');
  }, [navigation]);

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
        <ProgressBar progress={0.17} />
        
        <View style={styles.content}>
          {/* Speech Bubble */}
          <View style={styles.bubbleContainer}>
            <SpeechBubble animate={true}>
              <TypewriterText 
                text={message}
                speed={50}
                onComplete={handleTypewriterComplete}
              />
            </SpeechBubble>
          </View>

          {/* Avatar Central */}
          <View style={styles.avatarContainer}>
            <HeroAvatar size={spacing.avatarSize} />
          </View>
        </View>

        {/* Bottom CTA */}
        <BottomCTA
          primaryTitle="COMEÇAR"
          primaryOnPress={handleContinue}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.bottomSafeArea,
  },
  avatarContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
});

export default StepIntro;