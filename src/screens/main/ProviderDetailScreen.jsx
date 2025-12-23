// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   FlatList
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';
// import { fonts } from '../../styles/fonts';
// import SubscriptionCard from '../../components/common/SubscriptionCard';
// import ProviderHeader from '../../components/common/ProviderHeader';
// import Button from '../../components/common/Button';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const subscriptionPlans = [
//   {
//     id: 1,
//     title: 'Weekly Plan',
//     type: 'Vegetarian Plan',
//     price: '₹500 - ₹900 per week',
//     description: 'Basic vegetarian meals with dal, rice, sabzi, and vegetables'
//   },
//   {
//     id: 2,
//     title: 'Monthly Plan',
//     type: 'Vegetarian Plan',
//     price: '₹2000 - ₹3500 per month',
//     description:
//       'Includes vegetarian meals with chapati, kadhi/sabzi and salad'
//   },
//   {
//     id: 3,
//     title: 'Weekly Plan',
//     type: 'Vegetarian Plan',
//     price: '₹500 - ₹900 per week',
//     description: 'Basic vegetarian meals with dal, rice, sabzi, and vegetables'
//   },
//   {
//     id: 4,
//     title: 'Monthly Plan',
//     type: 'Vegetarian Plan',
//     price: '₹2000 - ₹3500 per month',
//     description:
//       'Includes vegetarian meals with chapati, kadhi/sabzi and salad'
//   },
// ];

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

// const ProviderDetailScreen = ({ route, navigation }) => {
//   const { provider } = route?.params || {
//     provider: {
//       name: 'Moteshree Dabbawala',
//       rating: 4.2,
//       location: 'Vasant Vihar/Sector Pune',
//       type: 'Veg',
//       image: 'https://via.placeholder.com/300x200'
//     }
//   };

//   const handleBuyPress = plan => {
//     navigation.navigate('MenuSubscription', { provider, selectedPlan: plan });
//   };

//   const renderSubscriptionCard = ({ item }) => (
//     <SubscriptionCard plan={item} onBuyPress={handleBuyPress} />
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         translucent
//         backgroundColor={colors.surface}
//         barStyle="light-content"
//       />
//       <ScrollView nestedScrollEnabled={true}>
//         {/* Provider Header with Image */}

//         <ProviderHeader
//           provider={provider}
//           onBackPress={() => navigation?.goBack()}
//           onMenuPress={() => console.log('Menu pressed')}
//         />

//         {/* Subscriptions Title */}
//         <View style={styles.subscriptionsHeader}>
//           <Text style={styles.subscriptionsTitle}>Subscription</Text>
//         </View>

//         {/* Subscription Cards */}
//         <View style={styles.cardsContainer}>
//           <FlatList
//             data={subscriptionPlans}
//             renderItem={renderSubscriptionCard}
//             keyExtractor={item => item.id.toString()}
//             horizontal
//             nestedScrollEnabled={true}
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 16 }}
//             style={{ height: 250 }}
//           />
//         </View>

//          {/* Today's Menu Section */}
//         <View style={styles.menuSection}>
//           <View style={styles.decorativeTop} />
//           <Text style={styles.sectionTitle}>Today's Menu</Text>
//           <View style={styles.decorativeLine} />

//           Lunch
//           <View style={styles.mealSection}>
//             <Text style={styles.mealTitle}>Lunch</Text>
//             <View style={styles.menuItems}>
//               {todaysMenu.lunch.map(item => (
//                 <View key={item.id} style={styles.menuRow}>
//                   <Text style={styles.menuItemLeft}>{item.left}</Text>
//                   <Text style={styles.menuItemRight}>{item.right}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>

//           Dinner
//           <View style={styles.mealSection}>
//             <Text style={styles.mealTitle}>Dinner</Text>
//             <View style={styles.menuItems}>
//               {todaysMenu.dinner.map(item => (
//                 <View key={item.id} style={styles.menuRow}>
//                   <Text style={styles.menuItemLeft}>{item.left}</Text>
//                   <Text style={styles.menuItemRight}>{item.right}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>

