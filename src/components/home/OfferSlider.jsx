import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../common/Button';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = 320;
const CARD_MARGIN = 16;

const offers = [
  {
    id: 1,
    title: '100% Off',
    subtitle: 'Enjoy your first trial meal for free',
    code: 'NEW99',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    bgColor: colors.successLight,
  },
  {
    id: 2,
    title: 'Flat ₹50 Off',
    subtitle: 'On orders above ₹299',
    code: 'SAVE50',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    bgColor: colors.tertiary,
  },
  {
    id: 3,
    title: 'Free Delivery',
    subtitle: 'For premium subscribers',
    code: 'FREEDEL',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    bgColor: colors.successLight,
  },
];

const OfferSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= offers.length) {
        nextIndex = 0;
      }

      setCurrentIndex(nextIndex);

      const offset = nextIndex * (CARD_WIDTH + CARD_MARGIN);
      flatListRef.current?.scrollToOffset({
        offset,
        animated: true,
      });
    }, 3000); // scroll every 3 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.bgColor }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.subtitle}</Text>
        <Button
          title={item.code}
          variant="secondary"
          size="small"
          style={{ marginTop: 8, alignSelf: 'flex-start' }}
        />
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={offers}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      scrollEnabled={false} // disables manual scrolling for smooth auto-scroll
    />
  );
};

export default OfferSlider;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginRight: CARD_MARGIN,
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.error,
  },
  sub: {
    fontSize: fonts.size.sm,
    color: colors.textPrimary,
    marginTop: 4,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 12,
    marginLeft: 10,
  },
});
