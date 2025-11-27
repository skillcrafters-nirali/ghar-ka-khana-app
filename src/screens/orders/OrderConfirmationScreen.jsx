import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const OrderConfirmationScreen = ({ navigation, route }) => {
  const { paymentMethod, amount } = route.params || {};
  const orderId = 'GKK' + Math.floor(Math.random() * 100000);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Icon name="checkmark-circle" size={80} color={colors.secondary} />
        </View>
        
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully
        </Text>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Order ID</Text>
            <Text style={styles.detailValue}>{orderId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount Paid</Text>
            <Text style={styles.detailValue}>₹{amount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment Method</Text>
            <Text style={styles.detailValue}>{paymentMethod}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>30-45 minutes</Text>
          </View>
        </View>

        <View style={styles.trackingInfo}>
          <Icon name="location" size={20} color={colors.primary} />
          <Text style={styles.trackingText}>
            Track your order in real-time
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.trackButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  successIcon: {
    marginBottom: 30
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40
  },
  orderDetails: {
    width: '100%',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  detailLabel: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  detailValue: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  trackingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    width: '100%'
  },
  trackingText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    marginLeft: 10
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    gap: 15
  },
  trackButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  trackButtonText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold
  },
  homeButton: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border
  },
  homeButtonText: {
    color: colors.textPrimary,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium
  }
});

export default OrderConfirmationScreen;