import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { useGetCitiesMutation,useGetStatesQuery,useGetUserAddressesQuery } from '../../services/api';
import { useSelector } from 'react-redux';
import ConfirmLocationScreen from './ConfirmLocationScreen';
// const savedAddresses = [
//   {
//     id: 1,
//     type: 'Work',
//     name: '1234, Green Valley Apartments',
//     address: 'Near Baner Main Road',
//     area: 'Baner, Pune - 411045',
//     isSelected: true
//   },
//   {
//     id: 2,
//     type: 'Work',
//     name: '1234, Green Valley Apartments',
//     address: 'Near Baner Main Road',
//     area: 'Nikol, Ahmedabad - 382330',
//     isSelected: false
//   },
//   {
//     id: 3,
//     type: 'Home',
//     name: '1234, Green Valley Apartments',
//     address: 'Near Baner Main Road',
//     area: 'Gandhinagar, Ahmedabad - 380010',
//     isSelected: false
//   },
//   {
//     id: 4,
//     type: 'Work',
//     name: '1234, Green Valley Apartments',
//     address: 'Near Baner Main Road',
//     area: 'Thaltej, Ahmedabad - 382310',
//     isSelected: false
//   }
// ];

const LocationScreen = ({ navigation,route}) => {
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token); // Add this line
  const [searchText, setSearchText] = useState('');
  const [addresses, setAddresses] = useState([]);
  // const [selectedStateId, setSelectedStateId] = useState(1);
  const [selectedStateId, setSelectedStateId] = useState(null);
  // const { 
  //   data: cities, 
  //   error: citiesError, 
  //   isLoading: citiesLoading 
  // } = useGetCitiesMutation(selectedStateId, {
  //   skip: !selectedStateId,
  // });

  const [getCities, { data: cities, error: citiesError, isLoading: citiesLoading }] = useGetCitiesMutation();

  console.log('Mutation state:', { cities, citiesError, citiesLoading, selectedStateId });

  useEffect(() => {
    console.log('selectedStateId changed:', selectedStateId);
    if (selectedStateId) {
      console.log('Calling getCities with stateId:', selectedStateId);
      getCities(selectedStateId)
        .then(result => console.log('getCities success:', result))
        .catch(error => console.log('getCities error:', error));
    }
  }, [selectedStateId]);

  
  // const { data: cities, error: citiesError, isLoading: citiesLoading } = useGetCitiesQuery(selectedStateId);
  
  const { data: states, error: statesError ,isLoading: statesLoading } = useGetStatesQuery();
  const { data: userAddresses, error: userAddressesError,isLoading } = useGetUserAddressesQuery(
    undefined, {
      skip: !token, //  THIS FIXES 401 ERROR
    }
  );

  useEffect(() => {
    console.log('States data:', states);
    if (states?.status && states?.data?.length > 0) {
      const firstState = states.data[0];
      console.log('First state:', firstState);
      const stateId = firstState._id || firstState.id;
      console.log('Setting selectedStateId to:', stateId);
      setSelectedStateId(stateId);
    }
  }, [states]);
  

  useEffect(() => {
    if (route.params?.newAddress) {
      setAddresses(prev => [...prev, route.params.newAddress]);
    }
  }, [route.params?.newAddress]);

  

  useEffect(() => {
    let allAddresses = [];
  
    // USER ADDRESSES
    if (userAddresses?.status && userAddresses?.data) {
      const formattedUserAddresses = userAddresses.data.map(addr => ({
        id: addr._id,
        type: addr.type || 'Home',
        name: addr.type || 'Saved',
        address: addr.address,
        area: `${addr.city?.cityName}, ${addr.state?.stateName} - ${addr.pincode}`,
        isSelected: false,
      }));
      allAddresses = [...formattedUserAddresses];
    }

  
    //  CITIES
    if (cities?.status && cities?.data) {
      const formattedCities = cities.data.map(city => ({
        id: city._id||city.id,
        type: 'City',
        name: city.cityName,
        address: city.cityName,
        area: `${city.cityName}, ${city.state?.stateName}`,
        isSelected: false,
      }));
      allAddresses = [...allAddresses, ...formattedCities];
    }
    console.log('All Addresses:', allAddresses);
    setAddresses(allAddresses);
  }, [cities, userAddresses]);

  console.log("RAW Cities", cities);
  console.log("RAW User Addresses", userAddresses);
  console.log("Cities error", citiesError)
  console.log("User Addresses error", userAddressesError)
  console.log("States error", statesError)
console.log(ConfirmLocationScreen)
useEffect(() => {
  console.log('Cities API Response:', cities);
}, [cities]);

useEffect(() => {
  console.log('States API Response:', states);
}, [states]);


  const handleAddressSelect = (selectedId) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isSelected: addr.id === selectedId
    }));
    setAddresses(updatedAddresses);
  };

  
// useEffect(() => {
//   if (route.params?.newAddress) {
//     setAddresses(prev => [...prev, route.params.newAddress]);
//   }
// }, [route.params?.newAddress]);


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


const filteredAddresses = addresses.filter(addr =>
  `${addr.type} ${addr.name} ${addr.address} ${addr.area}`
    .toLowerCase()
    .includes(searchText.toLowerCase())
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
          {/* <Text style={styles.currentLocationSubtitle}>Baner, Pune</Text> */}
        </View>
      </TouchableOpacity>

      
<FlatList
        data={filteredAddresses}
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
  loadingText: {
    textAlign: 'center',
    fontSize: fonts.size.md,
    color: colors.textSecondary,
    marginTop: 20,
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