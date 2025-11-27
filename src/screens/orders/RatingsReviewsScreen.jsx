import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const RatingsReviewsScreen = ({ navigation }) => {
  const [selectedOrder] = useState({
    id: 'GKK12345',
    provider: 'Mama Kitchen',
    items: ['Dal Rice Combo', 'Roti with Sabzi'],
    date: '2024-01-10'
  });

  const [ratings, setRatings] = useState({
    provider: 0,
    foodQuality: 0,
    delivery: 0
  });

  const [review, setReview] = useState('');

  const handleRating = (category, rating) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const submitReview = () => {
    if (ratings.provider === 0 || ratings.foodQuality === 0 || ratings.delivery === 0) {
      Alert.alert('Error', 'Please rate all categories');
      return;
    }
    
    Alert.alert('Success', 'Thank you for your feedback!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const renderStarRating = (category, currentRating) => (
    <View style={styles.ratingSection}>
      <Text style={styles.ratingLabel}>
        {category === 'provider' ? 'Provider Rating' : 
         category === 'foodQuality' ? 'Food Quality' : 'Delivery Service'}
      </Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRating(category, star)}
          >
            <Icon
              name={star <= currentRating ? 'star' : 'star-outline'}
              size={32}
              color={star <= currentRating ? colors.warning : colors.disabled}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate & Review</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Order Details */}
        <View style={styles.orderCard}>
          <Text style={styles.orderId}>Order #{selectedOrder.id}</Text>
          <Text style={styles.providerName}>{selectedOrder.provider}</Text>
          <Text style={styles.orderDate}>{selectedOrder.date}</Text>
          <View style={styles.itemsList}>
            {selectedOrder.items.map((item, index) => (
              <Text key={index} style={styles.itemText}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* Rating Sections */}
        <View style={styles.ratingsContainer}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          
          {renderStarRating('provider', ratings.provider)}
          {renderStarRating('foodQuality', ratings.foodQuality)}
          {renderStarRating('delivery', ratings.delivery)}
        </View>

        {/* Review Text */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Write a Review (Optional)</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience..."
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginLeft: 15
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  orderCard: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border
  },
  orderId: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textSecondary
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 4
  },
  orderDate: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 12
  },
  itemsList: {
    marginTop: 8
  },
  itemText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 2
  },
  ratingsContainer: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginBottom: 16
  },
  ratingSection: {
    marginBottom: 20
  },
  ratingLabel: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 8
  },
  starsContainer: {
    flexDirection: 'row'
  },
  star: {
    marginRight: 8
  },
  reviewSection: {
    marginBottom: 24
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    minHeight: 100
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30
  },
  submitButtonText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold
  }
});

export default RatingsReviewsScreen;