import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const LiveTrackingScreen = ({ navigation, route }) => {
  const [orderStatus, setOrderStatus] = useState('preparing');
  const [deliveryTime, setDeliveryTime] = useState('25-30 min');
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // Pulse animation for live tracking
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  const getStatusSteps = () => [
    { id: 'confirmed', label: 'Order Confirmed', completed: true },
    { id: 'preparing', label: 'Preparing Food', completed: orderStatus !== 'confirmed' },
    { id: 'pickup', label: 'Out for Pickup', completed: ['pickup', 'delivery', 'delivered'].includes(orderStatus) },
    { id: 'delivery', label: 'Out for Delivery', completed: ['delivery', 'delivered'].includes(orderStatus) },
    { id: 'delivered', label: 'Delivered', completed: orderStatus === 'delivered' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView style={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Track Order</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.deliveryRoute}>
            <View style={styles.routeLine} />
          </View>
          
          <Animated.View 
            style={[
              styles.driverLocation,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            <Icon name="bicycle" size={24} color={colors.surface} />
          </Animated.View>
          
          <View style={styles.restaurantLocation}>
            <Icon name="restaurant" size={20} color={colors.surface} />
          </View>
          
          <View style={styles.customerLocation}>
            <Icon name="home" size={20} color={colors.surface} />
          </View>
        </View>
        
        <View style={styles.estimatedTime}>
          <Text style={styles.timeText}>{deliveryTime}</Text>
          <Text style={styles.timeLabel}>Estimated delivery time</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>Order #12345</Text>
          <Text style={styles.orderSubtitle}>Harshiksha Dabbawala</Text>
        </View>

        <View style={styles.statusContainer}>
          {getStatusSteps().map((step, index) => (
            <View key={step.id} style={styles.statusStep}>
              <View style={styles.statusLeft}>
                <View style={[
                  styles.statusDot,
                  step.completed && styles.completedDot
                ]}>
                  {step.completed && (
                    <Icon name="checkmark" size={12} color={colors.surface} />
                  )}
                </View>
                {index < getStatusSteps().length - 1 && (
                  <View style={[
                    styles.statusLine,
                    step.completed && styles.completedLine
                  ]} />
                )}
              </View>
              <View style={styles.statusContent}>
                <Text style={[
                  styles.statusLabel,
                  step.completed && styles.completedLabel
                ]}>
                  {step.label}
                </Text>
                {step.id === orderStatus && (
                  <Text style={styles.currentStatus}>In Progress</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.driverInfo}>
          <View style={styles.driverDetails}>
            <View style={styles.driverAvatar}>
              <Icon name="person" size={24} color={colors.surface} />
            </View>
            <View style={styles.driverText}>
              <Text style={styles.driverName}>Rahul Kumar</Text>
              <Text style={styles.driverRole}>Delivery Partner</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="call" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingTop: 50,
    paddingTop: StatusBar.currentHeight || 44,
},
scrollContainer:{
 flex:1,
},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  backButton: {
    padding: 4
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  helpButton: {
    padding: 4
  },
  mapContainer: {
    height: 300,
    position: 'relative'
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.successLight,
    position: 'relative'
  },
  deliveryRoute: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    right: '20%',
    height: 2
  },
  routeLine: {
    flex: 1,
    backgroundColor: colors.primary,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary
  },
  driverLocation: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
    marginLeft: -20
  },
  restaurantLocation: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    backgroundColor: colors.error,
    borderRadius: 15,
    padding: 6
  },
  customerLocation: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 6
  },
  estimatedTime: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3
  },
  timeText: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.primary
  },
  timeLabel: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  orderDetails: {
    // flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom:40,
    minHeight:400,
  },
  orderHeader: {
    marginBottom: 20
  },
  orderTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary
  },
  orderSubtitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginTop: 4
  },
  statusContainer: {
    marginBottom: 30
  },
  statusStep: {
    flexDirection: 'row',
    marginBottom: 16
  },
  statusLeft: {
    alignItems: 'center',
    marginRight: 16
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center'
  },
  completedDot: {
    backgroundColor: colors.primary
  },
  statusLine: {
    width: 2,
    height: 30,
    backgroundColor: colors.border,
    marginTop: 4
  },
  completedLine: {
    backgroundColor: colors.primary
  },
  statusContent: {
    flex: 1,
    paddingTop: 2
  },
  statusLabel: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  completedLabel: {
    color: colors.textPrimary,
    fontFamily: fonts.family.medium
  },
  currentStatus: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.primary,
    marginTop: 2
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  driverAvatar: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
    marginRight: 12
  },
  driverText: {
    flex: 1
  },
  driverName: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  driverRole: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginTop: 2
  },
  callButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10
  }
});

export default LiveTrackingScreen;