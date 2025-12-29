import React from 'react';
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
import { tiffinProviders } from '../main/HomeScreen';

const OrderHistoryScreen = ({ navigation }) => {
  
  const orders = tiffinProviders.slice(0, 2).map((provider, index) => ({
    id: `ORD-${1000 + index}`,
    provider: provider.name,
    combo: provider.COMBOS?.[0], // ✅ FULL COMBO OBJECT
    date: '10 Jan 2024',
    image: provider.image,
  }));
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Orders */}
      <ScrollView contentContainerStyle={styles.list}>
        {orders.map(order => (
          <View key={order.id} style={styles.card}>
            {/* Left Image */}
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: order.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            {/* Right side */}
            <View style={styles.content}>
              <Text style={styles.date}>{order.date}</Text>

              <View style={styles.topRow}>
                <Text style={styles.provider}>{order.provider}</Text>
              </View>

              {/* <Text style={styles.items}>{order.items.join(', ')}</Text> */}
              <Text style={styles.items}>{order.combo?.name}</Text>


              <View style={styles.bottomRow}>
                <Button title="Rate" variant="outline" size="small" />
                <Button
                  title="Re-order"
                  variant="primary"
                  size="small"
                  style={{ marginLeft: 10 }}
                  // onPress={() => navigation.navigate('OrderManagement')}
                  onPress={() =>
                    navigation.navigate('OrderManagement', {
                      combo: order.combo, // ✅ NOW IT EXISTS

                    })
                  }
                  
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

  list: {
    padding: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 22,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  imageWrapper: {
    justifyContent: 'center',
  },

  image: {
    width: 110,
    height: 120,
    borderRadius: 12,
  },

  content: {
    flex: 1,
    marginLeft: 18,
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
    textAlign: 'right',
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
    minWidth: 90,
  },
  reorderBtn: {
    borderRadius: 10,
    minWidth: 110,
  },
});

export default OrderHistoryScreen;
