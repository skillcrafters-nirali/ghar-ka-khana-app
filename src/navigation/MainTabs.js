import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurvedBottomNav from "../components/ui/CurvedBottomNav";
import HomeScreen from "../screens/main/HomeScreen";
import CartScreen from "../screens/orders/CartScreen";
import OrderHistoryScreen from "../screens/orders/OrderHistoryScreen";
import ProfileScreen from "../screens/main/ProfileScreen";


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CurvedBottomNav {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorite" component={OrderHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
