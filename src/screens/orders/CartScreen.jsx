import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Dal Rice Combo', price: 120, quantity: 2, provider: 'Mama Kitchen' },
    { id: 2, name: 'Roti with Sabzi', price: 80, quantity: 1, provider: 'Mama Kitchen' },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView style={styles.content}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Icon name="bag-outline" size={64} color={colors.disabled} />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        ) : (
          cartItems.map(item => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.providerName}>{item.provider}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Icon name="remove" size={16} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Icon name="add" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total: ₹{subtotal}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('OrderManagement')}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginLeft: 15
  },
  content: {
    flex: 1,
    paddingHorizontal: 20
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  emptyText: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginTop: 16
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    marginBottom: 4
  },
  providerName: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 4
  },
  itemPrice: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.primary
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginHorizontal: 16
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  totalSection: {
    marginBottom: 16
  },
  totalLabel: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center'
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.bold
  }
});

export default CartScreen;