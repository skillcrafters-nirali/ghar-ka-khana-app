import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const helpData = {
  general: [
    {
      q: 'What is this app about?',
      a: 'We provide homemade tiffin services with fresh, hygienic ghar ka khana delivered daily.',
    },
    {
      q: 'Which cities do you serve?',
      a: 'Currently we serve selected areas. Availability depends on tiffin providers near you.',
    },
  ],

  faqs: [
    {
      q: 'Can I pause my tiffin service?',
      a: 'Yes, you can pause or resume your subscription anytime from your orders section.',
    },
    {
      q: 'Is food prepared daily?',
      a: 'Yes, food is freshly prepared every day by verified home chefs.',
    },
  ],

  safety: [
    {
      q: 'How do I report a safety issue?',
      a: 'You can report safety concerns directly from this section or contact support immediately.',
    },
    {
      q: 'Are tiffin providers verified?',
      a: 'Yes, all providers go through verification before onboarding.',
    },
  ],

  legal: [
    {
      q: 'Is my data secure?',
      a: 'Yes, we follow standard security practices to protect your personal information.',
    },
  ],

  terms: [
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, subscriptions can be cancelled anytime as per our cancellation policy.',
    },
    {
      q: 'Do refunds apply?',
      a: 'Refunds depend on the subscription plan and cancellation timing.',
    },
  ],

  payments: [
    {
      q: 'What payment methods are supported?',
      a: 'UPI, Debit Card, Credit Card, and Net Banking are supported.',
    },
    {
      q: 'Payment deducted but order not confirmed?',
      a: 'Don’t worry. Amount is auto-refunded within 5–7 working days.',
    },
  ],
};
const HelpDetail = ({ route, navigation }) => {
    const { title, type } = route.params;
    const [openIndex, setOpenIndex] = useState(null);
  
    const data = helpData[type] || [];
  
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
  
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 24 }} />
        </View>
  
        <ScrollView>
          {data.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <View key={index} style={styles.card}>
                <TouchableOpacity
                  style={styles.questionRow}
                  onPress={() => setOpenIndex(isOpen ? null : index)}
                >
                  <Text style={styles.question}>{item.q}</Text>
                  <Icon
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
  
                {isOpen && <Text style={styles.answer}>{item.a}</Text>}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: fonts.size.lg,
      fontFamily: fonts.family.medium,
    },
    card: {
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
    },
    question: {
      flex: 1,
      fontSize: fonts.size.md,
      fontFamily: fonts.family.medium,
      color: colors.textPrimary,
      marginRight: 10,
    },
    answer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      fontSize: fonts.size.sm,
      fontFamily: fonts.family.regular,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
  
  
  export default HelpDetail;
  