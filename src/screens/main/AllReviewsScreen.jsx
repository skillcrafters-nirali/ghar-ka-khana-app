import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const AllReviewsScreen = ({ route, navigation }) => {
  const { reviews = [] } = route.params || {};

  return (
    <View style={styles.container}>
    <StatusBar
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
    />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Reviews</Text>
        {/* Empty view to balance center title */}
        <View style={{ width: 24 }} />
      </View>

      {/* Review List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {reviews.map(item => (
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
      </ScrollView>
      </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.lg,
  },
  
  backBtn: {
    width: 24,
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  reviewCard: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: { fontFamily: fonts.family.medium },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: { flexDirection: 'row', marginVertical: 6 },
  reviewText: { color: colors.textSecondary },
});

export default AllReviewsScreen;
