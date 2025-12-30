import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetUserAddressesQuery } from '../../services/api';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const SavedAddress = ({ navigation }) => {
  const { data: userAddresses, isLoading, error } =
    useGetUserAddressesQuery();

  const addresses = useMemo(() => {
    console.log('FORMATTING ADDRESSES:', userAddresses);
  
    if (!userAddresses?.status || !Array.isArray(userAddresses.data)) {
      console.log('No valid address data');
      return [];
    }
  
    return userAddresses.data.map(addr => {
      console.log('SINGLE ADDRESS:', addr);
  
      const cityName =
        addr['cityData.cityName'] ||
        addr.cityData?.cityName ||
        '';
  
      const stateName =
        addr['stateData.stateName'] ||
        addr.stateData?.stateName ||
        '';
  
      console.log(' City:', cityName, 'State:', stateName);
  
      return {
        id: addr.id,
        type: addr.type || 'Home',
        name: addr.rName || 'No Name',
        address: addr.address || '',
        pincode: addr.pincode || '',
        area: `${cityName}, ${stateName} - ${addr.pincode || ''}`,
      };
    });
  }, [userAddresses]);
  

  /* ---------------- ICON ---------------- */
  const getIconName = type => {
    switch (type) {
      case 'Home':
        return 'home-outline';
      case 'Work':
        return 'business-outline';
      default:
        return 'location-outline';
    }
  };

  /* ---------------- RENDER CARD ---------------- */
  const renderItem = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressLeft}>
        <View style={styles.iconContainer}>
          <Icon
            name={getIconName(item.type)}
            size={20}
            color={colors.textPrimary}
          />
        </View>

        <View style={styles.addressDetails}>
          <Text style={styles.addressType}>{item.type}</Text>
          <Text style={styles.addressName}>{item.name}</Text>
          <Text style={styles.addressText}>{item.address}</Text>
          <Text style={styles.addressArea}>{item.area}</Text>
        </View>
      </View>
    </View>
  );

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.error }}>
          Failed to load addresses
        </Text>
      </View>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* LIST */}
      {addresses.length === 0 ? (
        <View style={styles.center}>
          <Icon
            name="location-outline"
            size={40}
            color={colors.textSecondary}
          />
          <Text style={styles.emptyText}>No saved address</Text>
        </View>
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};


/* ---------------- STYLES  ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addressLeft: {
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  addressName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  addressText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  addressArea: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 10,
    color: colors.textSecondary,
  },
});
export default SavedAddress;
