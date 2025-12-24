// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';
// import { fonts } from '../../styles/fonts';
// const menuData = {
//   daily: {
//     meals: [
//       { id: 1, name: 'Dal Rice Combo', price: 120, timing: 'Lunch: 12-2 PM', items: ['Dal', 'Rice', 'Sabzi', 'Roti'] },
//       { id: 2, name: 'Rajma Chawal', price: 130, timing: 'Dinner: 7-9 PM', items: ['Rajma', 'Rice', 'Pickle', 'Papad'] },
//     ],
//     planPrice: 250
//   },
//   weekly: {
//     meals: [
//       { id: 1, name: 'Home Style Weekly', price: 800, timing: 'Lunch & Dinner', items: ['7 days variety meals', 'Fresh daily'] },
//       { id: 2, name: 'Premium Weekly', price: 1000, timing: 'Lunch & Dinner', items: ['Premium ingredients', 'Special dishes'] },
//     ],
//     planPrice: 1800
//   },
//   monthly: {
//     meals: [
//       { id: 1, name: 'Basic Monthly', price: 3000, timing: 'Lunch & Dinner', items: ['30 days meals', 'Home style cooking'] },
//       { id: 2, name: 'Premium Monthly', price: 4000, timing: 'Lunch & Dinner', items: ['Premium meals', 'Variety menu'] },
//     ],
//     planPrice: 7000
//   }
// };

// const MenuSubscriptionScreen = ({ route, navigation }) => {
//   const { provider, selectedMeal } = route?.params || {};
//   const [selectedPlan, setSelectedPlan] = useState('daily');

//   const handlePlaceOrder = () => {
//     navigation.navigate('OrderManagement');
//   };

//   const handleSubscribe = () => {
//     Alert.alert(
//       'Subscription Activated!',
//       `Your ${selectedPlan} plan has been activated successfully.`,
//       [
//         {
//           text: 'View Subscriptions',
//           onPress: () => navigation.navigate('SubscriptionManagement')
//         },
//         { text: 'OK' }
//       ]
//     );
//   };

//   const currentMenu = menuData[selectedPlan];

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="arrow-back" size={24} color={colors.textPrimary} />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Menu & Subscription</Text>
//         </View>

//         {/* Provider Info */}
//         <View style={styles.providerInfo}>
//           <Text style={styles.providerName}>{provider?.name || 'Mama Kitchen'}</Text>
//           <Text style={styles.providerDetails}>Choose your meal plan</Text>
//         </View>

//         {/* Plan Selection */}
//         <View style={styles.planContainer}>
//           <Text style={styles.sectionTitle}>Choose Plan</Text>
//           <View style={styles.planTabs}>
//             {['daily', 'weekly', 'monthly'].map((plan) => (
//               <TouchableOpacity
//                 key={plan}
//                 style={[styles.planTab, selectedPlan === plan && styles.activePlanTab]}
//                 onPress={() => setSelectedPlan(plan)}
//               >
//                 <Text style={[styles.planTabText, selectedPlan === plan && styles.activePlanTabText]}>
//                   {plan.charAt(0).toUpperCase() + plan.slice(1)}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Meals List */}
//         <View style={styles.mealsContainer}>
//           <Text style={styles.sectionTitle}>Available Meals</Text>
//           {currentMenu.meals.map((meal) => (
//             <View key={meal.id} style={styles.mealCard}>
//               <View style={styles.mealInfo}>
//                 <Text style={styles.mealName}>{meal.name}</Text>
//                 <Text style={styles.mealTiming}>{meal.timing}</Text>
//                 <View style={styles.itemsContainer}>
//                   {meal.items.map((item, index) => (
//                     <Text key={index} style={styles.mealItem}>• {item}</Text>
//                   ))}
//                 </View>
//               </View>
//               <View style={styles.mealPrice}>
//                 <Text style={styles.priceText}>₹{meal.price}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Plan Summary */}
//         <View style={styles.summaryContainer}>
//           <Text style={styles.sectionTitle}>Plan Summary</Text>
//           <View style={styles.summaryCard}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryLabel}>Plan Type:</Text>
//               <Text style={styles.summaryValue}>{selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryLabel}>Total Price:</Text>
//               <Text style={styles.summaryPrice}>₹{currentMenu.planPrice}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
//             <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
//             <Text style={styles.orderButtonText}>Place Order</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
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
//     padding: 8,
//     marginRight: 16
//   },
//   headerTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary
//   },
//   providerInfo: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border
//   },
//   providerName: {
//     fontSize: fonts.size.xl,
//     fontFamily: fonts.family.bold,
//     color: colors.primary,
//     marginBottom: 4
//   },
//   providerDetails: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary
//   },
//   planContainer: {
//     padding: 20
//   },
//   sectionTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginBottom: 16
//   },
//   planTabs: {
//     flexDirection: 'row',
//     gap: 12
//   },
//   planTab: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: colors.border,
//     alignItems: 'center'
//   },
//   activePlanTab: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary
//   },
//   planTabText: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary
//   },
//   activePlanTabText: {
//     color: colors.background,
//     fontFamily: fonts.family.medium
//   },
//   mealsContainer: {
//     padding: 20
//   },
//   mealCard: {
//     flexDirection: 'row',
//     backgroundColor: colors.background,
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: colors.border
//   },
//   mealInfo: {
//     flex: 1
//   },
//   mealName: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginBottom: 4
//   },
//   mealTiming: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.primary,
//     marginBottom: 8
//   },
//   itemsContainer: {
//     marginTop: 4
//   },
//   mealItem: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginBottom: 2
//   },
//   mealPrice: {
//     alignItems: 'flex-end',
//     justifyContent: 'center'
//   },
//   priceText: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.primary
//   },
//   summaryContainer: {
//     padding: 20
//   },
//   summaryCard: {
//     backgroundColor: colors.background,
//     padding: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: colors.border
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8
//   },
//   summaryLabel: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary
//   },
//   summaryValue: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.medium,
//     color: colors.textPrimary
//   },
//   summaryPrice: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.primary
//   },
//   buttonContainer: {
//     padding: 20,
//     gap: 12
//   },
//   subscribeButton: {
//     backgroundColor: colors.primary,
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center'
//   },
//   subscribeButtonText: {
//     color: colors.background,
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.medium
//   },
//   orderButton: {
//     borderWidth: 1,
//     borderColor: colors.primary,
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: 'center'
//   },
//   orderButtonText: {
//     color: colors.primary,
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.medium
//   }
// });

