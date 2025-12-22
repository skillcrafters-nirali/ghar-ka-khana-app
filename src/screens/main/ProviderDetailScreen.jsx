import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import SubscriptionCard from '../../components/common/SubscriptionCard';
import ProviderHeader from '../../components/common/ProviderHeader';
import Button from '../../components/common/Button';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


// // const subscriptionPlans = [
// //   {
// //     id: 1,
// //     title: 'Weekly Plan',
// //     type: 'Vegetarian Plan',
// //     price: '₹500 - ₹900 per week',
// //     description: 'Basic vegetarian meals with dal, rice, sabzi, and vegetables'
// //   },
// //   {
// //     id: 2,
// //     title: 'Monthly Plan',
// //     type: 'Vegetarian Plan',
// //     price: '₹2000 - ₹3500 per month',
// //     description:
// //       'Includes vegetarian meals with chapati, kadhi/sabzi and salad'
// //   },
// //   {
// //     id: 3,
// //     title: 'Weekly Plan',
// //     type: 'Vegetarian Plan',
// //     price: '₹500 - ₹900 per week',
// //     description: 'Basic vegetarian meals with dal, rice, sabzi, and vegetables'
// //   },
// //   {
// //     id: 4,
// //     title: 'Monthly Plan',
// //     type: 'Vegetarian Plan',
// //     price: '₹2000 - ₹3500 per month',
// //     description:
// //       'Includes vegetarian meals with chapati, kadhi/sabzi and salad'
// //   },
// // ];

// const todaysMenu = {
//   lunch: [
//     { id: 1, left: 'Chapati', right: 'Varan/Bhaat' },
//     { id: 2, left: 'Aloo Bhaji', right: 'Pickle' },
//     { id: 3, left: 'Amti', right: 'Koshimbir' },
//   ],
//   dinner: [
//     { id: 1, left: 'Chapati', right: 'Masala Bhaat' },
//     { id: 2, left: 'Varhran Bhaji', right: 'Pickle' },
//     { id: 3, left: 'Amti', right: 'Salad' },
//   ]
// };

// const reviewsData = [
//   {
//     id: 1,
//     name: 'Nutritional Service Neeru Dhabale',
//     rating: 5,
//     review:
//       'I regularly visit this Dabbawala service and I am completely satisfied with the food and freshness. Hygiene is very good and the food is very delicious. The food comes hot and fresh daily and I am very happy with the service.'
//   },
//   {
//     id: 2,
//     name: 'Pallavi Shevade',
//     rating: 5,
//     review:
//       'The Dabbawala service has been an absolute lifesaver for me as a working professional. The food quality is consistently good and the delivery is always on time. The food comes hot and fresh every day and I am very happy with the service.'
//   },
//   {
//     id: 3,
//     name: 'Deepa Shinde',
//     rating: 5,
//     review:
//       "I've been using this Dabbawala service for over a year and I am completely satisfied with the food and freshness. Hygiene is very good and the food is very delicious. The food comes hot and fresh daily and I am very happy with the service."
//   },
// ];

