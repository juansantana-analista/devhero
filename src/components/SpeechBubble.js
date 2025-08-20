import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const SpeechBubble = ({ children, variant = 'default', style }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 120,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getVariantStyle = () => {
    switch (variant) {
      case 'info':
        return { backgroundColor: colors.secondaryOpacity, borderColor: colors.secondary };
      case 'success':
        return { backgroundColor: colors.successOpacity, borderColor: colors.success };
      default:
        return { backgroundColor: colors.surface, borderColor: colors.border };
    }
  };

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <View style={[styles.bubble, getVariantStyle()]}>
        {typeof children === 'string' ? (
          <Text style={styles.text}>{children}</Text>
        ) : (
          children
        )}
        <View style={[styles.pointer, getVariantStyle()]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  bubble: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxWidth: '90%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.body.fontSize,
  },
  pointer: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -8,
    width: 16,
    height: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    transform: [{ rotate: '45deg' }],
  },
});

export default SpeechBubble;