import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { platformStyles } from '../../styles/platform';
import { setGlobalLikedItems } from '../../utils/likedItems';
import { useGetStatesQuery } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const tiffinProviders = [
  {
    id: 1,
    name: 'Harshiksha Dabbawala',
    rating: 4.5,
    location: 'Powai Chowk, Pune',
    distance: '2km away',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Dosa.com',
    rating: 4.8,
    location: 'Satellite, Ahmedabad',
    distance: '1.5km away',
    image:
      'https://images.unsplash.com/photo-1672858502422-ab27ac933910?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Jayshree Sandwich',
    rating: 4.7,
    location: 'Ghatlodiya,Ahmedabad',
    distance: '2.5km away',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop',
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [liked, setLiked] = useState({});
  const { data: states } = useGetStatesQuery();

  // Add this useEffect after line 44
  useEffect(() => {
    console.log('States API Response in HomeScreen:', states);

  }, [states]);

  const filteredProviders = tiffinProviders.filter(provider => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const handleProviderPress = provider => {
    if (navigation) {
      navigation.navigate('ProviderDetail', { provider });
    } else {
      console.log('Selected provider:', provider.name);
    }
  };

  const toggleLike = id => {
    const newLiked = { ...liked, [id]: !liked[id] };
    setLiked(newLiked);
    setGlobalLikedItems(newLiked);
  };

  const renderProvider = ({ item }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() => handleProviderPress(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleLike(item.id)}
        >
          <Icon
            name={liked[item.id] ? 'heart' : 'heart-outline'}
            size={20}
            color={liked[item.id] ? colors.surface : colors.surface}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.providerName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <View style={styles.locationSection}>
              <TouchableOpacity
                style={styles.locationIconContainer}
                onPress={() => navigation.navigate('LocationScreen')}
              >
                <Icon name="location" size={14} color={colors.primary} />
              </TouchableOpacity>

              <View style={styles.textSection}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>Home</Text>
                  <Icon name="chevron-down" size={16} color={colors.primary} />
                </View>
                <TouchableOpacity
                  style={styles.locationContainer}
                  onPress={() => navigation.navigate('LocationScreen')}
                >
                  <Text style={styles.locationText}>
                    {states?.data?.[0]?.stateName || 'Baner,Pune'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.rightIcons}>
            {/* <TouchableOpacity
              style={styles.calendarIcon}
              onPress={() => navigation.navigate('TrackPlan')}
            >
              <View style={styles.calendarIconContainer}>
                <Icon
                  name="calendar-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.notificationIcon}>
              <View style={styles.notificationIconContainer}>
                <Icon
                  name="notifications-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color={colors.primary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite Dabbawala"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={colors.textSecondary}
          />
          <Icon
            name="mic"
            size={20}
            color={colors.primary}
            style={styles.micIcon}
          />
        </View>
      </View>

      <FlatList
        data={filteredProviders}
        renderItem={renderProvider}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSection: {
    marginLeft: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginRight: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    backgroundColor: colors.successLight,
    borderRadius: 12,
    padding: 6,
    marginRight: 8,
  },
  locationText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginRight: 6,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // calendarIcon: {
  //   padding: 4,
  //   marginRight: 8,
  // },
  // calendarIconContainer: {
  //   backgroundColor: colors.successLight,
  //   borderRadius: 20,
  //   padding: 8,
  // },

  notificationIcon: {
    padding: 4,
  },
  notificationIconContainer: {
    backgroundColor: colors.successLight,
    borderRadius: 20,
    padding: 8,
  },
  userIcon: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  micIcon: {
    marginLeft: 10,
  },

  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 100,
  },

  providerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    ...platformStyles.shadow,
  },
  imageContainer: {
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    // borderRadius: 20,
    padding: 8,
  },

  foodImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    flex: 1,
  },
  locationText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  distanceText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
