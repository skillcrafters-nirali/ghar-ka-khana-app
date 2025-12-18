import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';
import {
  useUserAddressMutation,
  useGetCitiesMutation,
  useGetStatesQuery,
} from '../../services/api';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

const ConfirmLocationScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const [receiverName, setReceiverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState('Home');
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [storeAddress, { isLoading }] = useUserAddressMutation();
  const [pincode, setPincode] = useState('');
  const { data: states } = useGetStatesQuery();

  const [
    getCities,
    { data: cities, error: citiesError, isLoading: citiesLoading },
  ] = useGetCitiesMutation();

  useEffect(() => {
    if (selectedStateId !== '') {
      console.log('Calling getCities API with stateId:', selectedStateId);
      getCities(selectedStateId)
        .unwrap()
        .then(result => {
          console.log('Cities API Success:', result);
        })
        .catch(error => {
          console.log('Cities API Error:', error);
        });
    }
  }, [selectedStateId, getCities]);

  useEffect(() => {
    if (states?.status && states?.data?.length > 0 && !selectedStateId) {
      setSelectedStateId(states.data[0].id);
    }
  }, [states]);

  const token = useSelector(state => state.auth);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const addressTypes = [
    { id: 'Home', icon: 'home', label: 'Home' },
    { id: 'Work', icon: 'business', label: 'Work' },
    { id: 'Other', icon: 'add', label: 'Other' },
  ];

  const handleSave = async () => {
    console.log('Form Values:', {
      receiverName,
      phoneNumber,
      landmark,
      selectedStateId,
      selectedCityId,
      pincode,
    });
    if (
      !receiverName ||
      !phoneNumber ||
      !landmark ||
      selectedStateId === '' ||
      selectedCityId === '' ||
      !pincode
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      console.log('Form Values:', {
        receiverName,
        phoneNumber,
        landmark,
        selectedStateId,
        selectedCityId,
        pincode,
      });
      console.log('Cities data:', cities);
      console.log('Cities loading:', citiesLoading);
      console.log('Cities error:', citiesError);
      console.log('Validation check:', {
        receiverName: !!receiverName,
        phoneNumber: !!phoneNumber,
        landmark: !!landmark,
        selectedStateId: selectedStateId,
        selectedCityId: selectedCityId,
        pincode: !!pincode,
      });

      return;
    }
    if (!isAuthenticated || !token) {
      Alert.alert('Error', 'Please login again');
      navigation.navigate('MainTabs');
      return;
    }

    try {
      const addressData = {
        userId: user.id,
        city: selectedCityId,
        state: selectedStateId,
        pincode,
        rName: receiverName,
        rPhone: phoneNumber,
        address: landmark,
        type:selectedAddressType
      };

      if (!addressData.city || !addressData.state) {
        Alert.alert('Error', 'Please select valid state and city');
        return;
      }

      console.log('Address Data Sending:', addressData);
      console.log('huhuhu', cities);
      const result = await storeAddress(addressData).unwrap();
      console.log('API Response Success:', result);
      if (result.status) {

        Alert.alert('Success', result.message || 'Address saved successfully');

        const newAddress = {
          id: Date.now().toString(),
          type: selectedAddressType,
          name: receiverName,
          address: landmark,
          area: `${selectedCityId}, ${selectedStateId}`,

          isSelected: false,
        };
        

        navigation.navigate('LocationScreen', { newAddress });
      }
    } catch (error) {
      console.log('API Response Error:', error);
      Alert.alert('Error', error.data?.message || 'Failed to save address');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm delivery location</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location"
            placeholderTextColor={colors.textSecondary}
          />
          <Icon name="mic" size={20} color={colors.primary} />
        </View>

        <View style={styles.mapPlaceholder}>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>
              Your address will be delivered here
            </Text>
          </View>
          <View style={styles.locationPin}>
            <Icon name="location" size={30} color={colors.primary} />
          </View>
          <View style={styles.userLocation}>
            <Icon name="radio-button-on" size={16} color={colors.info} />
          </View>
          <View style={styles.deliveryLocation}>
            <Icon name="radio-button-on" size={20} color={colors.warning} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Enter your details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name of the Receiver *"
          value={receiverName}
          onChangeText={setReceiverName}
          placeholderTextColor={colors.textSecondary}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number of the receiver"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor={colors.textSecondary}
        />

        <TextInput
          style={styles.input}
          placeholder="Area/Sector/Landmark *"
          value={landmark}
          onChangeText={setLandmark}
          placeholderTextColor={colors.textSecondary}
        />

        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedStateId}
            onValueChange={value => {
              if (!value) return;
              setSelectedStateId(value);
              setSelectedCityId('');
            }}
          >
            <Picker.Item
              label="Select State *"
              value={''}
              color={colors.textSecondary}
            />
            {states?.data?.map(state => (
              <Picker.Item
                key={state.id}
                label={state.stateName}
                value={state.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.dropdown}>
          <Picker
            enabled={selectedStateId !== ''}
            selectedValue={selectedCityId}
            onValueChange={(value, index) => {
              console.log('City picker changed to:', value);
              if (index === 0) {
                setSelectedCityId('');
                return;
              }
              setSelectedCityId(value);
            }}
          >
            <Picker.Item
              label="Select City *"
              value={''}
              color={colors.textSecondary}
            />
            {cities?.data?.map(city => (
              <Picker.Item
                key={city.id}
                label={city.cityName}
                value={city.id}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Pincode *"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          placeholderTextColor={colors.textSecondary}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setSetAsDefault(!setAsDefault)}
          >
            <Icon
              name={setAsDefault ? 'checkbox' : 'square-outline'}
              size={20}
              color={setAsDefault ? colors.primary : colors.textSecondary}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>Set as default address</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.addressSection}>
            <Text style={styles.saveAsText}>Save address as</Text>

            <View style={styles.addressTypeContainer}>
              {addressTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={styles.addressTypeButton}
                  onPress={() => setSelectedAddressType(type.id)}
                >
                  <Icon
                    name={type.icon}
                    size={20}
                    color={colors.textSecondary}
                  />
                  <View
                    style={[
                      styles.textContainer,
                      selectedAddressType === type.id &&
                        styles.selectedTextContainer,
                    ]}
                  >
                    <Text style={styles.addressTypeText}>{type.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title={isLoading ? 'Saving...' : 'Save'}
            onPress={handleSave}
            size="compact"
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

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
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },
  mapContainer: {
    height: 300,
    position: 'relative',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginHorizontal: 10,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.successLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlay: {
    position: 'absolute',
    top: 80,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  mapText: {
    color: colors.surface,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
  userLocation: {
    position: 'absolute',
    bottom: 80,
    right: 60,
  },
  deliveryLocation: {
    position: 'absolute',
    bottom: 120,
    right: 100,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 16,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  addressSection: {
    borderWidth: 1,
    borderColor: colors.grayborder,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginRight: 16,
  },
  saveAsText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressTypeButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  textContainer: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  selectedTextContainer: {
    backgroundColor: colors.successLight,
  },
  addressTypeText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
});

export default ConfirmLocationScreen;
