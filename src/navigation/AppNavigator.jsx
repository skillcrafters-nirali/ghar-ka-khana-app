import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Auth Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import AuthScreen from '../screens/auth/AuthScreen';
import OtpScreen from '../screens/auth/OtpScreen';

// Main Screens
import MainTabs from './MainTabs';
import LocationScreen from '../screens/main/LocationScreen';
import ConfirmLocationScreen from '../screens/main/ConfirmLocationScreen';
import ProviderDetailScreen from '../screens/main/ProviderDetailScreen';
import MenuSubscriptionScreen from '../screens/main/MenuSubscriptionScreen';
import CategoryScreen from '../screens/main/CategoryScreen';
import EditProfile from '../screens/Profile/EditProfile';
import SavedAddress from '../screens/Profile/SavedAddress';
import Feedback from '../screens/Profile/Feedback';
import Help from '../screens/Profile/Help';
import HelpDetail from '../screens/Profile/HelpDetail';

// Order Screens
import LiveTrackingScreen from '../screens/orders/LiveTrackingScreen';
import OrderManagementScreen from '../screens/orders/OrderManagementScreen';
import PaymentScreen from '../screens/orders/PaymentScreen';
import OrderConfirmationScreen from '../screens/orders/OrderConfirmationScreen';
import OrderHistoryScreen from '../screens/Profile/OrderHistoryScreen';
import RatingsReviewsScreen from '../screens/orders/RatingsReviewsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useSelector(state =>
    state.auth);

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
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="MenuSubscription" component={MenuSubscriptionScreen} />

      {/* Profile Stack */}
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="SavedAddress"component={SavedAddress}/>
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="HelpDetail" component={HelpDetail} />
      <Stack.Screen name="Feedback" component={Feedback} />

      {/* Order Stack */}
      <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <Stack.Screen name="OrderManagement" component={OrderManagementScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="RatingsReviews" component={RatingsReviewsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;