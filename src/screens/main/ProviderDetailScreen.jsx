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



/* ---------------- HELPERS ---------------- */

const calculateMealTotal = meal => {
  let total = 0;

  Object.keys(meal).forEach(key => {
    const value = meal[key];
    if (!value) return;

    if (MULTI_SELECT.includes(key)) {
      Object.values(value || {}).forEach(i => {
        if (i?.qty && i?.price) {
          total += i.price * i.qty;
        }
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
  const combos = provider?.COMBOS || [];

  // Lunch open by default
  const [openMeal, setOpenMeal] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);

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
  const hasAnyOrder = () => {
    return hasSelection('lunch') || hasSelection('dinner');
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

  const toggleSingleItem = (meal, category, item) => {
    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };

      // untick if same item clicked
      if (mealData[category]?.id === item.id) {
        mealData[category] = null;
      } else {
        mealData[category] = item;
      }

      updated[meal] = mealData;
      return updated;
    });
  };

  const removeItem = (meal, category, id) => {
    if (!MULTI_SELECT.includes(category)) return;

    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };
      const item = mealData[category]?.[id];

      if (!item) return prev;

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
    if (!MULTI_SELECT.includes(category)) return;

    setMeals(prev => {
      const updated = { ...prev };
      const mealData = { ...updated[meal] };
      const clone = { ...(mealData[category] || {}) };
      delete clone[id];
      mealData[category] = clone;
      updated[meal] = mealData;
      return updated;
    });
  };

  /* ---------------- COMBO LIST ---------------- */

  const renderComboList = () => {
    if (!combos.length) return null;

    return (
      <View style={styles.comboCard}>
        <Text style={styles.comboTitle}>Combo List</Text>
        {combos.map(combo => (
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
                variant={
                  selectedCombo?.id === combo.id ? 'secondary' : 'outline'
                }
                size="small"
                style={styles.tryBtn}
                onPress={() => setSelectedCombo(combo)}
              />

              <Button
                title="Subscribe"
                variant={
                  selectedCombo?.id === combo.id ? 'outline' : 'secondary'
                }
                size="small"
                style={styles.subscribeBtn}
                onPress={() =>
                  navigation.navigate('MenuSubscription', {
                    provider,
                    combo,
                  })
                }
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
                toggleSingleItem(meal, category, item);
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
    const menu = provider.menu?.[meal] || {};
    

    return (
      <View style={styles.mealCard}>
        <TouchableOpacity onPress={() => toggleMeal(meal)}>
          <Text style={styles.mealTitle}>{label}</Text>
        </TouchableOpacity>

        {openMeal === meal &&
          ALL_CATEGORIES.map(category => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {/* {menu[category]?.map(item => renderItemRow(meal, category, item))} */}
              {(menu[category] || []).map(item =>
                renderItemRow(meal, category, item),
              )}
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

        <View style={{ marginHorizontal: 16, marginBottom: 30 }}>
          <Button
            title="Place Order"
            variant="primary"
            size="large"
            disabled={!hasAnyOrder() && !selectedCombo}
            onPress={() => {
              navigation.navigate('OrderManagement', {
                provider,
                combo: selectedCombo,
                meals: {
                  lunch: meals.lunch,
                  dinner: meals.dinner,
                },
                total: {
                  lunch: calculateMealTotal(meals.lunch),
                  dinner: calculateMealTotal(meals.dinner),
                },
              });
            }}
          />
        </View>
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
    color: colors.surface,
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
    marginRight: 8,
  },
  comboButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
