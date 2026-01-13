import React, { useState, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Tooltip from './Tooltip';

export const TooltipWrapper = ({ children, text }: { children: React.ReactNode; text: string | undefined }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const show = () => {
      setVisible(true);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPressIn={show}   // Starts timer when finger touches
        onPressOut={hide}         // Hides when finger lifts
        onHoverIn={show}   // Web support
        onHoverOut={hide}         // Web support
        delayLongPress={500}
      >
        {children}
      </Pressable>

      {visible && <Tooltip text={text || ''} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'flex-end',
  },
});