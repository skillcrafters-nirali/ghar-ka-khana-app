// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';
// import { fonts } from '../../styles/fonts';
// import Button from '../../components/common/Button';

// const OrderHistoryScreen = ({ navigation }) => {
//   const [orders] = useState([
//     {
//       id: 'GKK12345',
//       provider: 'Mama Kitchen',
//       items: ['Dal Rice Combo', 'Roti with Sabzi'],
//       date: '2024-01-10',
//       status: 'Delivered',
//       total: '₹320',
//       rating: 4,
//     },
//     {
//       id: 'GKK12344',
//       provider: 'Ghar Jaisa',
//       items: ['Rajma Chawal', 'Mixed Veg'],
//       date: '2024-01-08',
//       status: 'Delivered',
//       total: '₹280',
//       rating: 5,
//     },
//     {
//       id: 'GKK12343',
//       provider: 'Desi Tadka',
//       items: ['Chicken Curry', 'Naan', 'Rice'],
//       date: '2024-01-05',
//       status: 'Cancelled',
//       total: '₹450',
//       rating: null,
//     },
//   ]);

//   const handleReorder = order => {
//     Alert.alert('Reorder Confirmation', `Reorder from ${order.provider}?`, [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Reorder',
//         onPress: () => {
//           Alert.alert('Success', 'Items added to cart!');
//           navigation.navigate('OrderManagement');
//         },
//       },
//     ]);
//   };

//   const getStatusColor = status => {
//     switch (status) {
//       case 'Delivered':
//         return colors.secondary;
//       case 'Cancelled':
//         return colors.error;
//       case 'Pending':
//         return colors.warning;
//       default:
//         return colors.textSecondary;
//     }
//   };

//   const renderStars = rating => {
//     if (!rating) return null;
//     return (
//       <View style={styles.ratingContainer}>
//         {[1, 2, 3, 4, 5].map(star => (
//           <Icon
//             key={star}
//             name={star <= rating ? 'star' : 'star-outline'}
//             size={16}
//             color={colors.warning}
//           />
//         ))}
//       </View>
//     );
//   };

//   const renderOrder = order => (
//     <View key={order.id} style={styles.orderWrapper}>
//       <View style={styles.orderCard}>
//         <View style={styles.orderHeader}>
//           <View>
//             <Text style={styles.orderId}>#{order.id}</Text>
//             <Text style={styles.providerName}>{order.provider}</Text>
//           </View>
//           <View style={styles.orderMeta}>
//             <Text style={styles.orderDate}>{order.date}</Text>
//             <View
//               style={[
//                 styles.statusBadge,
//                 { backgroundColor: getStatusColor(order.status) },
//               ]}
//             >
//               <Text style={styles.statusText}>{order.status}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.orderItems}>
//           {order.items.map((item, index) => (
//             <Text key={index} style={styles.itemText}>
//               • {item}
//             </Text>
//           ))}
//         </View>

//         <View style={styles.orderFooter}>
//           <View style={styles.orderTotal}>
//             <Text style={styles.totalText}>{order.total}</Text>
//             {renderStars(order.rating)}
//           </View>

//           {order.status === 'Delivered' && (
//             <View style={styles.reorderBtnWrapper}>
//               <Button
//                 title="Reorder"
//                 variant="outline"
//                 size="small"
//                 onPress={() => handleReorder(order)}
//                 style={styles.reorderButton}
//                 textStyle={styles.reorderText}
//               />
//             </View>
//           )}
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color={colors.textPrimary} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Order History</Text>
//       </View>

//       <ScrollView style={styles.content}>{orders.map(renderOrder)}</ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     paddingTop: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   headerTitle: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginLeft: 15,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   orderWrapper: {
//     padding: 10,
//     borderRadius: 18,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginBottom: 16,
//   },

//   orderCard: {
//     backgroundColor: colors.surface,
//     borderRadius: 14,
//     borderWidth: 1.5,
//     borderColor: colors.border,
//     padding: 16,

//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   orderId: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.medium,
//     color: colors.textSecondary,
//   },
//   providerName: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginTop: 2,
//   },
//   orderMeta: {
//     alignItems: 'flex-end',
//   },
//   orderDate: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginBottom: 4,
//   },
//   statusBadge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//   },
//   statusText: {
//     fontSize: fonts.size.xs,
//     fontFamily: fonts.family.medium,
//     color: colors.surface,
//   },
//   orderItems: {
//     marginBottom: 12,
//   },
//   itemText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginBottom: 2,
//   },
//   orderFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   orderTotal: {
//     flex: 1,
//   },
//   totalText: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.primary,
//     marginBottom: 4,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//   },
//   reorderBtnWrapper: {
//     marginLeft: 12,
//   },

//   reorderButton: {
//     borderRadius: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 18,
//   },

//   reorderText: {
//     fontFamily: fonts.family.medium,
//     fontSize: fonts.size.sm,
//   },
// });

// export default OrderHistoryScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders] = useState([
    {
      id: 'GKK12345',
      provider: 'Mama Kitchen',
      items: ['Dal Rice Combo', 'Roti with Sabzi'],
      date: '10 Jan 2024, 11:50',
      image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
    },
    {
      id: 'GKK12344',
      provider: 'Ghar Jaisa',
      items: ['Rajma Chawal', 'Mixed Veg'],
      date: '08 Jan 2024, 09:54',
      image:
        'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg',
    },
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <View style={styles.tabInactive}>
          <Text style={styles.tabTextInactive}>Upcoming</Text>
        </View>
        <View style={styles.tabActive}>
          <Text style={styles.tabTextActive}>History</Text>
        </View>
      </View>

      {/* Orders */}
      <ScrollView contentContainerStyle={styles.list}>
        {orders.map(order => (
          <View key={order.id} style={styles.card}>
            {/* Image */}
            <Image source={{ uri: order.image }} style={styles.image} />

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.topRow}>
                <Text style={styles.provider}>{order.provider}</Text>
                <Text style={styles.date}>{order.date}</Text>
              </View>

              <Text style={styles.items}>{order.items.join(', ')}</Text>

              <View style={styles.bottomRow}>
                <Button
                  title="Rate"
                  variant="outline"
                  size="small"
                  style={styles.rateBtn}
                />

                <Button
                  title="Re-order"
                  variant="primary"
                  size="small"
                  style={styles.reorderBtn}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    marginRight: 24,
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: 'colors.primary',
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
    marginBottom: 12,
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  tabActive: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 14,
  },
  tabTextInactive: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.size.md,
    color: colors.primary,
  },
  tabTextActive: {
    fontFamily: fonts.family.medium,
    fontSize: fonts.size.md,
    color: colors.surface,
  },

  list: {
    padding: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginBottom: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  image: {
    width: 95,
    height: 95,
    borderRadius: 16,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  provider: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
  },
  date: {
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
  },

  items: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
    marginVertical: 6,
    lineHeight: 20,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  rateBtn: {
    marginRight: 10,
    minWidth:90,
  },
  reorderBtn: {
    borderRadius: 10,
    minWidth:110,
  },
});

export default OrderHistoryScreen;
