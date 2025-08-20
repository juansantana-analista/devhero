import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const BottomCTA = ({ 
  primaryTitle, 
  primaryOnPress, 
  primaryDisabled = false,
  primaryLoading = false,
  secondaryTitle, 
  secondaryOnPress,
  showSecondary = true,
  style 
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }, style]}>
      <LinearGradient
        colors={['transparent', colors.overlay]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <PrimaryButton
          title={primaryTitle}
          onPress={primaryOnPress}
          disabled={primaryDisabled}
          loading={primaryLoading}
          style={styles.primaryButton}
        />
        {showSecondary && secondaryTitle && (
          <SecondaryButton
            title={secondaryTitle}
            onPress={secondaryOnPress}
            style={styles.secondaryButton}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: spacing.xl,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
});

export default BottomCTA;