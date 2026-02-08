import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import GlassBackground from '../components/GlassBackground';
import { glassColors } from '../theme/glass';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Disclaimer');
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <GlassBackground />
      <Image
        source={require('../assets/images/main-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: glassColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
});
