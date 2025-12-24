// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   StatusBar,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';
// import { fonts } from '../../styles/fonts';
// import { platformStyles } from '../../styles/platform';
// import { setGlobalLikedItems } from '../../utils/likedItems';
// import { useGetStatesQuery } from '../../services/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export const tiffinProviders = [
//   {
//     id: 1,
//     name: 'Gujarati Dish',
//     rating: 4.5,
//     // location: 'Powai Chowk, Pune',
//     // distance: '2km away',
//     image:"https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg"  },
//   {
//     id: 2,
//     name: 'Kathiyavadi Dish',
//     rating: 4.8,
//     // location: 'Satellite, Ahmedabad',
//     // distance: '1.5km away',
//     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s"
//   },
//   {
//     id: 3,
//     name: 'Punjabi Dish',
//     rating: 4.7,
//     // location: 'Ghatlodiya,Ahmedabad',
//     // distance: '2.5km away',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
//   },
//   {
//     id: 4,
//     name: 'Rajasthani Dish',
//     rating: 4.7,
//     // location: 'Ghatlodiya,Ahmedabad',
//     // distance: '2.5km away',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
//   },
// ];

// const HomeScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const [liked, setLiked] = useState({});
//   const { data: states } = useGetStatesQuery();

//   useEffect(() => {
//     console.log('States API Response in HomeScreen:', states);

//   }, [states]);

//   const filteredProviders = tiffinProviders.filter(provider => {
//     const matchesSearch = provider.name
//       .toLowerCase()
//       .includes(searchText.toLowerCase());
//     return matchesSearch;
//   });

//   const handleProviderPress = provider => {
//     if (navigation) {
//       navigation.navigate('ProviderDetail', { provider });
//     } else {
//       console.log('Selected provider:', provider.name);
//     }
//   };

//   const toggleLike = id => {
//     const newLiked = { ...liked, [id]: !liked[id] };
//     setLiked(newLiked);
//     setGlobalLikedItems(newLiked);
//   };

//   const renderProvider = ({ item }) => (
//     <TouchableOpacity
//       style={styles.providerCard}
//       onPress={() => handleProviderPress(item)}
//     >
//       <View style={styles.imageContainer}>
//         <Image source={{ uri: item.image }} style={styles.foodImage} />
//         <TouchableOpacity
//           style={styles.heartIcon}
//           onPress={() => toggleLike(item.id)}
//         >
//           <Icon
//             name={liked[item.id] ? 'heart' : 'heart-outline'}
//             size={20}
//             color={liked[item.id] ? colors.surface : colors.surface}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.cardContent}>
//         <View style={styles.titleRow}>
//           <Text style={styles.providerName}>{item.name}</Text>
//           <View style={styles.ratingContainer}>
//             <Icon name="star" size={14} color={colors.warning} />
//             <Text style={styles.ratingText}>{item.rating}</Text>
//           </View>
//         </View>
//         {/* <View style={styles.bottomRow}>
//           <Text style={styles.locationText}>{item.location}</Text>
//           <Text style={styles.distanceText}>{item.distance}</Text>
//         </View> */}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent
//       />
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View style={styles.titleContainer}>
//             <View style={styles.locationSection}>
//               <TouchableOpacity
//                 style={styles.locationIconContainer}
//                 onPress={() => navigation.navigate('LocationScreen')}
//               >
//                 <Icon name="location" size={14} color={colors.primary} />
//               </TouchableOpacity>

//               <View style={styles.textSection}>
//                 <View style={styles.titleRow}>
//                   <Text style={styles.title}>Home</Text>
//                   <Icon name="chevron-down" size={16} color={colors.primary} />
//                 </View>
//                 <TouchableOpacity
//                   style={styles.locationContainer}
//                   onPress={() => navigation.navigate('LocationScreen')}
//                 >
//                   <Text style={styles.locationText}>
//                     {states?.data?.[0]?.stateName || 'Baner,Pune'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>

//           <View style={styles.rightIcons}>
//             {/* <TouchableOpacity
//               style={styles.calendarIcon}
//               onPress={() => navigation.navigate('TrackPlan')}
//             >
//               <View style={styles.calendarIconContainer}>
//                 <Icon
//                   name="calendar-outline"
//                   size={20}
//                   color={colors.primary}
//                 />
//               </View>
//             </TouchableOpacity> */}

//             <TouchableOpacity style={styles.notificationIcon}>
//               <View style={styles.notificationIconContainer}>
//                 <Icon
//                   name="notifications-outline"
//                   size={20}
//                   color={colors.primary}
//                 />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.searchContainer}>
//           <Icon
//             name="search"
//             size={20}
//             color={colors.primary}
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search your favorite Dabbawala"
//             value={searchText}
//             onChangeText={setSearchText}
//             placeholderTextColor={colors.textSecondary}
//           />
//           <Icon
//             name="mic"
//             size={20}
//             color={colors.primary}
//             style={styles.micIcon}
//           />
//         </View>
//       </View>

