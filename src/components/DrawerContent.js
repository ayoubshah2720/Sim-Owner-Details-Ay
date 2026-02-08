import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { glassCard, glassColors } from '../theme/glass';
import {
  PRIVACY_POLICY_URL,
  RATE_US_URL,
  MORE_APPS_URL,
  SHARE_APP_URL,
  SHARE_APP_MESSAGE,
} from '../config/links';

const items = [
  { key: 'share', label: 'Share App', icon: 'share-social' },
  { key: 'privacy', label: 'Privacy Policy', icon: 'shield-checkmark' },
  { key: 'disclaimer', label: 'Disclaimer', icon: 'alert-circle' },
  { key: 'rate', label: 'Rate Us', icon: 'star' },
  { key: 'more', label: 'More Apps', icon: 'apps' },
];

export default function DrawerContent({ navigation, onNavigate, onClose }) {
  const openUrl = async url => {
    if (!url) {
      Alert.alert('Link Missing', 'Please set the URL in src/config/links.js');
      return;
    }
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      Alert.alert('Cannot Open Link', 'The provided URL is invalid.');
      return;
    }
    Linking.openURL(url);
  };

  const handleShare = async () => {
    const message = SHARE_APP_URL
      ? `${SHARE_APP_MESSAGE}\n${SHARE_APP_URL}`
      : SHARE_APP_MESSAGE;
    await Share.share({ message });
  };

  const go = (route, params) => {
    if (onNavigate) {
      onNavigate(route, params);
    } else if (navigation) {
      navigation.navigate(route, params);
    }
    if (onClose) {
      onClose();
    }
  };

  const handlePress = key => {
    if (key === 'share') {
      handleShare();
      return;
    }
    if (key === 'privacy') {
      openUrl(PRIVACY_POLICY_URL);
      return;
    }
    if (key === 'disclaimer') {
      go('Disclaimer');
      return;
    }
    if (key === 'rate') {
      openUrl(RATE_US_URL);
      return;
    }
    if (key === 'more') {
      openUrl(MORE_APPS_URL);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <Text style={styles.subtitle}>Sim Owner Details</Text>
      </View>
      <View style={styles.menuCard}>
        {items.map(item => (
          <TouchableOpacity
            key={item.key}
            style={styles.row}
            onPress={() => handlePress(item.key)}
          >
            <View style={styles.iconWrap}>
              <Icon name={item.icon} size={18} color={glassColors.textStrong} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: glassColors.background,
    padding: 16,
    gap: 16,
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: glassColors.textStrong,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: glassColors.textMuted,
  },
  menuCard: {
    padding: 12,
    ...glassCard,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
  },
  label: {
    fontSize: 15,
    color: glassColors.textPrimary,
    fontWeight: '600',
  },
});
