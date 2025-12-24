// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';
// import { fonts } from '../../styles/fonts';
// const OrderManagementScreen = ({ navigation }) => {
//   const [couponCode, setCouponCode] = useState('');
//   const [appliedDiscount, setAppliedDiscount] = useState(0);

//   const orderItems = [
//     { id: 1, name: 'Dal Rice Combo', quantity: 2, price: 120 },
//     { id: 2, name: 'Roti with Sabzi', quantity: 1, price: 80 },
//   ];

//   const deliveryAddress = {
//     name: 'John Doe',
//     address: '123 Main Street, Apartment 4B',
//     city: 'Mumbai, Maharashtra 400001',
//     phone: '+91 9876543210'
//   };

//   const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const deliveryFee = 30;
//   const total = subtotal - appliedDiscount + deliveryFee;

//   const applyCoupon = () => {
//     if (couponCode.trim()) {
//       setAppliedDiscount(50); // Static ₹50 discount
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Order Summary</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         {/* Order Items */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Items</Text>
//           {orderItems.map(item => (
//             <View key={item.id} style={styles.itemRow}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemDetails}>Qty: {item.quantity} × ₹{item.price}</Text>
//               <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Delivery Address */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Delivery Address</Text>
//           <View style={styles.addressCard}>
//             <Text style={styles.addressName}>{deliveryAddress.name}</Text>
//             <Text style={styles.addressText}>{deliveryAddress.address}</Text>
//             <Text style={styles.addressText}>{deliveryAddress.city}</Text>
//             <Text style={styles.addressPhone}>{deliveryAddress.phone}</Text>
//           </View>
//         </View>

//         {/* Coupon Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Apply Coupon</Text>
//           <View style={styles.couponContainer}>
//             <TextInput
//               style={styles.couponInput}
//               placeholder="Enter coupon code"
//               value={couponCode}
//               onChangeText={setCouponCode}
//             />
//             <TouchableOpacity style={styles.applyButton} onPress={applyCoupon}>
//               <Text style={styles.applyButtonText}>Apply</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Bill Summary */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bill Summary</Text>
//           <View style={styles.billRow}>
//             <Text style={styles.billLabel}>Subtotal</Text>
//             <Text style={styles.billValue}>₹{subtotal}</Text>
//           </View>
//           {appliedDiscount > 0 && (
//             <View style={styles.billRow}>
//               <Text style={styles.billLabel}>Discount</Text>
//               <Text style={[styles.billValue, styles.discount]}>-₹{appliedDiscount}</Text>
//             </View>
//           )}
//           <View style={styles.billRow}>
//             <Text style={styles.billLabel}>Delivery Fee</Text>
//             <Text style={styles.billValue}>₹{deliveryFee}</Text>
//           </View>
//           <View style={[styles.billRow, styles.totalRow]}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>₹{total}</Text>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.proceedButton}
//         onPress={() => navigation.navigate('Payment', { orderTotal: total })}
//       >
//         <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
//       </TouchableOpacity>
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
//     paddingVertical: 15,
//     paddingTop: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border
//   },
//   headerTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginLeft: 15
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20
//   },
//   section: {
//     marginVertical: 15
//   },
//   sectionTitle: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginBottom: 10
//   },
//   itemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border
//   },
//   itemName: {
//     flex: 1,
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.textPrimary
//   },
//   itemDetails: {
//     fontSize: fonts.size.xs,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginRight: 10
//   },
//   itemPrice: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary
//   },
//   addressCard: {
//     backgroundColor: colors.cardBackground,
//     padding: 15,
//     borderRadius: 8
//   },
//   addressName: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginBottom: 5
//   },
//   addressText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginBottom: 2
//   },
//   addressPhone: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.primary,
//     marginTop: 5
//   },
//   couponContainer: {
//     flexDirection: 'row',
//     gap: 10
//   },
//   couponInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular
//   },
//   applyButton: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//     justifyContent: 'center'
//   },
//   applyButtonText: {
//     color: colors.background,
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium
//   },
//   couponSuccess: {
//     color: colors.secondary,
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     marginTop: 8
//   },
//   billRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5
//   },
//   billLabel: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary
//   },
//   billValue: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.textPrimary
//   },
//   discount: {
//     color: colors.secondary
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//     paddingTop: 10,
//     marginTop: 5
//   },
//   totalLabel: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary
//   },
//   totalValue: {
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold,
//     color: colors.primary
//   },
//   proceedButton: {
//     backgroundColor: colors.primary,
//     marginHorizontal: 20,
//     marginVertical: 20,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center'
//   },
//   proceedButtonText: {
//     color: colors.background,
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.bold
//   }
// });

// export default OrderManagementScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const OrderManagementScreen = ({ navigation, route }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // 🔹 READ PARAMS
  const { combo, meals, plan } = route.params || {};

  /* ---------------- BUILD ORDER ITEMS ---------------- */

  const buildOrderItems = () => {
    const items = [];

    // ADD SUBSCRIPTION PLAN
    if (plan) {
      items.push({
        id: `plan-${plan.id}`,
        name: plan.title,
        quantity: 1,
        price: plan.price, 
      });
    }

    //  ADD COMBO IF SELECTED
    if (combo) {
      items.push({
        id: `combo-${combo.id}`,
        name: combo.name,
        quantity: 1,
        price: combo.price,
      });
    }

    // ADD LUNCH / DINNER ITEMS IF SELECTED
    Object.entries(meals || {}).forEach(([mealType, mealData]) => {
      Object.entries(mealData || {}).forEach(([category, value]) => {
        if (!value) return;

        // MULTI SELECT (Roti, Papad)
        if (typeof value === 'object' && !value.id) {
          Object.values(value).forEach(item => {
            items.push({
              id: `${mealType}-${item.id}`,
              name: `${item.name} (${mealType})`,
              quantity: item.qty,
              price: item.price,
            });
          });
        }
        // SINGLE SELECT (Subji, Dal, Rice)
        else {
          items.push({
            id: `${mealType}-${value.id}`,
            name: `${value.name} (${mealType})`,
            quantity: 1,
            price: value.price,
          });
        }
      });
    });

    return items;
  };

  const orderItems = buildOrderItems();

  /* ---------------- BILL CALCULATION ---------------- */

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = 30;
  const total = subtotal - appliedDiscount + deliveryFee;

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedDiscount(50);
    }
  };

  /* ---------------- STATIC ADDRESS ---------------- */

  const deliveryAddress = {
    name: 'John Doe',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai, Maharashtra 400001',
    phone: '+91 9876543210',
  };

  /* ---------------- RENDER ---------------- */

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>

          {orderItems.length === 0 ? (
            <Text style={{ color: colors.textSecondary }}>
              No items selected
            </Text>
          ) : (
            orderItems.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.qtyPriceContainer}>
                  <Text style={styles.itemQty}>
                    Qty: {item.quantity} × ₹{item.price}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <Text style={styles.addressName}>{deliveryAddress.name}</Text>
            <Text style={styles.addressText}>{deliveryAddress.address}</Text>
            <Text style={styles.addressText}>{deliveryAddress.city}</Text>
            <Text style={styles.addressPhone}>{deliveryAddress.phone}</Text>
          </View>
        </View>

        {/* Coupon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apply Coupon</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter coupon code"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity style={styles.applyButton} onPress={applyCoupon}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Summary</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal</Text>
            <Text style={styles.billValue}>₹{subtotal}</Text>
          </View>

          {appliedDiscount > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Discount</Text>
              <Text style={[styles.billValue, styles.discount]}>
                -₹{appliedDiscount}
              </Text>
            </View>
          )}

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>₹{deliveryFee}</Text>
          </View>

          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => navigation.navigate('Payment', { orderTotal: total })}
      >
        <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderManagementScreen;

/* ---------------- STYLES (UNCHANGED) ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    marginBottom: 10,
  },
  qtyPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemName: {
    flex: 1,
    fontSize: fonts.size.sm,
  },
  itemQty: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
  itemPrice: {
    fontFamily: fonts.family.bold,
  },
  addressCard: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
  },
  addressName: {
    fontFamily: fonts.family.bold,
  },
  addressText: {
    fontSize: fonts.size.sm,
  },
  addressPhone: {
    color: colors.primary,
  },
  couponContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: colors.background,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  billLabel: {
    color: colors.textSecondary,
  },
  billValue: {
    fontFamily: fonts.family.medium,
  },
  discount: {
    color: colors.secondary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  totalLabel: {
    fontFamily: fonts.family.bold,
  },
  totalValue: {
    fontFamily: fonts.family.bold,
    color: colors.primary,
  },
  proceedButton: {
    backgroundColor: colors.primary,
    margin: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: colors.background,
    fontFamily: fonts.family.bold,
  },
});
