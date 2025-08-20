import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroAvatar from '../components/HeroAvatar';
import BottomCTA from '../components/BottomCTA';
import FixedText from '../components/FixedText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStartOnboarding = () => {
    navigation.navigate('Onboarding');
  };

  const handleLogin = () => {
    // TODO: Navegar para tela de Login quando criada
    console.log('Navegar para Login');
  };

  return (
    <LinearGradient
      colors={colors.backgroundGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Título opcional */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <FixedText variant="h1" color={colors.textPrimary} accessibilityRole="header">
              DevHero
            </FixedText>
          </Animated.View>

          {/* Avatar Central */}
          <View style={styles.avatarContainer}>
            <HeroAvatar size={spacing.avatarSize} />
          </View>

          {/* Tagline */}
          <Animated.View 
            style={[
              styles.taglineContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <FixedText variant="bodyLarge" color={colors.textSecondary}>
              O jeito grátis, divertido e eficaz de aprender a programar.
            </FixedText>
          </Animated.View>
        </View>

        {/* Botões CTA fixos na parte inferior */}
        <BottomCTA
          primaryTitle="COMEÇAR AGORA"
          primaryOnPress={handleStartOnboarding}
          secondaryTitle="JÁ TENHO UMA CONTA"
          secondaryOnPress={handleLogin}
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
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  avatarContainer: {
    marginVertical: spacing.xl,
  },
  taglineContainer: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  tagline: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.bodyLarge.fontSize,
  },
});

export default WelcomeScreen;