import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const OrderHistoryScreen = ({ navigation }) => {
  const [orders] = useState([
    {
      id: 'GKK12345',
      provider: 'Mama Kitchen',
      items: ['Dal Rice Combo', 'Roti with Sabzi'],
      date: '2024-01-10',
      status: 'Delivered',
      total: '₹320',
      rating: 4
    },
    {
      id: 'GKK12344',
      provider: 'Ghar Jaisa',
      items: ['Rajma Chawal', 'Mixed Veg'],
      date: '2024-01-08',
      status: 'Delivered',
      total: '₹280',
      rating: 5
    },
    {
      id: 'GKK12343',
      provider: 'Desi Tadka',
      items: ['Chicken Curry', 'Naan', 'Rice'],
      date: '2024-01-05',
      status: 'Cancelled',
      total: '₹450',
      rating: null
    }
  ]);

  const handleReorder = (order) => {
    Alert.alert(
      'Reorder Confirmation',
      `Reorder from ${order.provider}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reorder', 
          onPress: () => {
            Alert.alert('Success', 'Items added to cart!');
            navigation.navigate('OrderManagement');
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return colors.secondary;
      case 'Cancelled': return colors.error;
      case 'Pending': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <Icon
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={colors.warning}
          />
        ))}
      </View>
    );
  };

  const renderOrder = (order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>#{order.id}</Text>
          <Text style={styles.providerName}>{order.provider}</Text>
        </View>
        <View style={styles.orderMeta}>
          <Text style={styles.orderDate}>{order.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <Text key={index} style={styles.itemText}>• {item}</Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.orderTotal}>
          <Text style={styles.totalText}>{order.total}</Text>
          {renderStars(order.rating)}
        </View>
        
        {order.status === 'Delivered' && (
          <TouchableOpacity 
            style={styles.reorderButton}
            onPress={() => handleReorder(order)}
          >
            <Icon name="refresh" size={16} color={colors.primary} />
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView style={styles.content}>
        {orders.map(renderOrder)}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20
  },
  orderCard: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  orderId: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textSecondary
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginTop: 2
  },
  orderMeta: {
    alignItems: 'flex-end'
  },
  orderDate: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 4
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.medium,
    color: colors.background
  },
  orderItems: {
    marginBottom: 12
  },
  itemText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderTotal: {
    flex: 1
  },
  totalText: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginBottom: 4
  },
  ratingContainer: {
    flexDirection: 'row'
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary
  },
  reorderText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    marginLeft: 4
  }
});

export default OrderHistoryScreen;