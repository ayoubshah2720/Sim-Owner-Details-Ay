import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { API_BASE_URL } from '../config/api';
import Icon from 'react-native-vector-icons/Ionicons';
import GlassBackground from '../components/GlassBackground';
import { glassCard, glassColors } from '../theme/glass';

function validateCnic(value) {
  return /^\d{5}-\d{7}-\d{1}$/.test(value);
}

function getOperatorFromNumber(number) {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.length < 4) {
    return null;
  }
  const prefix = digits.slice(0, 4);
  if (/^030[1-9]$/.test(prefix) || /^032[1-9]$/.test(prefix)) {
    return 'JAZZ';
  }
  if (/^031[0-8]$/.test(prefix)) {
    return 'ZONG';
  }
  if (/^033[0-9]$/.test(prefix)) {
    return 'UFONE';
  }
  if (/^034[0-9]$/.test(prefix)) {
    return 'Telenore';
  }
  return null;
}

function formatCnicInput(value) {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 13);
  const part1 = digitsOnly.slice(0, 5);
  const part2 = digitsOnly.slice(5, 12);
  const part3 = digitsOnly.slice(12, 13);
  if (digitsOnly.length <= 5) {
    return part1;
  }
  if (digitsOnly.length <= 12) {
    return `${part1}-${part2}`;
  }
  return `${part1}-${part2}-${part3}`;
}

export default function CheckAllSims({ navigation, onMenuPress }) {
  const [cnicQuery, setCnicQuery] = useState('');
  const [cnicError, setCnicError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = (cnicQuery || '').trim();
    if (!validateCnic(trimmed)) {
      setCnicError('Enter a valid CNIC in format 31202-7703564-1.');
      return;
    }

    const cnicDigits = trimmed.replace(/-/g, '');
    setLoading(true);
    setCnicError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?search_term=${cnicDigits}`);
      if (!response.ok) {
        throw new Error(`Network response error: ${response.status}`);
      }

      const data = await response.json();
      console.log('datadatadatadatadata',data)
      if (data.status === 'success') {
        if (Array.isArray(data.data) && data.data.length > 0) {
          const enriched = data.data.map(item => ({
            ...item,
            operator: item.operator || getOperatorFromNumber(item.number),
          }));
          navigation.navigate('CheckAllSimsDetail', {
            payload: { ...data, data: enriched },
            notice: null,
          });
        }
      } else {
        navigation.navigate('CheckAllSimsDetail', {
          payload: null,
          notice: {
            message:
              'Our team is actively working on updating the data. For now, the information available in the app is up to 2022. We appreciate your understanding.',
          },
        });
      }
    } catch (err) {
      setCnicError('Failed to connect. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <GlassBackground />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Icon name="menu" size={20} color={glassColors.textStrong} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check CNIC Info</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Icon name="arrow-back" size={20} color={glassColors.textStrong} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Get CNIC Info Instantly</Text>

        <View style={styles.card}>
          <View style={styles.cardGlow} />
          <View style={styles.cardGlowAlt} />
          <View style={styles.labelRow}>
            <Icon name="id-card" size={14} color={glassColors.textPrimary} />
            <Text style={styles.cardLabel}>Enter CNIC Number</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter 13-digit CNIC number"
            placeholderTextColor={glassColors.textMuted}
            keyboardType="number-pad"
            maxLength={15}
            value={cnicQuery}
            onChangeText={text => {
              setCnicQuery(formatCnicInput(text));
              if (cnicError) {
                setCnicError(null);
              }
            }}
          />
          {cnicError ? <Text style={styles.errorText}>{cnicError}</Text> : null}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cardButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={glassColors.textStrong} />
            ) : (
              <Text style={styles.cardButtonText}>Check CNIC Details &gt;&gt;&gt;</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Get All Sims Details</Text>
      </View>
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
    color: glassColors.textStrong,
    fontSize: 18,
    fontWeight: '700',
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
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 36,
    gap: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: glassColors.textStrong,
  },
  card: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 20,
    overflow: 'hidden',
    ...glassCard,
  },
  cardGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 140,
    backgroundColor: glassColors.accentSoft,
    opacity: 0.6,
    top: -110,
    left: -60,
  },
  cardGlowAlt: {
    position: 'absolute',
    width: 240,
    height: 140,
    borderRadius: 120,
    backgroundColor: glassColors.accentSoft2,
    opacity: 0.5,
    right: -90,
    bottom: -40,
  },
  cardLabel: {
    color: glassColors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: glassColors.textStrong,
  },
  errorText: {
    color: '#B85B5B',
    fontSize: 12,
    marginTop: 8,
  },
  cardButton: {
    marginTop: 14,
    alignSelf: 'center',
    backgroundColor: glassColors.glassFill,
    borderWidth: 1,
    borderColor: glassColors.glassBorder,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 18,
  },
  cardButtonText: {
    color: glassColors.textStrong,
    fontWeight: '600',
    fontSize: 14,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '700',
    color: glassColors.textPrimary,
  },
});
