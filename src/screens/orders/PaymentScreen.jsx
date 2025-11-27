import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const PaymentScreen = ({ navigation, route }) => {
  const { orderTotal = 250 } = route.params || {};
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'card-outline', description: 'Pay using UPI apps' },
    { id: 'card', name: 'Credit/Debit Card', icon: 'card', description: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline', description: 'Paytm, PhonePe, GPay' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline', description: 'Pay when order arrives' },
  ];

  const handlePayment = () => {
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    // Simulate payment processing
    Alert.alert(
      'Payment Successful!',
      `Your order has been confirmed. Total paid: ₹${orderTotal}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('OrderConfirmation', { 
            paymentMethod: selectedPayment,
            amount: orderTotal 
          })
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Order Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{orderTotal}</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                selectedPayment === method.id && styles.selectedOption
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={styles.paymentInfo}>
                <Icon 
                  name={method.icon} 
                  size={24} 
                  color={selectedPayment === method.id ? colors.primary : colors.textSecondary} 
                />
                <View style={styles.paymentText}>
                  <Text style={[
                    styles.paymentName,
                    selectedPayment === method.id && styles.selectedText
                  ]}>
                    {method.name}
                  </Text>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                </View>
              </View>
              <View style={[
                styles.radioButton,
                selectedPayment === method.id && styles.radioSelected
              ]}>
                {selectedPayment === method.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Info */}
        <View style={styles.securitySection}>
          <Icon name="shield-checkmark" size={20} color={colors.secondary} />
          <Text style={styles.securityText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.paymentSummary}>
          <Text style={styles.summaryLabel}>Total to Pay</Text>
          <Text style={styles.summaryAmount}>₹{orderTotal}</Text>
        </View>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>
            Confirm Payment
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginLeft: 15
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  totalSection: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 5
  },
  totalAmount: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.primary
  },
  section: {
    marginVertical: 10
  },
  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginBottom: 15
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 10
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.cardBackground
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  paymentText: {
    marginLeft: 15,
    flex: 1
  },
  paymentName: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 2
  },
  selectedText: {
    color: colors.primary
  },
  paymentDescription: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioSelected: {
    borderColor: colors.primary
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary
  },
  securitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginVertical: 20
  },
  securityText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  paymentSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  summaryLabel: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  summaryAmount: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.primary
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: colors.disabled
  },
  payButtonText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold
  },
  disabledButtonText: {
    color: colors.textSecondary
  }
});

export default PaymentScreen;