// export default MenuSubscriptionScreen;


import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import SubscriptionCard from '../../components/common/SubscriptionCard';

const subscriptionPlans = [
  {
    id: 'daily',
    title: 'Daily Veg Plan',
    duration: 'Daily',
    meals: ['Lunch', 'Dinner'],
    benefit: '10% discount',
  },
  {
    id: 'weekly',
    title: 'Weekly Veg Plan',
    duration: 'Weekly',
    meals: ['Lunch', 'Dinner'],
    benefit: '1 free meal',
  },
  {
    id: 'monthly',
    title: 'Monthly Veg Plan',
    duration: 'Monthly',
    meals: ['Lunch', 'Dinner'],
    benefit: '1 day meal free',
  },
];


const MenuSubscriptionScreen = ({ route, navigation }) => {

  const getPlanPrice = (comboPrice, planId) => {
    switch (planId) {
      case 'daily':
        return {
          price: Math.round(comboPrice * 0.9),
          label: '10% OFF',
        };
  
      case 'weekly':
        return {
          price: comboPrice * 6, // 7 meals – 1 free
          label: '1 Meal Free',
        };
  
      case 'monthly':
        return {
          price: comboPrice * 29, // 30 days – 1 free
          label: '1 Day Free',
        };
  
      default:
        return { price: comboPrice, label: '' };
    }
  };
  
  const { provider, combo } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={24}
            color={colors.textPrimary}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Subscription Plans</Text>
        </View>

        {/* Provider Info */}
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{provider?.name}</Text>
          <Text style={styles.providerDetails}>
            Choose the best plan for you
          </Text>
        </View>

        {/* Subscription Cards */}
        <View style={styles.cardsContainer}>
          {/* {subscriptionPlans.map(plan => (
            <SubscriptionCard
              key={plan.id}
              plan={plan}
              onBuyPress={selectedPlan => {
                navigation.navigate('OrderManagement', {
                  provider,
                  combo,
                  plan: selectedPlan,
                });
              }}
            />
          ))} */}

{subscriptionPlans.map(plan => {
  const pricing = getPlanPrice(combo.price, plan.id);

  return (
    <SubscriptionCard
      key={plan.id}
      plan={{
        ...plan,
        price: pricing.price,
        priceLabel: pricing.label,
        comboName: combo.name,
      }}
      onBuyPress={selectedPlan => {
        navigation.navigate('Payment', {
          orderTotal: selectedPlan.finalPrice ?? selectedPlan.price,
        });
      }}
    />
  );
})}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },

  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
  },

  providerInfo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  providerName: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.primary,
  },

  providerDetails: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },

  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems:'center',
    gap:8,
  },
});

export default MenuSubscriptionScreen;
