import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GlassBackground from '../components/GlassBackground';
import { glassCard, glassColors } from '../theme/glass';

const cards = [
  {
    id: 'sim',
    title: 'SIM OWNER DETAILS',
    button: 'Check Now >',
  },
  {
    id: 'cnic',
    title: 'CHECK CNIC INFO',
    button: 'Check Now >',
  },
];

function DashboardCard({ title, button, onPress, iconName }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardGlow} />
      <View style={styles.cardHighlight} />
      <View style={styles.cardContent}>
        <View style={styles.iconCircle}>
          <Icon name={iconName} size={26} color="#0B5D2A" />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.cardButton}
          onPress={onPress}
          disabled={!onPress}
        >
          <Text style={styles.cardButtonText}>{button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Dashboard({ onSimPress, onCnicPress, onMenuPress }) {
  return (
    <SafeAreaView style={styles.safe}>
      <GlassBackground />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Icon name="menu" size={20} color={glassColors.textStrong} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sim Owner Details 2026</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {cards.map(item => (
          <DashboardCard
            key={item.id}
            title={item.title}
            button={item.button}
            iconName={item.id === 'sim' ? 'call' : 'id-card'}
            onPress={item.id === 'sim' ? onSimPress : onCnicPress}
          />
        ))}
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
  menuButton: {
    position: 'absolute',
    left: 12,
    top: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    minHeight: 150,
    overflow: 'hidden',
    ...glassCard,
  },
  cardGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 140,
    opacity: 0.6,
    top: -90,
    left: -40,
    backgroundColor: glassColors.accentSoft,
  },
  cardHighlight: {
    position: 'absolute',
    width: 200,
    height: 120,
    borderRadius: 120,
    opacity: 0.5,
    bottom: -40,
    right: -40,
    backgroundColor: glassColors.accentSoft2,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: glassColors.textStrong,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  cardButton: {
    marginTop: 2,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  cardButtonText: {
    color: glassColors.textStrong,
    fontWeight: '600',
    fontSize: 14,
  },
});
