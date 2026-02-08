import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from 'react-native';
import GlassBackground from '../components/GlassBackground';
import { glassCard, glassColors } from '../theme/glass';

export default function Disclaimer({ navigation }) {
  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
      <GlassBackground />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Important Notice</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.bodyText}>
            Sim Info & Network Finder is an independent, privately developed
            application with no affiliation to any government entity or official
            organization. The app provides publicly available information solely
            for user assistance. Any misuse of this information is strictly the
            responsibility of the user. We do not endorse or facilitate any
            unauthorized use of personal data.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Data Source & Ownership</Text>
          <Text style={styles.bodyText}>
            All data displayed within the app is sourced from publicly accessible
            websites, and the respective owners retain all rights to this
            information. We do not store, modify, or claim ownership of any data
            accessed through our platform. By using this app, you agree to use
            the information responsibly and in compliance with applicable laws.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <Text style={styles.exitText}>Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.agreeButton}
            onPress={() => navigation.replace('Dashboard')}
          >
            <Text style={styles.agreeText}>Agree & Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: glassColors.background,
  },
  header: {
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    ...glassCard,
  },
  headerTitle: {
    color: glassColors.textStrong,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  card: {
    padding: 16,
    ...glassCard,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: glassColors.textStrong,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
    color: glassColors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: glassColors.glassBorder,
    marginVertical: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  exitButton: {
    flex: 1,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  exitText: {
    color: glassColors.textStrong,
    fontWeight: '700',
  },
  agreeButton: {
    flex: 1.5,
    backgroundColor: glassColors.accent,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  agreeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
