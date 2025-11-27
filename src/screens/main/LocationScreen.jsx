import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const savedAddresses = [
  {
    id: 1,
    type: 'Work',
    name: '1234, Green Valley Apartments',
    address: 'Near Baner Main Road',
    area: 'Baner, Pune - 411045',
    isSelected: true
  },
  {
    id: 2,
    type: 'Work',
    name: '1234, Green Valley Apartments',
    address: 'Near Baner Main Road',
    area: 'Baner, Pune - 411045',
    isSelected: false
  },
  {
    id: 3,
    type: 'Home',
    name: '1234, Green Valley Apartments',
    address: 'Near Baner Main Road',
    area: 'Baner, Pune - 411045',
    isSelected: false
  },
  {
    id: 4,
    type: 'Work',
    name: '1234, Green Valley Apartments',
    address: 'Near Baner Main Road',
    area: 'Baner, Pune - 411045',
    isSelected: false
  }
];

const LocationScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [addresses, setAddresses] = useState(savedAddresses);

  const handleAddressSelect = (selectedId) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isSelected: addr.id === selectedId
    }));
    setAddresses(updatedAddresses);
  };

  const getIconName = (type) => {
    switch (type) {
      case 'Home':
        return 'home-outline';
      case 'Work':
        return 'business-outline';
      default:
        return 'location-outline';
    }
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity 
      style={[styles.addressCard, item.isSelected && styles.selectedCard]}
      onPress={() => handleAddressSelect(item.id)}
    >
      <View style={styles.addressContent}>
        <View style={styles.addressLeft}>
          <View style={styles.iconContainer}>
            <Icon name={getIconName(item.type)} size={20} color={colors.textPrimary} />
          </View>
          <View style={styles.addressDetails}>
            <Text style={styles.addressType}>{item.type}</Text>
            <Text style={styles.addressName}>{item.name}</Text>
            <Text style={styles.addressText}>{item.address}</Text>
            <Text style={styles.addressArea}>{item.area}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="ellipsis-vertical" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Select your location</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter your location"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={colors.textSecondary}
        />
        <Icon name="mic" size={20} color={colors.primary} style={styles.micIcon} />
      </View>

      <TouchableOpacity 
        style={styles.addAddressButton}
        onPress={() => navigation.navigate('ConfirmLocation')}
      >
        <Icon name="add" size={20} color={colors.primary} />
        <Text style={styles.addAddressText}>Add address</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.currentLocationButton}>
        <View style={styles.currentLocationIcon}>
          <Icon name="locate" size={20} color={colors.primary} />
        </View>
        <View style={styles.currentLocationText}>
          <Text style={styles.currentLocationTitle}>Use your current location</Text>
          <Text style={styles.currentLocationSubtitle}>Baner, Pune</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent</Text>
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Saved</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.surface
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary
  },
  micIcon: {
    marginLeft: 10
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10
  },
  addAddressText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    marginLeft: 10
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20
  },
  currentLocationIcon: {
    backgroundColor: colors.successLight,
    borderRadius: 20,
    padding: 8,
    marginRight: 15
  },
  currentLocationText: {
    flex: 1
  },
  currentLocationTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 2
  },
  currentLocationSubtitle: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textSecondary,
    textAlign: 'center'
  },
  list: {
    flex: 1,
    paddingHorizontal: 20
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  selectedCard: {
    backgroundColor: colors.successLight,
    borderColor: colors.primary
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  addressLeft: {
    flexDirection: 'row',
    flex: 1
  },
  iconContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 12
  },
  addressDetails: {
    flex: 1
  },
  addressType: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 4
  },
  addressName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2
  },
  addressText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2
  },
  addressArea: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  moreButton: {
    padding: 4
  }
});

export default LocationScreen;