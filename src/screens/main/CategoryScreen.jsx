import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { tiffinProviders } from '../main/HomeScreen';

const CategoryScreen = ({ route, navigation }) => {
  const params = route?.params ?? {};
  const { category, dishImage, dishTitle } = params;

  if (!category) {
    return null;
  }

  const filteredProviders = tiffinProviders.filter(
    item => item.category === category,
  );

  const renderProvider = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.restaurantCard}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('ProviderDetail', { provider: item })
        }
      >
        {/* LEFT CONTENT */}
        <View style={styles.leftContent}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.restaurantDesc} numberOfLines={2}>
            {item.description}
          </Text>

          {/* PRICE + RATING */}
          <View style={styles.priceRatingRow}>
            <Text style={styles.restaurantPrice}>{item.price}</Text>

            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color={colors.primary} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>

        {/* RIGHT IMAGE */}
        <View style={styles.rightSection}>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* TOP IMAGE */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: dishImage }} style={styles.topImage} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
      </View>

      {/* TITLE */}
      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>{dishTitle || category}</Text>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredProviders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProvider}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  imageWrapper: {
    height: 260,
  },

  topImage: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleWrapper: {
    paddingVertical: 12,
    backgroundColor: colors.background,
  },

  headerTitle: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    textAlign: 'center',
    color: colors.textPrimary,
  },

  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 3 },
    }),
  },

  leftContent: {
    flex: 1,
    paddingRight: 12,
  },

  restaurantName: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },

  restaurantDesc: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },

  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  restaurantPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.bold,
    color: colors.primary,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: fonts.size.sm,
    color: colors.textPrimary,
  },

  rightSection: {
    alignItems: 'center',
  },

  restaurantImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
});

export default CategoryScreen;
