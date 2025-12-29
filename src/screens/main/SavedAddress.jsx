import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { useGetUserAddressesQuery } from '../../services/api';

const SavedAddress= ({ navigation }) => {
  const { data, isLoading, isError } = useGetUserAddressesQuery();

  const addresses = data?.addresses || [];

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Failed to load addresses</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={item => item._id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="location-outline" size={20} color={colors.primary} />
            <View style={styles.addressContent}>
              <Text style={styles.addressType}>{item.addressType}</Text>
              <Text style={styles.addressText}>
                {item.houseNo}, {item.area}, {item.city}, {item.state}
              </Text>
              <Text style={styles.addressText}>Pincode: {item.pincode}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No saved addresses</Text>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 50,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: fonts.size.lg,
      fontFamily: fonts.family.bold,
    },
    card: {
      flexDirection: 'row',
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
      backgroundColor: colors.surface,
    },
    addressContent: {
      marginLeft: 12,
      flex: 1,
    },
    addressType: {
      fontFamily: fonts.family.medium,
      fontSize: fonts.size.md,
      marginBottom: 4,
    },
    addressText: {
      fontSize: fonts.size.sm,
      color: colors.textSecondary,
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: colors.textSecondary,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default SavedAddress;
