import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../../styles';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
       <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.background : colors.primary} 
        />
      ) :(
       <Text style={[
          styles.text, 
          styles[`${variant}Text`],
          styles[`${size}Text`],
          textStyle
        ]}>
          {title}
        </Text>
       )} 
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.surface,
  },
  secondary: {
    backgroundColor: colors.successbg,
  },
  secondaryText: {
    color: colors.surface,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  buy: {
    backgroundColor: colors.successbg,
  },
  buyText: {
    color: colors.surface,
  },
  
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buySize: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,

  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius:8,

  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius:12,
    alignSelf:'stretch',
  },
  compact: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  
  
  
  // Disabled
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  
  // Text styles
  text: {
    fontFamily: fonts.family.medium,
  },
  
  // Text sizes
  smallText: {
    fontSize: fonts.size.sm,
  },
  mediumText: {
    fontSize: fonts.size.md,
  },
  largeText: {
    fontSize: fonts.size.lg,
  },
  
  
});

export default Button;