import React, { useState } from 'react';
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
import Button from '../../components/common/Button';
import { tiffinProviders } from '../main/HomeScreen';

const CategoryScreen = ({ route, navigation }) => {

  const [cart, setCart] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const params = route?.params ?? {};
  const { category, dishImage, dishTitle } = params;

  const addToCart = id => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setCart(prev => ({ ...prev, [id]: 1 }));
  };

  const increaseQty = id => {
    setCart(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = id => {
    setCart(prev => {
      if (prev[id] === 1) {
        const updatedCart = { ...prev };
        delete updatedCart[id];

        setAddedItems(a => {
          const updatedAdded = { ...a };
          delete updatedAdded[id];
          return updatedAdded;
        });

        return updatedCart;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  if (!category) {
    return null;
  }

  const filteredProviders = tiffinProviders.filter(
    item => item.category === category,
  );

  const renderProvider = ({ item }) => {
    const qty = cart[item.id] || 1;

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

          {/* TRY & SUBSCRIBE */}
          <View style={styles.actionRow}>
            <Button
              title="Try"
              variant="outline"
              size="small"
              style={styles.tryBtn}
              onPress={() => {}}
            />
            <Button
              title="Subscribe"
              variant="secondary"
              size="small"
              style={styles.subscribeBtn}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* RIGHT IMAGE + CART */}
        <View style={styles.rightSection}>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />

          {!addedItems[item.id] ? (
            <Button
              title="Add Cart"
              size="small"
              variant="primary"
              style={styles.addCartBtn}
              onPress={() => addToCart(item.id)}
            />
          ) : (
            <View style={styles.cartControls}>
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() => decreaseQty(item.id)}
              >
                <Text style={styles.cartBtnText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.cartQty}>{qty}</Text>

              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() => increaseQty(item.id)}
              >
                <Text style={styles.cartBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

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

  actionRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },

  tryBtn: {
    borderRadius: 6,
    paddingHorizontal: 14,
  },

  subscribeBtn: {
    borderRadius: 6,
    paddingHorizontal: 14,
  },

  rightSection: {
    alignItems: 'center',
  },

  restaurantImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },

  addCartBtn: {
    marginTop: 6,
    borderRadius: 8,
    paddingHorizontal: 18,
  },

  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    overflow: 'hidden',
  },

  cartBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartBtnText: {
    fontSize: fonts.size.md,
    color: colors.primary,
    fontFamily: fonts.family.bold,
  },

  cartQty: {
    width: 28,
    textAlign: 'center',
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },
});

export default CategoryScreen;
