import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import FixedText from './FixedText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const SecondaryButton = ({ title, onPress, disabled = false, style }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      tension: 150,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 150,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        { transform: [{ scale: scaleAnim }] },
        style
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.container, { opacity: disabled ? 0.6 : 1 }]}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled }}
      >
        <FixedText 
          variant="button"
          color={colors.textSecondary}
        >
          {title}
        </FixedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.buttonRadius,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.bottomButtonHeight,
    backgroundColor: 'transparent',
  },
  text: {
    ...typography.button,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SecondaryButton;