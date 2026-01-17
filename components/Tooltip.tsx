import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SIZES } from '@/constants/sizes';

interface TooltipProps {
  text: string;
}

const Tooltip = ({ text }: TooltipProps) => {
  return (
    <View style={styles.container}>
      {/* The Bubble */}
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 200,
    bottom: 20,
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  bubble: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 8,
    // Shadow for depth
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    color: '#fff',
    fontSize: SIZES.radius,
    fontFamily: 'medium',
    textAlign: 'center',
  }
});

export default Tooltip;