const ProviderDetailScreen = ({ route, navigation }) => {
  const { provider } = route?.params || {
    provider: {
      name: 'Moteshree Dabbawala',
      rating: 4.2,
      location: 'Vasant Vihar/Sector Pune',
      type: 'Veg',
      image: 'https://via.placeholder.com/300x200'
    }
  };

  const handleBuyPress = plan => {
    navigation.navigate('MenuSubscription', { provider, selectedPlan: plan });
  };

  const renderSubscriptionCard = ({ item }) => (
    <SubscriptionCard plan={item} onBuyPress={handleBuyPress} />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={colors.surface}
        barStyle="light-content"
      />
      <ScrollView nestedScrollEnabled={true}>
        {/* Provider Header with Image */}

        <ProviderHeader
          provider={provider}
          onBackPress={() => navigation?.goBack()}
          onMenuPress={() => console.log('Menu pressed')}
        />

        {/* Subscriptions Title */}
        {/* <View style={styles.subscriptionsHeader}>
          <Text style={styles.subscriptionsTitle}>Subscription</Text>
        </View> */}

        {/* Subscription Cards */}
        {/* <View style={styles.cardsContainer}>
          <FlatList
            data={subscriptionPlans}
            renderItem={renderSubscriptionCard}
            keyExtractor={item => item.id.toString()}
            horizontal
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ height: 250 }}
          />
        </View> */}

        {/* Today's Menu Section
        <View style={styles.menuSection}>
          <View style={styles.decorativeTop} />
          <Text style={styles.sectionTitle}>Today's Menu</Text>
          <View style={styles.decorativeLine} />

          Lunch
          <View style={styles.mealSection}>
            <Text style={styles.mealTitle}>Lunch</Text>
            <View style={styles.menuItems}>
              {todaysMenu.lunch.map(item => (
                <View key={item.id} style={styles.menuRow}>
                  <Text style={styles.menuItemLeft}>{item.left}</Text>
                  <Text style={styles.menuItemRight}>{item.right}</Text>
                </View>
              ))}
            </View>
          </View>

          Dinner
          <View style={styles.mealSection}>
            <Text style={styles.mealTitle}>Dinner</Text>
            <View style={styles.menuItems}>
              {todaysMenu.dinner.map(item => (
                <View key={item.id} style={styles.menuRow}>
                  <Text style={styles.menuItemLeft}>{item.left}</Text>
                  <Text style={styles.menuItemRight}>{item.right}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.decorativeBottom} />
        </View> */}

        {/* Reviews Section */}
        {/* <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Reviews</Text>

          {reviewsData.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.profileIcon}>
                  <SimpleLineIcons name="user" color="#000" size={16} />
                </View>
              </View>
              <View style={styles.ratingRow}>
                {[...Array(review.rating)].map((_, index) => (
                  <Icon key={index} name="star" size={16} color="#FFD700" />
                ))}
              </View>
              <Text style={styles.reviewText}>{review.review}</Text>
            </View>
          ))}
          <Text style={styles.viewMoreText}>
            View more reviews
            <AntDesign name="right" color="#000" size={16} />
          </Text>
        </View> */}

        {/* Book Demo Meal Button */}
        {/* <View style={styles.demoButtonContainer}>
          <Button title="Book Your Demo Meal" variant="primary" size="large" 
          onPress={() => navigation.navigate('Cart')}
          />
        </View> */}
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
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  backButton: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginRight: 16
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginLeft: 16
  },

  subscriptionsHeader: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10
  },
  subscriptionsTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },

  cardsContainer: {
    paddingBottom: 20
  },
  cardsList: {
    paddingLeft: 16,
    paddingRight: 16
  },

  cardsContent: {
    paddingRight: 16
  },

  // Menu Section Styles
  menuSection: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border
  },
  decorativeTop: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  decorativeLine: {
    height: 1,
    backgroundColor: colors.textSecondary,
    marginVertical: 8
  },
  mealSection: {
    marginBottom: 16
  },
  mealTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8
  },
  menuItems: {
    paddingHorizontal: 20
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  menuItemLeft: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    textAlign: 'left',
    flex: 1
  },
  menuItemRight: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    textAlign: 'right',
    flex: 1
  },
  decorativeBottom: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 8
  },

  // Reviews Section Styles
  reviewsSection: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  reviewsTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16
  },
  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileText: {
    fontSize: 16
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  reviewerName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    flex: 1
  },
  ratingContainer: {
    marginLeft: 8
  },
  rating: {
    fontSize: fonts.size.sm,
    color: '#FFD700'
  },
  reviewText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    lineHeight: 20
  },
  viewMoreButton: {
    alignSelf: 'center',
    marginTop: 8
  },
  viewMoreText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },

  // Demo Button Styles
  demoButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  
});

export default ProviderDetailScreen;
