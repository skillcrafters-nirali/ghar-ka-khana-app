import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const OtpScreen = ({ route, navigation }) => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const phoneNumber = route?.params?.phoneNumber || '+91 9876543210';
  
  const { control, handleSubmit, formState: { errors, isValid }, watch, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: ''
    }
  });

  const watchedValues = watch();
  const otpString = `${watchedValues.otp1}${watchedValues.otp2}${watchedValues.otp3}${watchedValues.otp4}`;

  const handleOtpChange = (value, index, onChange) => {
    if (value.length > 1) return;
    
    onChange(value);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !watchedValues[`otp${index + 1}`] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const onSubmit = (data) => {
    navigation.navigate('MainTabs');
  };

  const handleResend = () => {
    reset();
    inputRefs[0].current.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Verify Phone Number</Text>
        
        <Text style={styles.subtitle}>
          Code is sent to {phoneNumber}
        </Text>
        
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              control={control}
              name={`otp${index + 1}`}
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[0-9]$/,
                  message: 'Only numbers allowed'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={inputRefs[index]}
                  style={[styles.otpInput, value && styles.otpInputFilled, errors[`otp${index + 1}`] && styles.inputError]}
                  value={value}
                  onChangeText={(val) => handleOtpChange(val, index, onChange)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  autoFocus={index === 0}
                />
              )}
            />
          ))}
        </View>
        
        {Object.keys(errors).length > 0 && (
          <Text style={styles.errorText}>Please enter valid 4-digit OTP</Text>
        )}
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get OTP Code? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        
        <Button
          title="Verify"
          onPress={handleSubmit(onSubmit)}
          style={styles.verifyButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 220,
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 20,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.successLight,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 12,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: 12,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.regular,
    marginBottom: 20,
    textAlign: 'center',
  },
  verifyButton: {
    width: 200,
  },
});

export default OtpScreen;
