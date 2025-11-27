import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';

const ProfileDropdown = ({ navigation }) => {
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={handleProfilePress}>
      <Icon name="person-circle-outline" size={32} color={colors.primary} />
    </TouchableOpacity>
  );
};



export default ProfileDropdown;