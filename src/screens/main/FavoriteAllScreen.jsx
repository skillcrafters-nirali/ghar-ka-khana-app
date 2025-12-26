import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { platformStyles } from '../../styles/platform';
import { getGlobalLikedItems } from '../../utils/likedItems';
import { tiffinProviders } from './HomeScreen';

const FavoriteAllScreen = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      const globalLiked = getGlobalLikedItems();
      if (globalLiked && typeof globalLiked === 'object') {
        const filteredLikedItems = Object.keys(globalLiked)
          .filter(id => globalLiked[id])
          .map(id =>
            tiffinProviders.find(provider => provider.id.toString() === id),
          )
          .filter(Boolean);
        setLikedItems(filteredLikedItems);
      } else {
        setLikedItems([]);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const filteredLikedItems = likedItems.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderProvider = ({ item }) => (
    <TouchableOpacity style={styles.providerCard}
    onPress={() =>
      navigation.navigate('ProviderDetail', {
        provider: item,
      })
    }
  
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />
        <TouchableOpacity style={styles.heartIcon}>
          <Icon name="heart" size={20} color={colors.surface} />
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
        {!!item.description && (
          <Text style={styles.descriptionText} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        {!!item.price && <Text style={styles.priceText}>{item.price}</Text>}

        <View style={styles.bottomRow}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Fav Dabbas</Text>

      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color={colors.primary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for your favorite Dabbawalas"
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

      <FlatList
        data={filteredLikedItems}
        renderItem={renderProvider}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
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
  descriptionText: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 18,
  },

  priceText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginTop: 6,
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

export default FavoriteAllScreen;
