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
import OfferSlider from '../../components/home/OfferSlider';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { platformStyles } from '../../styles/platform';
import { setGlobalLikedItems } from '../../utils/likedItems';
// import { useGetStatesQuery } from '../../services/api';
import { useGetUserAddressesQuery } from '../../services/api';
import { requestLocationPermission } from '../../utils/locationPermission';
export const tiffinProviders = [
  // Gujarati Restaurants
  {
    id: 1,
    name: 'Rotlo Gujarati Rasthal',
    rating: 4.5,
    description: 'Authentic Gujarati home-style meals',
    price: '₹120 / meal',
    category: 'Gujarati',
    image:
      'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
    menu: {
      lunch: {
        Subji: [
          { id: 1, name: 'Bhindi Masala', price: 40 },
          { id: 2, name: 'Aloo Tamatar', price: 35 },
        ],
        Roti: [
          { id: 3, name: 'Chapati', price: 10 },
          { id: 4, name: 'Thepla', price: 15 },
        ],
        Dal: [{ id: 5, name: 'Dal Fry', price: 30 }],
        Rice: [{ id: 6, name: 'Plain Rice', price: 20 }],
        Papad: [{ id: 7, name: 'Roasted Papad', price: 10 }],
      },

      dinner: {
        Subji: [{ id: 8, name: 'Paneer Bhurji', price: 60 }],
        Roti: [{ id: 9, name: 'Butter Roti', price: 15 }],
        Dal: [{ id: 5, name: 'Dal Fry', price: 30 }],
        Rice: [{ id: 6, name: 'Plain Rice', price: 20 }],
        Papad: [{ id: 7, name: 'Roasted Papad', price: 10 }],
      },
    },

    COMBOS: [
      {
        id: 'combo1',
        name: '1 Sabji + 4 Roti + salad',
        price: 110,
      },
      { id: 'combo2', name: '1 sabji + 4 Roti + Rice + Daal', price: 170 },

      {
        id: 'combo3',
        name: '1 Green sabji + 1 kathol sabji + 1 sweet + salad + rice + daal + 3 roti',
        price: 210,
      },
      {
        id: 'combo4',
        name: '2 sabji + 5 roti + 1 sweet + salad + rice daal + Bhajiya/farshan + chas ',
        price: 300,
      },
    ],
  },
  {
    id: 2,
    name: 'Gujarati Rasoi',
    rating: 4.3,
    description: 'Traditional Gujarati thali meals',
    price: '₹110 / meal',
    category: 'Gujarati',
    image:
      'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 3,
    name: 'Shree Gujarati Thali',
    rating: 4.6,
    description: 'Homely Gujarati delicacies',
    price: '₹130 / meal',
    category: 'Gujarati',
    image:
      'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 4,
    name: 'Rasoi Ghar',
    rating: 4.4,
    description: 'Authentic Gujarati cuisine',
    price: '₹125 / meal',
    category: 'Gujarati',
    image:
      'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 5,
    name: 'Swad Gujarati',
    rating: 4.2,
    description: 'Traditional Gujarati home meals',
    price: '₹115 / meal',
    category: 'Gujarati',
    image:
      'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },

  // Punjabi Restaurants
  {
    id: 6,
    name: 'Nutan Restaurant',
    rating: 4.7,
    description: 'Rich Punjabi home-style thali meals',
    price: '₹180 / meal',
    category: 'Punjabi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 7,
    name: 'Amritsari Tandoor',
    rating: 4.5,
    description: 'Authentic Punjabi tandoori dishes',
    price: '₹190 / meal',
    category: 'Punjabi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 8,
    name: 'Patiala Rasoi',
    rating: 4.6,
    description: 'Traditional Punjabi meals with spices',
    price: '₹185 / meal',
    category: 'Punjabi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 9,
    name: 'Ludhiana Food Corner',
    rating: 4.4,
    description: 'Authentic Punjabi cuisine',
    price: '₹175 / meal',
    category: 'Punjabi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 10,
    name: 'Shahi Punjabi Thali',
    rating: 4.7,
    description: 'Rich Punjabi thali meals',
    price: '₹200 / meal',
    category: 'Punjabi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },

  // Kathiyavadi Restaurants
  {
    id: 11,
    name: 'Shiv Shakti Kathiyavadi',
    rating: 4.8,
    description: 'Traditional Kathiyavadi spicy home meals',
    price: '₹140 / meal',
    category: 'Kathiyavadi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 12,
    name: 'Kathiyavadi Rasoi',
    rating: 4.6,
    description: 'Authentic Kathiyavadi cuisine',
    price: '₹150 / meal',
    category: 'Kathiyavadi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 13,
    name: 'Rann Rasoi',
    rating: 4.5,
    description: 'Traditional Kathiyavadi meals',
    price: '₹145 / meal',
    category: 'Kathiyavadi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 14,
    name: 'Kathiyavadi Thali House',
    rating: 4.7,
    description: 'Spicy Kathiyavadi delicacies',
    price: '₹150 / meal',
    category: 'Kathiyavadi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 15,
    name: 'Desi Kathiyavadi',
    rating: 4.6,
    description: 'Authentic home-style Kathiyavadi meals',
    price: '₹140 / meal',
    category: 'Kathiyavadi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },

  // Rajasthani Restaurants
  {
    id: 16,
    name: 'Rajasthani Rasoi',
    rating: 4.7,
    description: 'Authentic Rajasthani traditional meals',
    price: '₹160 / meal',
    category: 'Rajasthani',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 17,
    name: 'Shahi Rajasthani Thali',
    rating: 4.8,
    description: 'Royal Rajasthani meals with authentic flavors',
    price: '₹170 / meal',
    category: 'Rajasthani',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 18,
    name: 'Desert Rasoi',
    rating: 4.6,
    description: 'Traditional Rajasthani thali meals',
    price: '₹165 / meal',
    category: 'Rajasthani',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 19,
    name: 'Marwari Thali House',
    rating: 4.5,
    description: 'Authentic Marwari cuisine',
    price: '₹160 / meal',
    category: 'Rajasthani',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 20,
    name: 'Rajwada Rasoi',
    rating: 4.7,
    description: 'Rajasthani traditional meals with spices',
    price: '₹170 / meal',
    category: 'Rajasthani',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
];

const filters = [
  {
    id: 1,
    title: 'Gujarati Dish',
    image:
      'https://i.pinimg.com/736x/0d/7a/cc/0d7acc1107cdfbf6eac99ea21439677b.jpg',
  },
  {
    id: 2,
    title: 'Punjabi Dish',
    image:
      'https://i.pinimg.com/736x/ec/0b/02/ec0b0210349d66863283c2b4a4a35604.jpg',
  },
  {
    id: 3,
    title: 'Kathiyavadi Dish',
    image:
      'https://i.pinimg.com/1200x/1d/54/61/1d54611913f3fcef1431758df428c2f5.jpg',
  },
  {
    id: 4,
    title: 'Rajasthani Dish',
    image:
      'https://i.pinimg.com/1200x/71/f3/4d/71f34dc09917ebbab207edd680f17539.jpg',
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [liked, setLiked] = useState({});
  // const { data: states } = useGetStatesQuery();
  const { data: addressResponse } = useGetUserAddressesQuery();

  const selectedAddress =
    addressResponse?.data?.find(addr => addr.isSelected) ||
    addressResponse?.data?.[0];

  const getFullAddress = addr => {
    if (!addr) return 'Select delivery location';

    const city = addr['cityData.cityName'] || addr.cityName || '';

    const state = addr['stateData.stateName'] || addr.stateName || '';

    const pincode = addr.pincode || '';

    const parts = [
      addr.address,
      city && state ? `${city}, ${state}` : city || state,
      pincode,
    ].filter(Boolean);

    return parts.join(', ');
  };

  const filteredProviders = tiffinProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchText.toLowerCase()),
  );

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
      style={styles.kitchenCard}
      onPress={() => handleProviderPress(item)}
    >
      <View style={styles.kitchenImageContainer}>
        <Image source={{ uri: item.image }} style={styles.kitchenImage} />

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={12} color={colors.surface} />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>

        {/* Heart Icon */}
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleLike(item.id)}
        >
          <Icon
            name={liked[item.id] ? 'heart' : 'heart-outline'}
            size={18}
            color={colors.surface}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.kitchenContent}>
        <Text style={styles.kitchenName} numberOfLines={1}>
          {item.name}
        </Text>

        {!!item.description && (
          <Text style={styles.kitchenDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        {!!item.price && <Text style={styles.kitchenPrice}>{item.price}</Text>}
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const askPermission = async () => {
      const granted = await requestLocationPermission();
      console.log('Location permission:', granted);
    };

    askPermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          {/* Left Section */}
          <TouchableOpacity
            style={styles.locationSection}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('LocationScreen')}
          >
            <View style={styles.locationIconContainer}>
              <Icon name="location" size={14} color={colors.primary} />
            </View>

            <View>
              {/* <Text style={styles.title}>Home</Text> */}
              <Text style={styles.title}>
                {selectedAddress?.type || 'Location'}
              </Text>

              {/* <Text style={styles.locationText}>
                {states?.data?.[0]?.stateName || 'Baner, Pune'}
              </Text> */}

              <Text style={styles.locationText} numberOfLines={1}>
                {getFullAddress(selectedAddress)}
              </Text>
            </View>
          </TouchableOpacity>
          {/* Right Srction */}
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <View style={styles.notificationWrapper}>
              <Icon
                name="notifications-outline"
                size={22}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite Dabbawala"
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Icon name="mic" size={20} color={colors.primary} />
        </View>
      </View>

      <FlatList
        data={filteredProviders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProvider}
        numColumns={2}
        columnWrapperStyle={{ gap: 18 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        ListHeaderComponent={
          <>
            <OfferSlider />

            {/* POPULAR FILTER */}
            <Text style={styles.sectionTitle}>Popular Filter</Text>

            <FlatList
              horizontal
              data={filters}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.filterChip}
                  onPress={() =>
                    navigation.navigate('CategoryScreen', {
                      category: item.title.split(' ')[0],
                      dishImage: item.image,
                      dishTitle: item.title,
                    })
                  }
                >
                  <View style={styles.filterImageWrapper}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.filterImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.filterText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.sectionTitle}>Kitchen Near You</Text>
          </>
        }
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
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  locationIconContainer: {
    backgroundColor: colors.successLight,
    padding: 6,
    borderRadius: 12,
    marginRight: 8,
  },

  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },

  locationText: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
    maxWidth: 220,
    lineHeight: 18,
  },

  notificationWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: fonts.size.md,
    color: colors.textPrimary,
  },

  filterImage: {
    width: 58,
    height: 58,
  },
  filterImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.grayborder,
  },
  kitchenCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...platformStyles.shadow,
  },

  kitchenImageContainer: {
    position: 'relative',
  },
  kitchenImage: {
    width: '100%',
    height: 140,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingBadgeText: {
    color: colors.surface,
    fontSize: fonts.size.xs,
    marginLeft: 4,
    fontFamily: fonts.family.medium,
  },

  kitchenContent: {
    padding: 10,
  },

  kitchenName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },
  kitchenDescription: {
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },

  kitchenPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginTop: 6,
  },

  offerCard: {
    flexDirection: 'row',
    backgroundColor: colors.successLight,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  offerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.error,
  },

  offerSub: {
    fontSize: fonts.size.sm,
    color: colors.textPrimary,
    marginTop: 4,
  },

  offerImage: {
    width: 100,
    height: 80,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 16,
  },

  filterChip: {
    width: 90,
    alignItems: 'center',
    marginRight: 14,
  },

  filterText: {
    fontSize: fonts.size.xs,
    marginTop: 8,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },

  imageContainer: {
    position: 'relative',
  },

  foodImage: {
    width: '100%',
    height: 150,
  },

  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
