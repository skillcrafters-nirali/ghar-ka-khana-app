import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from './Button';

const ProviderHeader = ({ provider, onCallPress, onBackPress, onMenuPress }) => {
  const statusBarHeight = StatusBar.currentHeight || 44;
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: provider.image || 'https://via.placeholder.com/300x200' }} 
        style={styles.image}
      />
      <View style={[styles.headerOverlay,{top:statusBarHeight+16}]}>
        <TouchableOpacity onPress={onBackPress} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="heart-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="share-social-outline" size={24} color={colors.surface} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.overlay}>
        <View style={styles.nameRow}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.rating}>⭐ {provider.rating}</Text>
        </View>
        <Text style={styles.location}>{provider.type} • {provider.location}</Text>
        <View style={styles.buttonRow}>
          <Button 
            title="Call Now" 
            size="small" 
            onPress={onCallPress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12
  },
  headerOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerButton: {
    width: 40,
    height: 40,
    // borderRadius: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 8
  },
  overlay: {
    position: 'absolute',
    bottom: -30,
    left: 16,
    right: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 8
    
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  providerName: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary
  },
  rating: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary
  },
  location: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
    marginBottom: 8
  },
  buttonRow: {
    alignItems: 'flex-end'
  }
});

export default ProviderHeader;