//           <View style={styles.decorativeBottom} />
//         </View>

//         {/* Reviews Section */}
//         <View style={styles.reviewsSection}>
//           <Text style={styles.reviewsTitle}>Reviews</Text>

//           {reviewsData.map(review => (
//             <View key={review.id} style={styles.reviewCard}>
//               <View style={styles.reviewHeader}>
//                 <Text style={styles.reviewerName}>{review.name}</Text>
//                 <View style={styles.profileIcon}>
//                   <SimpleLineIcons name="user" color="#000" size={16} />
//                 </View>
//               </View>
//               <View style={styles.ratingRow}>
//                 {[...Array(review.rating)].map((_, index) => (
//                   <Icon key={index} name="star" size={16} color="#FFD700" />
//                 ))}
//               </View>
//               <Text style={styles.reviewText}>{review.review}</Text>
//             </View>
//           ))}
//           <Text style={styles.viewMoreText}>
//             View more reviews
//             <AntDesign name="right" color="#000" size={16} />
//           </Text>
//         </View>

//         {/* Book Demo Meal Button */}
//         <View style={styles.demoButtonContainer}>
//           <Button title="Book Your Demo Meal" variant="primary" size="large"
//           onPress={() => navigation.navigate('Cart')}
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border
//   },
//   backButton: {
//     fontSize: fonts.size.xl,
//     fontFamily: fonts.family.bold,
//     color: colors.primary,
//     marginRight: 16
//   },
//   headerTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginLeft: 16
//   },

//   subscriptionsHeader: {
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 10
//   },
//   subscriptionsTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     textAlign: 'center'
//   },

//   cardsContainer: {
//     paddingBottom: 20
//   },
//   cardsList: {
//     paddingLeft: 16,
//     paddingRight: 16
//   },

//   cardsContent: {
//     paddingRight: 16
//   },

//   // Menu Section Styles
//   menuSection: {
//     backgroundColor: colors.surface,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: colors.border
//   },
//   decorativeTop: {
//     height: 1,
//     backgroundColor: colors.textSecondary,
//     marginBottom: 8
//   },
//   sectionTitle: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     textAlign: 'center'
//   },
//   decorativeLine: {
//     height: 1,
//     backgroundColor: colors.textSecondary,
//     marginVertical: 8
//   },
//   mealSection: {
//     marginBottom: 16
//   },
//   mealTitle: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     textAlign: 'center',
//     marginBottom: 8
//   },
//   menuItems: {
//     paddingHorizontal: 20
//   },
//   menuRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 4
//   },
//   menuItemLeft: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textPrimary,
//     textAlign: 'left',
//     flex: 1
//   },
//   menuItemRight: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textPrimary,
//     textAlign: 'right',
//     flex: 1
//   },
//   decorativeBottom: {
//     height: 1,
//     backgroundColor: colors.border,
//     marginTop: 8
//   },

//   // Reviews Section Styles
//   reviewsSection: {
//     backgroundColor: colors.surface,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: colors.border
//   },
//   reviewsTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     textAlign: 'center',
//     marginBottom: 16
//   },
//   reviewCard: {
//     backgroundColor: colors.surface,
//     borderRadius: 15,
//     padding: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: colors.textSecondary,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2
//   },
//   profileIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: colors.textSecondary,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   profileText: {
//     fontSize: 16
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     marginBottom: 8
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8
//   },
//   reviewerName: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.textPrimary,
//     flex: 1
//   },
//   ratingContainer: {
//     marginLeft: 8
//   },
//   rating: {
//     fontSize: fonts.size.sm,
//     color: '#FFD700'
//   },
//   reviewText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     lineHeight: 20
//   },
//   viewMoreButton: {
//     alignSelf: 'center',
//     marginTop: 8
//   },
//   viewMoreText: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     textAlign: 'center'
//   },

//   // Demo Button Styles
//   demoButtonContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 20
//   },

// });

// export default ProviderDetailScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import ProviderHeader from '../../components/common/ProviderHeader';
import Button from '../../components/common/Button';

