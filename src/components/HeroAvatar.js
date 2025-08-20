import React, { useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const HeroAvatar = ({ size = 240, onPress, style }) => {
  const bounceAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0);
  const auraRotation = new Animated.Value(0);
  const auraPulse = new Animated.Value(1);

  useEffect(() => {
    // Animação de entrada
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação contínua da aura
    Animated.loop(
      Animated.parallel([
        Animated.timing(auraRotation, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(auraPulse, {
            toValue: 1.2,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(auraPulse, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      {
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
    opacity: scaleAnim,
  };

  const auraAnimatedStyle = {
    transform: [
      {
        rotate: auraRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
      { scale: auraPulse },
    ],
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={[styles.container, { width: size, height: size }, style]}
      accessibilityRole={onPress ? "button" : "image"}
      accessibilityLabel="Avatar do DevHero"
    >
             <Animated.View style={[styles.avatarWrapper, animatedStyle]}>
         {/* Aura de poder RPG */}
         <Animated.View style={[styles.powerAura, { width: size * 1.4, height: size * 1.4 }, auraAnimatedStyle]}>
           <Animated.View style={[styles.auraRing, { width: size * 1.2, height: size * 1.2 }]} />
           <Animated.View style={[styles.auraRing, { width: size * 1.1, height: size * 1.1 }]} />
           <Animated.View style={[styles.auraRing, { width: size * 1.0, height: size * 1.0 }]} />
         </Animated.View>
         
         {/* Imagem do herói */}
         <Image
           source={require('../../assets/images/hero.png')}
           style={[styles.heroImage, { width: size, height: size }]}
           resizeMode="contain"
         />
       </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  heroImage: {
    // A imagem será redimensionada automaticamente pelo resizeMode="contain"
  },
  powerAura: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraRing: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default HeroAvatar;