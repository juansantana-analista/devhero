import { typography } from '../theme/typography';

// Utilitário para aplicar estilos de texto consistentes
export const getTextStyle = (variant = 'body', customStyle = {}) => {
  const baseStyle = {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...typography[variant],
    ...customStyle,
  };

  return baseStyle;
};

// Estilos específicos para evitar texto achatado
export const textStyles = {
  // Estilos base
  base: {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  // Estilos para títulos
  title: {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontWeight: '600',
  },
  
  // Estilos para botões
  button: {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontWeight: '600',
  },
  
  // Estilos para texto do corpo
  body: {
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontWeight: '400',
  },
};