//       <FlatList
//         data={filteredProviders}
//         renderItem={renderProvider}
//         keyExtractor={item => item.id.toString()}
//         style={styles.list}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//     paddingTop: 50,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   titleContainer: {
//     flex: 1,
//   },
//   locationSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   textSection: {
//     marginLeft: 8,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 2,
//   },
//   title: {
//     fontSize: fonts.size.xl,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     marginRight: 8,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationIconContainer: {
//     backgroundColor: colors.successLight,
//     borderRadius: 12,
//     padding: 6,
//     marginRight: 8,
//   },
//   locationText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginRight: 6,
//   },
//   rightIcons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   // calendarIcon: {
//   //   padding: 4,
//   //   marginRight: 8,
//   // },
//   // calendarIconContainer: {
//   //   backgroundColor: colors.successLight,
//   //   borderRadius: 20,
//   //   padding: 8,
//   // },

//   notificationIcon: {
//     padding: 4,
//   },
//   notificationIconContainer: {
//     backgroundColor: colors.successLight,
//     borderRadius: 20,
//     padding: 8,
//   },
//   userIcon: {
//     padding: 4,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: colors.border,
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     marginBottom: 16,
//     backgroundColor: colors.surface,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: fonts.size.md,
//     fontFamily: fonts.family.regular,
//     color: colors.textPrimary,
//     includeFontPadding: false,
//     textAlignVertical: 'center',
//   },
//   micIcon: {
//     marginLeft: 10,
//   },

//   list: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   listContent: {
//     paddingBottom: 100,
//   },

//   providerCard: {
//     backgroundColor: colors.surface,
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     ...platformStyles.shadow,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   heartIcon: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     // backgroundColor: 'rgba(0,0,0,0.3)',
//     // borderRadius: 20,
//     padding: 8,
//   },

//   foodImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//   },
//   cardContent: {
//     padding: 16,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   bottomRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   providerName: {
//     fontSize: fonts.size.lg,
//     fontFamily: fonts.family.bold,
//     color: colors.textPrimary,
//     flex: 1,
//   },
//   locationText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     flex: 1,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//     marginLeft: 4,
//   },
//   distanceText: {
//     fontSize: fonts.size.sm,
//     fontFamily: fonts.family.regular,
//     color: colors.textSecondary,
//   },
// });

// export default HomeScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import OfferSlider from '../../components/home/OfferSlider';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import { platformStyles } from '../../styles/platform';
import { setGlobalLikedItems } from '../../utils/likedItems';
import { useGetStatesQuery } from '../../services/api';