/* ---------------- CONSTANTS ---------------- */

const SINGLE_SELECT = ['Subji', 'Dal', 'Rice'];
const MULTI_SELECT = ['Roti', 'Papad'];

const ALL_CATEGORIES = ['Subji', 'Roti', 'Dal', 'Rice', 'Papad'];

const createEmptyMeal = () => ({
  Subji: null,
  Dal: null,
  Rice: null,
  Roti: {},
  Papad: {},
});

const COMBOS = [
  { id: 'combo1', name: '1 sabji + 3 Roti + Rice + Daal', price: 120 },
  {
    id: 'combo2',
    name: '1 Sweet + 2 Sabji + 5 Roti + Rice + Daal + Papad + Buttermilk (Special)',
    price: 220,
  },
  { id: 'combo3', name: 'Full Meal Combo', price: 250 },
];

/* ---------------- HELPERS ---------------- */

const calculateMealTotal = meal => {
  let total = 0;

  Object.keys(meal).forEach(key => {
    const value = meal[key];
    if (!value) return;

    if (MULTI_SELECT.includes(key)) {
      Object.values(value).forEach(i => {
        total += i.price * i.qty;
      });
    } else {
      total += value.price;
    }
  });

  return total;
};

/* ---------------- SCREEN ---------------- */

