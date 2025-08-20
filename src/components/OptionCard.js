import React, { useRef } from 'react';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import FixedText from './FixedText';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const OptionCard = ({ 
  title, 
  description, 
  icon, 
  selected = false, 
  onPress, 
  disabled = false,
  style 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.98,
        tension: 150,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 150,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  };

  const cardStyle = selected 
    ? [styles.card, styles.selectedCard] 
    : styles.card;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[cardStyle, { opacity: disabled ? 0.5 : 1 }]}
        accessibilityRole="button"
        accessibilityLabel={`${title}${description ? `, ${description}` : ''}`}
        accessibilityState={{ selected, disabled }}
      >
        <View style={styles.content}>
          {icon && (
            <View style={styles.iconContainer}>
              <FixedText style={styles.icon}>{icon}</FixedText>
            </View>
          )}
          <View style={styles.textContainer}>
            <FixedText 
              variant="h3" 
              color={selected ? colors.textPrimary : colors.textSecondary}
              style={styles.title}
            >
              {title}
            </FixedText>
            {description && (
              <FixedText 
                variant="caption" 
                color={selected ? colors.textSecondary : colors.textMuted}
                style={styles.description}
              >
                {description}
              </FixedText>
            )}
          </View>
        </View>
        {selected && <View style={styles.selectedIndicator} />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.cardRadius,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryOpacity,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    // Estilo já definido no FixedText
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OptionCard;