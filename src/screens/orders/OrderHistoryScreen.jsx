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
