import * as Haptics from 'expo-haptics';

export const safeHaptics = {
  impact: (style) => {
    try {
      Haptics.impactAsync(style);
    } catch (error) {
      console.log('Haptics impact não disponível:', error);
    }
  },
  
  selection: () => {
    try {
      Haptics.selectionAsync();
    } catch (error) {
      console.log('Haptics selection não disponível:', error);
    }
  },
  
  notification: (type) => {
    try {
      Haptics.notificationAsync(type);
    } catch (error) {
      console.log('Haptics notification não disponível:', error);
    }
  }
};
