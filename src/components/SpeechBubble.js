import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import FixedText from './FixedText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const SpeechBubble = ({ children, variant = 'default', style, animate = true, arrowDirection = 'bottom' }) => {
  const fadeAnim = useRef(new Animated.Value(animate ? 0 : 1)).current;
  const scaleAnim = useRef(new Animated.Value(animate ? 0.8 : 1)).current;

  useEffect(() => {
    if (animate) {
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
    }
  }, [animate, fadeAnim, scaleAnim]);

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

  const getPointerStyle = () => {
    const baseStyle = {
      position: 'absolute',
      width: 16,
      height: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      transform: [{ rotate: '45deg' }],
    };

    switch (arrowDirection) {
      case 'left':
        return {
          ...baseStyle,
          left: -8,
          top: '50%',
          marginTop: -8,
          borderTopWidth: 0,
          borderRightWidth: 0,
        };
      case 'right':
        return {
          ...baseStyle,
          right: -8,
          top: '50%',
          marginTop: -8,
          borderTopWidth: 0,
          borderLeftWidth: 0,
        };
      case 'top':
        return {
          ...baseStyle,
          top: -8,
          left: '50%',
          marginLeft: -8,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
        };
      default: // bottom
        return {
          ...baseStyle,
          bottom: -8,
          left: '50%',
          marginLeft: -8,
          borderTopWidth: 0,
          borderLeftWidth: 0,
        };
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <View style={[styles.bubble, getVariantStyle()]}>
        {typeof children === 'string' ? (
          <FixedText variant="body" color={colors.textPrimary} style={styles.text}>
            {children}
          </FixedText>
        ) : (
          children
        )}
        <View style={[styles.pointer, getPointerStyle()]} />
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
    textAlign: 'center',
  },
  pointer: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    transform: [{ rotate: '45deg' }],
  },
});

export default SpeechBubble;