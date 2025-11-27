import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const ConfirmLocationScreen = ({ navigation }) => {
  const [receiverName, setReceiverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [selectedAddressType, setSelectedAddressType] = useState('Home');

  const addressTypes = [
    { id: 'Home', icon: 'home', label: 'Home' },
    { id: 'Work', icon: 'business', label: 'Work' },
    { id: 'Other', icon: 'add', label: 'Other' }
  ];

  const handleSave = () => {
    // Save address logic
    navigation.goBack();
  };

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
        <Text style={styles.title}>Confirm delivery location</Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Baner, Pune"
            placeholderTextColor={colors.textSecondary}
          />
          <Icon name="mic" size={20} color={colors.primary} />
        </View>
        
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>Your address will be delivered here</Text>
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
          placeholder="Name of the Receiver"
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
          placeholder="Area/Sector/Landmark"
          value={landmark}
          onChangeText={setLandmark}
          placeholderTextColor={colors.textSecondary}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => setSetAsDefault(!setAsDefault)}
          >
            <Icon 
              name={setAsDefault ? "checkbox" : "square-outline"} 
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
              {addressTypes.map((type) => (
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
                  <View style={[
                    styles.textContainer,
                    selectedAddressType === type.id && styles.selectedTextContainer
                  ]}>
                    <Text style={styles.addressTypeText}>
                      {type.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title="Save"
            onPress={handleSave}
            size='compact'
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
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  mapContainer: {
    height: 300,
    position: 'relative'
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
    elevation: 3
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginHorizontal: 10
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.successLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapOverlay: {
    position: 'absolute',
    top: 80,
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15
  },
  mapText: {
    color: colors.surface,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular
  },
  locationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15
  },
  userLocation: {
    position: 'absolute',
    bottom: 80,
    right: 60
  },
  deliveryLocation: {
    position: 'absolute',
    bottom: 120,
    right: 100
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  sectionTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 20
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
    marginBottom: 16
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  checkbox: {
    marginRight: 10
  },
  checkboxText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 30
  },
  addressSection: {
    borderWidth: 1,
    borderColor: colors.grayborder,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginRight: 16
  },
  saveAsText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: 'center'
  },
  addressTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addressTypeButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
  textContainer: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12
  },
  selectedTextContainer: {
    backgroundColor: colors.successLight
  },
  addressTypeText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary
  },
  
  
  
});

export default ConfirmLocationScreen;