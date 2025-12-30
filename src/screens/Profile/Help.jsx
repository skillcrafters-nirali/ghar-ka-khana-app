import React from 'react';
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

const helpItems = [
  { title: 'General', icon: 'information-circle-outline',type:'general' },
  { title: 'FAQs', icon: 'help-circle-outline',type:'faqs' },
  { title: 'Report Safety Emergency', icon: 'warning-outline',type:'safety' },
  { title: 'Legal', icon: 'document-text-outline',type:'legal' },
  { title: 'Terms & Conditions', icon: 'reader-outline',type:'terms' },
  { title: 'Payments', icon: 'card-outline',type:'payments' },
];

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {helpItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() =>
          navigation.navigate('HelpDetail', { 
            title:item.title,
            type: item.type,
         })
          }>
            <View style={styles.left}>
              <Icon name={item.icon} size={22} color={colors.primary} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
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
    color: colors.textPrimary,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 16,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
  },
});
export default Help;
