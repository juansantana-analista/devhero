import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const ProgressBar = ({ progress = 0, style }) => {
  const widthAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.track}>
        <Animated.View style={[styles.progressContainer, { width: animatedWidth }]}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.progress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
  },
  track: {
    height: spacing.progressBarHeight,
    backgroundColor: colors.surfaceLight,
    borderRadius: spacing.progressBarHeight / 2,
    overflow: 'hidden',
  },
  progressContainer: {
    height: '100%',
  },
  progress: {
    height: '100%',
    borderRadius: spacing.progressBarHeight / 2,
  },
});

export default ProgressBar;