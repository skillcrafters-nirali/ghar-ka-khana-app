// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { colors } from '../../styles/colors';

// const TAB_ICONS = {
//   Home: 'home-outline',
//   Cart: 'bag-outline',
//   Favorite: 'heart-outline',
//   Profile: 'person-outline',
// };

// export default function CurvedBottomNav({ state, navigation }) {
//   const activeIndex = state.index;

//   return (
//     <View style={styles.container}>

//       {/* Tabs */}
//       <View style={styles.row}>
//         {state.routes.map((route, index) => {
//           const isActive = index === activeIndex;

//           return (
//             <TouchableOpacity
//               key={route.key}
//               onPress={() => navigation.navigate(route.name)}
//               style={[styles.iconWrapper, isActive && styles.active]}
//             >
//               <Icon
//                 name={TAB_ICONS[route.name]}
//                 size={22}
//                 color={isActive ? colors.primary : colors.textPrimary}

//               />
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 80,
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     borderRadius:20,
//     alignItems: 'center',
//     backgroundColor:colors.surface,
//     elevation: 8,
//     shadowColor: colors.shadow,
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius:8,
//   },

//   row: {
//     position: 'absolute',
//     bottom: 22,
//     width: '80%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   iconWrapper: {
//     padding: 12,
//   },
//   active: {
//     backgroundColor: colors.tertiary,
//     padding: 16,
//     borderRadius: 50,
//     elevation: 15,
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
// });

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 4;

const TAB_ICONS = {
  Home: 'home-outline',
  Plan: 'bag-outline',
  Favorite: 'heart-outline',
  Profile: 'person-outline',
};

export default function CurvedBottomNav({ state, navigation }) {
  const activeIndex = state.index;

  const createCurvePath = (index) => {
    const centerX = index * TAB_WIDTH + TAB_WIDTH / 2;
    const curveWidth = 70;
    const curveDepth = 20;

    return `
      M 0 0
      L ${centerX - curveWidth} 0
      Q ${centerX - curveWidth / 2} 0 ${centerX - curveWidth / 2} ${curveDepth}
      Q ${centerX - curveWidth / 2} ${curveDepth + 40} ${centerX} ${curveDepth + 40}
      Q ${centerX + curveWidth / 2} ${curveDepth + 40} ${centerX + curveWidth / 2} ${curveDepth}
      Q ${centerX + curveWidth / 2} 0 ${centerX + curveWidth} 0
      L ${SCREEN_WIDTH} 0
      L ${SCREEN_WIDTH} 70
      L 0 70
      Z
    `;
  };

  return (
    <View style={styles.container}>
      {/* BACKGROUND WITH CUTOUT */}
      <View style={styles.background}>
        <Svg width={SCREEN_WIDTH} height={70} style={styles.svg}>
          <Path
            d={createCurvePath(activeIndex)}
            fill={colors.bottomprimary}
          />
        </Svg>
      </View>

      {/* NAV ICONS */}
      <View style={styles.iconRow}>
        {state.routes.map((route, index) => {
          const isActive = index === activeIndex;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.iconBox}
            >
              {isActive ? (
                <View style={styles.activeCircle}>
                  <Icon
                    name={TAB_ICONS[route.name]}
                    size={26}
                    color={colors.surface}
                  />
                </View>
              ) : (
                <Icon
                  name={TAB_ICONS[route.name]}
                  size={24}
                  color={colors.surface}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  background: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    overflow: 'hidden',
  },

  svg: {
    position: 'absolute',
    bottom: 0,
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
    height: '100%',
    paddingBottom: 10,
  },

  iconBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.bottomprimary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});