export const tiffinProviders = [
  // Gujarati Restaurants
  {
    id: 1,
    name: 'Rotlo Gujarati Rasthal',
    rating: 4.5,
    description: 'Authentic Gujarati home-style meals',
    price: '₹120 / meal',
    category: 'Gujarati',
    image: 'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
    menu: {
      lunch: {
        Subji: [
          { id: 1, name: 'Bhindi Masala', price: 40 },
          { id: 2, name: 'Aloo Tamatar', price: 35 },
        ],
        Roti: [
          { id: 3, name: 'Chapati', price: 10 },
          { id: 4, name: 'Thepla', price: 15 },
        ],
        Dal: [
          { id: 5, name: 'Dal Fry', price: 30 },
        ],
        Rice: [
          { id: 6, name: 'Plain Rice', price: 20 },
        ],
        Papad: [
          { id: 7, name: 'Roasted Papad', price: 10 },
        ],
      },
    
      dinner: {
        Subji: [
          { id: 8, name: 'Paneer Bhurji', price: 60 },
        ],
        Roti: [
          { id: 9, name: 'Butter Roti', price: 15 },
        ],
        Dal: [
          { id: 5, name: 'Dal Fry', price: 30 },
        ],
        Rice: [
          { id: 6, name: 'Plain Rice', price: 20 },
        ],
        Papad: [
          { id: 7, name: 'Roasted Papad', price: 10 },
        ],
      },
    },

     COMBOS : [
      {
        id: 'combo1',
        name: '1 Sabji + 4 Roti + salad',
        price: 110,
      },
      { id: 'combo2', name: '1 sabji + 4 Roti + Rice + Daal', price: 170 },
      
      { id: 'combo3', name: '1 Green sabji + 1 kathol sabji + 1 sweet + salad + rice + daal + 3 roti', price: 210 },
      { id: 'combo4', name: '2 sabji + 5 roti + 1 sweet + salad + rice daal + Bhajiya/farshan + chas ', price: 300 },
    
    ],
    
    
  },
  {
    id: 2,
    name: 'Gujarati Rasoi',
    rating: 4.3,
    description: 'Traditional Gujarati thali meals',
    price: '₹110 / meal',
    category: 'Gujarati',
    image: 'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 3,
    name: 'Shree Gujarati Thali',
    rating: 4.6,
    description: 'Homely Gujarati delicacies',
    price: '₹130 / meal',
    category: 'Gujarati',
    image: 'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 4,
    name: 'Rasoi Ghar',
    rating: 4.4,
    description: 'Authentic Gujarati cuisine',
    price: '₹125 / meal',
    category: 'Gujarati',
    image: 'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },
  {
    id: 5,
    name: 'Swad Gujarati',
    rating: 4.2,
    description: 'Traditional Gujarati home meals',
    price: '₹115 / meal',
    category: 'Gujarati',
    image: 'https://assets.cntraveller.in/photos/67c7f6ab13fb2f873dad3ac2/master/w_1600%2Cc_limit/SGS04356.jpg',
  },

  // Punjabi Restaurants
  {
    id: 6,
    name: 'Nutan Restaurant',
    rating: 4.7,
    description: 'Rich Punjabi home-style thali meals',
    price: '₹180 / meal',
    category: 'Punjabi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 7,
    name: 'Amritsari Tandoor',
    rating: 4.5,
    description: 'Authentic Punjabi tandoori dishes',
    price: '₹190 / meal',
    category: 'Punjabi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 8,
    name: 'Patiala Rasoi',
    rating: 4.6,
    description: 'Traditional Punjabi meals with spices',
    price: '₹185 / meal',
    category: 'Punjabi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 9,
    name: 'Ludhiana Food Corner',
    rating: 4.4,
    description: 'Authentic Punjabi cuisine',
    price: '₹175 / meal',
    category: 'Punjabi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },
  {
    id: 10,
    name: 'Shahi Punjabi Thali',
    rating: 4.7,
    description: 'Rich Punjabi thali meals',
    price: '₹200 / meal',
    category: 'Punjabi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7GEM9v8H1dftlGaYY2Duz_r-_bkjlyKEyA&s',
  },

  // Kathiyavadi Restaurants
  {
    id: 11,
    name: 'Shiv Shakti Kathiyavadi',
    rating: 4.8,
    description: 'Traditional Kathiyavadi spicy home meals',
    price: '₹140 / meal',
    category: 'Kathiyavadi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 12,
    name: 'Kathiyavadi Rasoi',
    rating: 4.6,
    description: 'Authentic Kathiyavadi cuisine',
    price: '₹150 / meal',
    category: 'Kathiyavadi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 13,
    name: 'Rann Rasoi',
    rating: 4.5,
    description: 'Traditional Kathiyavadi meals',
    price: '₹145 / meal',
    category: 'Kathiyavadi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 14,
    name: 'Kathiyavadi Thali House',
    rating: 4.7,
    description: 'Spicy Kathiyavadi delicacies',
    price: '₹150 / meal',
    category: 'Kathiyavadi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },
  {
    id: 15,
    name: 'Desi Kathiyavadi',
    rating: 4.6,
    description: 'Authentic home-style Kathiyavadi meals',
    price: '₹140 / meal',
    category: 'Kathiyavadi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4diuU7XrrWoXx9dFk9aUAlBSaETQ1fGqcg&s',
  },

  // Rajasthani Restaurants
  {
    id: 16,
    name: 'Rajasthani Rasoi',
    rating: 4.7,
    description: 'Authentic Rajasthani traditional meals',
    price: '₹160 / meal',
    category: 'Rajasthani',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 17,
    name: 'Shahi Rajasthani Thali',
    rating: 4.8,
    description: 'Royal Rajasthani meals with authentic flavors',
    price: '₹170 / meal',
    category: 'Rajasthani',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 18,
    name: 'Desert Rasoi',
    rating: 4.6,
    description: 'Traditional Rajasthani thali meals',
    price: '₹165 / meal',
    category: 'Rajasthani',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 19,
    name: 'Marwari Thali House',
    rating: 4.5,
    description: 'Authentic Marwari cuisine',
    price: '₹160 / meal',
    category: 'Rajasthani',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
  {
    id: 20,
    name: 'Rajwada Rasoi',
    rating: 4.7,
    description: 'Rajasthani traditional meals with spices',
    price: '₹170 / meal',
    category: 'Rajasthani',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgD1NKl2LY9qMDmFZYQGGre33SOVazxXyU-g&s',
  },
];


const filters = [
  {
    id: 1,
    title: 'Gujarati Dish',
    image:
      'https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png',
  },
  {
    id: 2,
    title: 'Punjabi Dish',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/Autosuggest/Top%20200%20queries/Punjabi%20Thali.png',
  },
  {
    id: 3,
    title: 'Kathiyavadi Dish',
    image:
      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/FOOD_CATALOG/IMAGES/CMS/2025/7/16/08ff9b9d-afd2-43c9-8668-1638933caee2_a70ca9f7-adcb-46d8-a4c1-d831a989d493.jpg',
  },
  {
    id: 4,
    title: 'Rajasthani Dish',
    image:
      'https://b.zmtcdn.com/data/dish_photos/926/7e44c87ebc4384af773cb354e56eb926.jpg',
  },
];



const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [liked, setLiked] = useState({});
  const { data: states } = useGetStatesQuery();

  const filteredProviders = tiffinProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleProviderPress = provider => {
    if (navigation) {
      navigation.navigate('ProviderDetail', { provider });
    } else {
      console.log('Selected provider:', provider.name);
    }
  };

  const toggleLike = id => {
    const newLiked = { ...liked, [id]: !liked[id] };
    setLiked(newLiked);
    setGlobalLikedItems(newLiked);
  };

  const renderProvider = ({ item }) => (
    <TouchableOpacity
      style={styles.kitchenCard}
      onPress={() => handleProviderPress(item)}
    >
      <View style={styles.kitchenImageContainer}>
        <Image source={{ uri: item.image }} style={styles.kitchenImage} />

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Icon name="star" size={12} color={colors.surface} />
          <Text style={styles.ratingBadgeText}>{item.rating}</Text>
        </View>

        {/* Heart Icon */}
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleLike(item.id)}
        >
          <Icon
            name={liked[item.id] ? 'heart' : 'heart-outline'}
            size={18}
            color={colors.surface}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.kitchenContent}>
        <Text style={styles.kitchenName} numberOfLines={1}>
          {item.name}
        </Text>

        {!!item.description && (
          <Text style={styles.kitchenDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        {!!item.price && <Text style={styles.kitchenPrice}>{item.price}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.locationSection}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('LocationScreen')}
          >
            <View style={styles.locationIconContainer}>
              <Icon name="location" size={14} color={colors.primary} />
            </View>

            <View>
              <Text style={styles.title}>Home</Text>
              <Text style={styles.locationText}>
                {states?.data?.[0]?.stateName || 'Baner, Pune'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.primary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorite Dabbawala"
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Icon name="mic" size={20} color={colors.primary} />
        </View>
      </View>

      <FlatList
        data={filteredProviders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProvider}
        numColumns={2}
        columnWrapperStyle={{ gap: 18 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
        ListHeaderComponent={
          <>
          <OfferSlider />
            

            {/* POPULAR FILTER */}
            <Text style={styles.sectionTitle}>Popular Filter</Text>

            <FlatList
              horizontal
              data={filters}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.filterChip}
                  onPress={() =>
                    navigation.navigate('CategoryScreen', {
                      category: item.title.split(' ')[0],
                      dishImage: item.image,
                      dishTitle: item.title, 
                    })
                  }
                >
                  <View style={styles.filterImageWrapper}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.filterImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.filterText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.sectionTitle}>Kitchen Near You</Text>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
  },

  header: {
    paddingHorizontal: 20,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIconContainer: {
    backgroundColor: colors.successLight,
    padding: 6,
    borderRadius: 12,
    marginRight: 8,
  },

  title: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },

  locationText: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: fonts.size.md,
    color: colors.textPrimary,
  },

  filterImage: {
    width: 58,
    height: 58,
  },
  filterImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.grayborder,
  },
  kitchenCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...platformStyles.shadow,
  },

  kitchenImageContainer: {
    position: 'relative',
  },
  kitchenImage: {
    width: '100%',
    height: 140,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingBadgeText: {
    color: colors.surface,
    fontSize: fonts.size.xs,
    marginLeft: 4,
    fontFamily: fonts.family.medium,
  },

  kitchenContent: {
    padding: 10,
  },

  kitchenName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },
  kitchenDescription: {
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },

  kitchenPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    marginTop: 6,
  },

  offerCard: {
    flexDirection: 'row',
    backgroundColor: colors.successLight,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  offerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.error,
  },

  offerSub: {
    fontSize: fonts.size.sm,
    color: colors.textPrimary,
    marginTop: 4,
  },

  offerImage: {
    width: 100,
    height: 80,
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 16,
  },

  filterChip: {
    width: 90,
    alignItems: 'center',
    marginRight: 14,
  },

  filterText: {
    fontSize: fonts.size.xs,
    marginTop: 8,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    textAlign: 'center',
  },

  imageContainer: {
    position: 'relative',
  },

  foodImage: {
    width: '100%',
    height: 150,
  },

  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
