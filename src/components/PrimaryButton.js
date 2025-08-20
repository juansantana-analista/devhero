import React, { useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FixedText from './FixedText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const PrimaryButton = ({ title, onPress, disabled = false, loading = false, style }) => {
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

  const isDisabled = disabled || loading;

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
        disabled={isDisabled}
        style={styles.container}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: isDisabled }}
      >
        <LinearGradient
          colors={isDisabled ? [colors.disabled, colors.disabled] : [colors.primary, colors.secondary]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color={colors.textPrimary} size="small" />
          ) : (
            <FixedText 
              variant="button"
              color={colors.textPrimary}
              style={{ opacity: isDisabled ? 0.6 : 1 }}
            >
              {title}
            </FixedText>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.buttonRadius,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.bottomButtonHeight,
  },
  text: {
    ...typography.button,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});

export default PrimaryButton;