const ProviderDetailScreen = ({ route, navigation }) => {
  const { provider } = route.params;

  // Lunch open by default
  const [openMeal, setOpenMeal] = useState(null);

  // All categories open by default
  const [openCategory] = useState({
    lunch: ALL_CATEGORIES,
    dinner: ALL_CATEGORIES,
  });

  const [meals, setMeals] = useState({
    lunch: createEmptyMeal(),
    dinner: createEmptyMeal(),
  });

  const hasSelection = meal => {
    const mealData = meals[meal];
    return Object.keys(mealData).some(key => {
      const value = mealData[key];
      if (!value) return false;
      if (MULTI_SELECT.includes(key)) {
        return Object.keys(value).length > 0;
      } else {
        return !!value;
      }
    });
  };

  /* ---------------- ACTIONS ---------------- */

  const toggleMeal = meal => setOpenMeal(prev => (prev === meal ? null : meal));

  const addItem = (meal, category, item) => {
    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };

      if (MULTI_SELECT.includes(category)) {
        const current = mealData[category][item.id];
        mealData[category] = {
          ...mealData[category],
          [item.id]: current
            ? { ...current, qty: current.qty + 1 }
            : { ...item, qty: 1 },
        };
      } else {
        mealData[category] = item;
      }

      updated[meal] = mealData;
      return updated;
    });
  };

  const removeItem = (meal, category, id) => {
    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };
      const item = mealData[category][id];

      if (item.qty === 1) {
        const clone = { ...mealData[category] };
        delete clone[id];
        mealData[category] = clone;
      } else {
        mealData[category] = {
          ...mealData[category],
          [id]: { ...item, qty: item.qty - 1 },
        };
      }

      updated[meal] = mealData;
      return updated;
    });
  };

  /* ---------------- UI HELPERS ---------------- */

  const removeItemCompletely = (meal, category, id) => {
    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };
      const clone = { ...mealData[category] };
      delete clone[id];
      mealData[category] = clone;
      updated[meal] = mealData;
      return updated;
    });
  };

  /* ---------------- COMBO LIST ---------------- */

  const renderComboList = () => {
    return (
      <View style={styles.comboCard}>
        <Text style={styles.comboTitle}>Combo List</Text>
        {COMBOS.map(combo => (
          <View key={combo.id} style={styles.comboItem}>
            {/* Left: Combo info */}
            <View style={{ flex: 1 }}>
              <Text style={styles.comboName}>{combo.name}</Text>
            </View>

            {/* Right: Price */}
            <Text style={styles.comboPrice}>₹{combo.price}</Text>

            {/* Buttons */}
            <View style={styles.comboButtons}>
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
        ))}
      </View>
    );
  };

  const renderItemRow = (meal, category, item) => {
    const selected = MULTI_SELECT.includes(category)
      ? meals[meal][category][item.id]
      : meals[meal][category]?.id === item.id;

    return (
      <View key={item.id} style={styles.itemRow}>
        {/* LEFT */}
        <View style={styles.leftRow}>
          <TouchableOpacity
            style={[styles.checkbox, selected && styles.checkboxChecked]}
            onPress={() => {
              if (MULTI_SELECT.includes(category)) {
                // If already selected, remove completely
                if (selected) {
                  removeItemCompletely(meal, category, item.id);
                } else {
                  addItem(meal, category, item);
                }
              } else {
                // Single select as before
                addItem(meal, category, item);
              }
            }}
          >
            {selected && <Text style={styles.tick}>✓</Text>}
          </TouchableOpacity>

          <Text style={styles.itemName}>{item.name}</Text>
        </View>

        {/* RIGHT */}
        {MULTI_SELECT.includes(category) ? (
          selected ? (
            <View style={styles.qtyBox}>
              <TouchableOpacity
                onPress={() => removeItem(meal, category, item.id)}
              >
                <Text style={styles.qtyBtn}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{selected.qty}</Text>
              <TouchableOpacity onPress={() => addItem(meal, category, item)}>
                <Text style={styles.qtyBtn}>+</Text>
              </TouchableOpacity>
              <Text style={styles.itemPrice}>₹{item.price * selected.qty}</Text>
            </View>
          ) : (
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          )
        ) : (
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        )}
      </View>
    );
  };

  const renderMeal = (label, meal) => {
    const menu = provider.menu?.[meal];
    if (!menu) return null;

    return (
      <View style={styles.mealCard}>
        <TouchableOpacity onPress={() => toggleMeal(meal)}>
          <Text style={styles.mealTitle}>{label}</Text>
        </TouchableOpacity>

        {openMeal === meal &&
          ALL_CATEGORIES.map(category => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {menu[category]?.map(item => renderItemRow(meal, category, item))}
            </View>
          ))}

        {hasSelection(meal) && (
          <Text style={styles.total}>
            Meal Total: ₹{calculateMealTotal(meals[meal])}
          </Text>
        )}
      </View>
    );
  };

  /* ---------------- RENDER ---------------- */

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProviderHeader
          provider={provider}
          onBackPress={() => navigation.goBack()}
        />

        <Text style={styles.mainTitle}>Customize Your Meal</Text>

        {renderMeal('Lunch', 'lunch')}
        {renderMeal('Dinner', 'dinner')}
        {renderComboList()}
      </ScrollView>
    </View>
  );
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mainTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    margin: 16,
    marginTop: 45,
    textAlign: 'center',
  },
  mealCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  mealTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
  },
  categoryTitle: {
    marginTop: 14,
    fontFamily: fonts.family.medium,
    color: colors.primary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  tick: {
    color: 'colors.surface',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemName: { fontSize: fonts.size.sm },
  itemPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    minWidth: 40,
    textAlign: 'right',
  },
  qtyBox: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { fontSize: 22, paddingHorizontal: 10 },
  qty: { fontSize: 16 },
  total: {
    marginTop: 10,
    fontFamily: fonts.family.bold,
    textAlign: 'right',
  },
  subOption: {
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  subSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  subText: {
    fontFamily: fonts.family.medium,
    textAlign: 'center',
  },
  monthlyPrice: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    textAlign: 'center',
    marginVertical: 12,
  },
  comboCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  comboTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    marginBottom: 10,
  },
  comboItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },

  comboName: {
    fontSize: fonts.size.sm,
    flex: 1,
    flexWrap: 'wrap',
    marginRight: 10,
  },

  comboPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    width: 60,
    marginRight:8,
    
  },
  comboButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:8,
  },
  tryBtn: {
    borderRadius: 6,
    paddingHorizontal: 14,
  },

  subscribeBtn: {
    borderRadius: 6,
    paddingHorizontal: 14,
  },
});

export default ProviderDetailScreen;
