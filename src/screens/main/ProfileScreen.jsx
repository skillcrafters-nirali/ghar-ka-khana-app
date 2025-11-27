import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Auth');
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Edit Profile' },
    { icon: 'location-outline', title: 'Delivery Address' },
    { icon: 'card-outline', title: 'Payment Methods' },
    { icon: 'receipt-outline', title: 'Order History', onPress: () => navigation.navigate('OrderHistory') },
    { icon: 'refresh-outline', title: 'My Subscriptions', onPress: () => navigation.navigate('SubscriptionManagement') },
    { icon: 'star-outline', title: 'Ratings & Reviews', onPress: () => navigation.navigate('RatingsReviews') },
    { icon: 'heart-outline', title: 'Favorites' },
    { icon: 'restaurant-outline', title: 'Dietary Preferences' },
    { icon: 'notifications-outline', title: 'Notifications' },
    { icon: 'wallet-outline', title: 'Wallet & Credits' },
    { icon: 'gift-outline', title: 'Offers & Coupons' },
    { icon: 'help-circle-outline', title: 'Help & Support' },
    { icon: 'log-out-outline', title: 'Logout', onPress: handleLogout, isLogout: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || user?.phone || 'No contact'}</Text>
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, item.isLogout && styles.logoutItem]}
            onPress={item.onPress}
          >
            <Icon name={item.icon} size={24} color={item.isLogout ? colors.error : colors.textSecondary} />
            <Text style={[styles.menuText, item.isLogout && styles.logoutText]}>{item.title}</Text>
            <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: fonts.size.lg, fontFamily: fonts.family.bold, color: colors.textPrimary },
  userSection: { alignItems: 'center', paddingVertical: 32, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.cardBackground, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  userName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: { fontSize: fonts.size.sm, fontFamily: fonts.family.regular, color: colors.textSecondary },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuText: { flex: 1, fontSize: fonts.size.md, fontFamily: fonts.family.regular, color: colors.textPrimary, marginLeft: 16 },
  logoutItem: { borderBottomWidth: 0, marginTop: 16 },
  logoutText: { color: colors.error },
});

export default ProfileScreen;