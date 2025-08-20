import React from 'react';
import { Text } from 'react-native';

// Componente de texto que força a correção do problema de achatamento
const FixedText = ({ children, style, variant = 'body', color, ...props }) => {
  const baseStyle = {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
  };

  // Estilos específicos para cada variante
  const variantStyles = {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 32 * 1.2,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 24 * 1.3,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 18 * 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 16 * 1.4,
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 18 * 1.4,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 16 * 1.4,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 14 * 1.4,
    },
  };

  const finalStyle = [
    baseStyle,
    variantStyles[variant],
    color && { color },
    style,
  ];

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
};

export default FixedText;
