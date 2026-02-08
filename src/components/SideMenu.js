import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import DrawerContent from './DrawerContent';

const MENU_WIDTH = 280;

export default function SideMenu({ visible, onClose, onNavigate }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-MENU_WIDTH, 0],
  });

  const overlayOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  return (
    <View pointerEvents={visible ? 'auto' : 'none'} style={styles.root}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.overlayShade, { opacity: overlayOpacity }]} />
      </Pressable>
      <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
        <DrawerContent onNavigate={onNavigate} onClose={onClose} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
  },
});
