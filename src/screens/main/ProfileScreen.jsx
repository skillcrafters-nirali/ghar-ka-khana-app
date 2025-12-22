import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { logout } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/common/Button';

const ProfileScreen = ({ navigation }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Auth');
  };

  const profileMenuItems = [
    { icon: 'person-outline', title: 'Your Profile' },
    {
      icon: 'receipt-outline',
      title: 'Your Orders',
      onPress: () => navigation.navigate('OrderHistory'),
    },
    { icon: 'book-outline', title: 'Address Book' },
  ];

  const moreMenuItems = [
    { icon: 'help-circle-outline', title: 'Online Help Portal' },
    { icon: 'language-outline', title: 'Change Language' },
    { icon: 'information-circle-outline', title: 'About' },
    { icon: 'chatbubble-outline', title: 'Send Feedback' },
    { icon: 'shield-outline', title: 'Report A Safety Emergency' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Combined User and Subscription Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Icon name="person" size={32} color={colors.primary} />
            </View>
            <Text style={styles.userName}>{user?.name || 'Donji Sharma'}</Text>
          </View>
          <View style={styles.subscriptionButtonWrapper}>
            <Button
              title="Renew Your Dabba Plan"
              variant="primary"
              size="medium"
              style={styles.subscriptionButton}
              onPress={() => {}}
            />
          </View>
        </View>
        {/* Profile Menu Items */}
        <View style={styles.menuSection}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === profileMenuItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={item.onPress}
            >
              <Icon name={item.icon} size={20} />
              <Text style={styles.menuText}>{item.title}</Text>
              <Icon name="chevron-forward" size={16} />
            </TouchableOpacity>
          ))}
        </View>

        {/* More Dropdown */}
        <View style={styles.moreContainer}>
          {/* Header */}
          <TouchableOpacity
            style={styles.moreHeader}
            onPress={() => setIsMoreOpen(prev => !prev)}
            activeOpacity={0.8}
          >
            <Text style={styles.moreTitle}>More</Text>
            <Icon
              name={isMoreOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Dropdown Content */}
          {isMoreOpen && (
            <View style={styles.moreDropdown}>
              {moreMenuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    index === moreMenuItems.length - 1 && styles.lastMenuItem,
                  ]}
                  onPress={item.onPress}
                >
                  <Icon name={item.icon} size={20} />
                  <Text style={styles.menuText}>{item.title}</Text>
                  <Icon name="chevron-forward" size={16} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} />
          <Text style={styles.logoutText}>Log Out</Text>
          <Icon name="chevron-forward" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  userCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingTop: 20,
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },
  subscriptionButtonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  
  subscriptionButton: {
    backgroundColor: colors.primary,
    
    
  },
  menuSection: {
    backgroundColor: colors.surface,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // moreContainer: {
  //   borderRadius: 14,
  //   marginBottom: 12,
  //   borderWidth: 1,
  //   borderColor: colors.border,
  // },

  moreContainer: {
    backgroundColor: colors.surface,
    marginBottom: 4,
  },
  

  moreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  moreDropdown: {
    backgroundColor: colors.surface,
    // borderTopWidth: 1,
    // borderTopColor: colors.border,
    // borderBottomLeftRadius: 14,
    // borderBottomRightRadius: 14,
  },

  moreTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  menuText: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginLeft: 16,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutText: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginLeft: 16,
  },
});

export default ProfileScreen;
