import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import SubscriptionCard from '../../components/common/SubscriptionCard';

const subscriptionPlans = [
  {
    id: 'daily',
    title: 'Daily Veg Plan',
    duration: 'Daily',
    meals: ['Lunch', 'Dinner'],
    benefit: '10% discount',
  },
  {
    id: 'weekly',
    title: 'Weekly Veg Plan',
    duration: 'Weekly',
    meals: ['Lunch', 'Dinner'],
    benefit: '1 free meal',
  },
  {
    id: 'monthly',
    title: 'Monthly Veg Plan',
    duration: 'Monthly',
    meals: ['Lunch', 'Dinner'],
    benefit: '1 day meal free',
  },
];

const MenuSubscriptionScreen = ({ route, navigation }) => {
  const getPlanPrice = (comboPrice, planId) => {
    switch (planId) {
      case 'daily':
        return {
          price: Math.round(comboPrice * 0.9),
          label: '10% OFF',
        };

      case 'weekly':
        return {
          price: comboPrice * 6, // 7 meals – 1 free
          label: '1 Meal Free',
        };

      case 'monthly':
        return {
          price: comboPrice * 29, // 30 days – 1 free
          label: '1 Day Free',
        };

      default:
        return { price: comboPrice, label: '' };
    }
  };

  const { provider, combo } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={24}
            color={colors.textPrimary}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Subscription Plans</Text>
        </View>

        {/* Provider Info */}
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{provider?.name}</Text>
          <Text style={styles.providerDetails}>
            Choose the best plan for you
          </Text>
        </View>

        {/* Subscription Cards */}
        <View style={styles.cardsContainer}>
          {subscriptionPlans.map(plan => {
            const pricing = getPlanPrice(combo.price, plan.id);

            return (
              <SubscriptionCard
                key={plan.id}
                plan={{
                  ...plan,
                  price: pricing.price,
                  priceLabel: pricing.label,
                  comboName: combo.name,
                }}
                onBuyPress={selectedPlan => {
                  navigation.navigate('Payment', {
                    orderTotal: selectedPlan.finalPrice ?? selectedPlan.price,
                  });
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },

  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
  },

  providerInfo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  providerName: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.primary,
  },

  providerDetails: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },

  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 8,
  },
});

export default MenuSubscriptionScreen;
