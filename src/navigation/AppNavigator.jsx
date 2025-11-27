import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import MainTabs from './MainTabs';

// Auth Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import OtpScreen from '../screens/auth/OtpScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import LocationScreen from '../screens/main/LocationScreen';
import ConfirmLocationScreen from '../screens/main/ConfirmLocationScreen';
import ProviderDetailScreen from '../screens/main/ProviderDetailScreen';
import MenuSubscriptionScreen from '../screens/main/MenuSubscriptionScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Order Screens
import CartScreen from '../screens/orders/CartScreen';
import LiveTrackingScreen from '../screens/orders/LiveTrackingScreen';
import TrackPlanScreen from '../screens/orders/TrackPlanScreen';
import OrderManagementScreen from '../screens/orders/OrderManagementScreen';
import PaymentScreen from '../screens/orders/PaymentScreen';
import OrderConfirmationScreen from '../screens/orders/OrderConfirmationScreen';
import OrderHistoryScreen from '../screens/orders/OrderHistoryScreen';
import SubscriptionManagementScreen from '../screens/orders/SubscriptionManagementScreen';
import RatingsReviewsScreen from '../screens/orders/RatingsReviewsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "MainTabs" : "Onboarding"}
    >
      {/* Auth Stack */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      
      {/* Main Stack */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="ConfirmLocation" component={ConfirmLocationScreen} />
      <Stack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
      <Stack.Screen name="MenuSubscription" component={MenuSubscriptionScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      
      {/* Order Stack */}
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <Stack.Screen name="TrackPlan" component={TrackPlanScreen} />
      <Stack.Screen name="OrderManagement" component={OrderManagementScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="SubscriptionManagement" component={SubscriptionManagementScreen} />
      <Stack.Screen name="RatingsReviews" component={RatingsReviewsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;