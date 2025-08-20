import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { safeHaptics } from '../../utils/haptics';
import * as Haptics from 'expo-haptics';
import HeroAvatar from '../../components/HeroAvatar';
import SpeechBubble from '../../components/SpeechBubble';
import BottomCTA from '../../components/BottomCTA';
import ProgressBar from '../../components/ProgressBar';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const StepIntro = ({ navigation }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const messages = [
    "Oi, eu sou seu guia DevHero!",
    "Só 6 passos rápidos e começamos sua primeira missão."
  ];

  useEffect(() => {
    // Vibração leve de boas-vindas
    safeHaptics.impact(Haptics.ImpactFeedbackStyle.Light);
    console.log('StepIntro: Componente montado');
  }, []);

  const handleContinue = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(prev => prev + 1);
      safeHaptics.selection();
      console.log('StepIntro: Mensagem alterada para:', currentMessage + 1);
    } else {
      navigation.navigate('StepLanguages');
    }
  };

  const buttonTitle = currentMessage < messages.length - 1 ? 'CONTINUAR' : 'COMEÇAR';

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
            <SpeechBubble key={currentMessage} animate={currentMessage === 0}>
              {messages[currentMessage]}
            </SpeechBubble>
          </View>

          {/* Avatar Central */}
          <View style={styles.avatarContainer}>
            <HeroAvatar key={`avatar-${currentMessage}`} size={spacing.avatarSize} />
          </View>
        </View>

        {/* Bottom CTA */}
        <BottomCTA
          primaryTitle={buttonTitle}
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