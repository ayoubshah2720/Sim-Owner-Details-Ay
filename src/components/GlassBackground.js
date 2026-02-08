import React from 'react';
import { View, StyleSheet } from 'react-native';
import { glassColors } from '../theme/glass';

export default function GlassBackground() {
  return (
    <View pointerEvents="none" style={styles.root}>
      <View style={styles.haze} />
      <View style={styles.blobLeft} />
      <View style={styles.blobTop} />
      <View style={styles.blobRight} />
      <View style={styles.blobBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  haze: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: glassColors.background,
  },
  blobLeft: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 120,
    backgroundColor: glassColors.accentSoft2,
    left: -80,
    top: 140,
  },
  blobTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: glassColors.accentSoft,
    right: -40,
    top: -40,
  },
  blobRight: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: glassColors.accentSoft2,
    right: -60,
    top: 220,
  },
  blobBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 140,
    backgroundColor: glassColors.accentSoft,
    left: 60,
    bottom: -80,
  },
});
