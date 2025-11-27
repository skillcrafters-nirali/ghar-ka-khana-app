import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const SubscriptionManagementScreen = ({ navigation }) => {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      provider: 'Mama Kitchen',
      plan: 'Monthly Premium',
      status: 'Active',
      nextDelivery: '2024-01-15',
      price: '₹4000',
      meals: 'Lunch & Dinner'
    },
    {
      id: 2,
      provider: 'Ghar Jaisa',
      plan: 'Weekly Basic',
      status: 'Paused',
      nextDelivery: '2024-01-20',
      price: '₹800',
      meals: 'Lunch Only'
    }
  ]);

  const handleAction = (id, action) => {
    setSubscriptions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: action } : sub
    ));
    Alert.alert('Success', `Subscription ${action.toLowerCase()} successfully`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return colors.secondary;
      case 'Paused': return colors.warning;
      case 'Cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const renderSubscription = (subscription) => (
    <View key={subscription.id} style={styles.subscriptionCard}>
      <View style={styles.subscriptionHeader}>
        <Text style={styles.providerName}>{subscription.provider}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(subscription.status) }]}>
          <Text style={styles.statusText}>{subscription.status}</Text>
        </View>
      </View>
      
      <Text style={styles.planName}>{subscription.plan}</Text>
      <Text style={styles.planDetails}>{subscription.meals} • {subscription.price}</Text>
      <Text style={styles.nextDelivery}>Next: {subscription.nextDelivery}</Text>

      <View style={styles.actionButtons}>
        {subscription.status === 'Active' && (
          <TouchableOpacity 
            style={styles.pauseButton}
            onPress={() => handleAction(subscription.id, 'Paused')}
          >
            <Text style={styles.pauseButtonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        {subscription.status === 'Paused' && (
          <TouchableOpacity 
            style={styles.resumeButton}
            onPress={() => handleAction(subscription.id, 'Active')}
          >
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        )}
        {subscription.status !== 'Cancelled' && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => handleAction(subscription.id, 'Cancelled')}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
        <Text style={styles.headerTitle}>My Subscriptions</Text>
      </View>

      <ScrollView style={styles.content}>
        {subscriptions.map(renderSubscription)}
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
  subscriptionCard: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary
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
  planName: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    marginBottom: 4
  },
  planDetails: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 8
  },
  nextDelivery: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 16
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10
  },
  pauseButton: {
    flex: 1,
    backgroundColor: colors.warning,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  pauseButtonText: {
    color: colors.background,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium
  },
  resumeButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  resumeButtonText: {
    color: colors.background,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.error,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: colors.background,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium
  }
});

export default SubscriptionManagementScreen;