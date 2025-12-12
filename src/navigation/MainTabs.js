import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurvedBottomNav from "../components/ui/CurvedBottomNav";
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import TrackPlanScreen from "../screens/orders/TrackPlanScreen";
import FavoriteAllScreen from "../screens/main/FavoriteAllScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CurvedBottomNav {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Plan" component={TrackPlanScreen} />
      <Tab.Screen name="Favorite" component={FavoriteAllScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
