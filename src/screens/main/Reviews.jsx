import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

/* Dummy Reviews Data */
const initialReviews = [
  {
    id: 1,
    name: 'Amit Patel',
    rating: 3,
    review:
      'I regularly visit this Dabbawala service and I am completely satisfied.',
  },
  {
    id: 2,
    name: 'Riya Shah',
    rating: 4,
    review:
      'The service has been an absolute lifesaver for me as a working professional.',
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    rating: 4,
    review:
      'I regularly visit this Dabbawala service and I am completely satisfied.',
  },
  {
    id: 4,
    name: 'Neha Desai',
    rating: 4,
    review:
      'The service has been an absolute lifesaver for me as a working professional.',
  },
  {
    id: 5,
    name: 'Suresh Parmar',
    rating: 3,
    review:
      'I regularly visit this Dabbawala service and I am completely satisfied.',
  },
  {
    id: 6,
    name: 'Priya Joshi',
    rating: 4,
    review:
      'The service has been an absolute lifesaver for me as a working professional.',
  },
];

const Reviews = ({ navigation }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = () => {
    if (!reviewText || rating === 0) return;

    const newReview = {
      id: Date.now(),
      name: 'You',
      rating,
      review: reviewText,
    };

    setReviews([newReview, ...reviews]);
    setModalVisible(false);
    setRating(0);
    setReviewText('');
  };

  return (
    <>
    <StatusBar
        translucent
        barStyle={modalVisible ? 'light-content' : 'dark-content'}
        backgroundColor={modalVisible ? 'rgba(0,0,0,0.6)' : 'transparent'}
      />
   
    <View style={styles.reviewsSection}>
      <View style={styles.reviewsTitleRow}>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AllReviews', {
              reviews,
            })
          }
        >
          <AntDesign name="right" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {reviews.slice(0, 2).map(item => (
        <View key={item.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewerName}>{item.name}</Text>
            <View style={styles.profileIcon}>
              <SimpleLineIcons name="user" size={16} />
            </View>
          </View>

          <View style={styles.ratingRow}>
            {[...Array(item.rating)].map((_, index) => (
              <Icon key={index} name="star" size={16} color="#FFD700" />
            ))}
          </View>

          <Text style={styles.reviewText}>{item.review}</Text>
        </View>
      ))}

      {/* Share Review Button */}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.shareText}>
          Share Your Review <AntDesign name="right" size={14} />
        </Text>
      </TouchableOpacity>
      

      {/* Write Review Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>

            {/* Rating */}
            <View style={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map(i => (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  <Icon
                    name={i <= rating ? 'star' : 'star-outline'}
                    size={28}
                    color="#FFD700"
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Review Input */}
            <TextInput
              placeholder="Write your review..."
              multiline
              value={reviewText}
              onChangeText={setReviewText}
              style={styles.textInput}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnTextc}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleSubmitReview}
              >
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
 
};


const styles = StyleSheet.create({
  reviewsSection: {
    backgroundColor: colors.surface,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewsTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    textAlign: 'center',
    flex: 1,
  },
  reviewCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontFamily: fonts.family.medium,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  reviewText: {
    color: colors.textSecondary,
  },
  shareButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  shareText: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.md,
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.lg,
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    height: 90,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelBtn: {
    padding: 12,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    color: colors.surface,
    padding: 12,
    borderRadius: 8,
  }, 
  btnTextc: {
    fontFamily: fonts.family.bold,
   
  },
  btnText: {
    fontFamily: fonts.family.bold,
    color:colors.surface,
    
  },
});

export default Reviews;
