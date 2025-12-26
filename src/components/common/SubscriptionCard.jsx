import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from './Button';

const SubscriptionCard = ({ plan, onBuyPress }) => {
  const isVeg = plan.type === 'Vegetarian Plan';

  return (
    <View style={styles.card}>
      <Text style={styles.planTitle}>{plan.title}</Text>
      {/* COMBO NAME (ADD HERE) */}
      {plan.comboName && <Text style={styles.comboName}>{plan.comboName}</Text>}

      {/* PRICE */}
      <Text style={styles.price}>₹{plan.price}</Text>

      {/* PRICE LABEL (DISCOUNT / FREE) */}
      {plan.priceLabel && <Text style={styles.benefit}>{plan.priceLabel}</Text>}

      <View style={styles.bottomRow}>
        <Button
          title="Buy"
          onPress={() => onBuyPress(plan)}
          variant="buy"
          size="buySize"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,

    width: Dimensions.get('window').width - 32,

    borderWidth: 1,
    borderColor: colors.textPrimary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  planTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  comboName: {
    marginTop: 4,
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },

  benefit: {
    marginTop: 4,
    fontSize: fonts.size.sm,
    color: 'green',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  planType: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
  price: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.bold,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default SubscriptionCard;
