import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const TypewriterText = ({ 
  text, 
  speed = 50, 
  onComplete, 
  style, 
  textStyle,
  showCursor = true,
  cursorColor = colors.primary,
  cursorWidth = 2
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [textHeight, setTextHeight] = useState(20);
  const cursorAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (text && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  useEffect(() => {
    if (showCursor) {
      const cursorAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(cursorAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(cursorAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      );
      cursorAnimation.start();

      return () => cursorAnimation.stop();
    }
  }, [showCursor, cursorAnim]);

  const cursorOpacity = cursorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleTextLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setTextHeight(height);
  };

  return (
    <View style={[styles.container, style]}>
      <Text 
        style={[styles.text, textStyle]} 
        onLayout={handleTextLayout}
      >
        {displayText}
      </Text>
      {showCursor && (
        <Animated.View 
          style={[
            styles.cursor,
            {
              opacity: cursorOpacity,
              backgroundColor: cursorColor,
              width: cursorWidth,
              height: textHeight,
            }
          ]} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: colors.textPrimary,
  },
  cursor: {
    marginLeft: 2,
    borderRadius: 1,
  },
});

export default TypewriterText;
