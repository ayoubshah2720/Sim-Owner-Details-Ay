import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import GlassBackground from '../components/GlassBackground';
import { glassCard, glassColors } from '../theme/glass';

function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value || 'N/A'}</Text>
    </View>
  );
}

export default function CheckAllSimsDetail({ navigation, route, onMenuPress }) {
  const payload = route?.params?.payload;
  const notice = route?.params?.notice;

  const results = Array.isArray(payload?.data) ? payload.data : [];

  const handleCopy = item => {
    Clipboard.setString(JSON.stringify(item, null, 2));
  };

  const handleShare = async item => {
    try {
      await Share.share({ message: JSON.stringify(item, null, 2) });
    } catch (err) {
      // ignore
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <GlassBackground />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Icon name="menu" size={20} color={glassColors.textStrong} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CNIC Details</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="arrow-back" size={20} color={glassColors.textStrong} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {(notice?.message || results.length === 0) ? (
          <View style={styles.notice}>
            <Text style={styles.noticeText}>
              {notice?.message ||
                'Our team is actively working on updating the data. For now, the information available in the app is up to 2022. We appreciate your understanding.'}
            </Text>
          </View>
        ) : (
          results.map((item, index) => (
            <View key={`${item.number || index}`} style={styles.card}>
              <Text style={styles.cardTitle}>SIM {index + 1}</Text>
              <DetailRow label="Name" value={item.name} />
              <DetailRow label="CNIC" value={item.cnic} />
              <DetailRow label="Number" value={item.number} />
              <DetailRow label="Operator" value={item.operator} />
              <DetailRow label="Address" value={item.address} />
              <DetailRow label="Registration" value={item.registrationDate} />
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCopy(item)}
                >
                  <Text style={styles.actionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShare(item)}
                >
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    ...glassCard,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: glassColors.textStrong,
    letterSpacing: 0.3,
  },
  menuButton: {
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
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  notice: {
    backgroundColor: glassColors.glassFill,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
  },
  noticeText: {
    color: glassColors.textPrimary,
    fontSize: 15,
  },
  card: {
    padding: 16,
    ...glassCard,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: glassColors.textStrong,
    marginBottom: 10,
  },
  row: {
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 13,
    color: glassColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 16,
    color: glassColors.textStrong,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: glassColors.textStrong,
  },
});
