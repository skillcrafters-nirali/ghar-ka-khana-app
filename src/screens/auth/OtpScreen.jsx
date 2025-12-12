import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useVerifyOtpMutation, useResendOtpMutation } from '../../services/api';
import { setCredentials } from '../../store/authSlice';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const OtpScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [apiError, setApiError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [countdown, setCountdown] = React.useState(60);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const phoneNumber = route?.params?.phoneNumber || '+91 9876543210';

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    },
  });

  const watchedValues = watch();
  // const otpString = `${watchedValues.otp1}${watchedValues.otp2}${watchedValues.otp3}${watchedValues.otp4}`;

  const handleOtpChange = (value, index, onChange) => {
    if (value.length > 1) return;
    onChange(value);
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !watchedValues[`otp${index + 1}`] &&
      index > 0
    ) {
      inputRefs[index - 1].current.focus();
    }
  };

  const onSubmit = async data => {
    const otpString = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;
    setApiError('');
    try {
      const result = await verifyOtp({
        phone: phoneNumber.replace('+91', ''),
        otp: otpString,
      }).unwrap();
      console.log('OTP Verification Success:',result);
      if (result.status) {
        dispatch(
          setCredentials({
            token:result.token,
            user:result.user||{id: result.userId
            },
          }),
        );
        navigation.navigate('MainTabs');
      }
    } catch (error) {
      console.log('OTP Verification Error:', error);
      setApiError(error.data?.message || 'OTP Verification Failed');
    }
  };

  React.useEffect(() => {
    setCountdown(60); 
  }, []);
  
  React.useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = async () => {
    try {
      const result = await resendOtp({
        phone: phoneNumber.replace('+91', ''),
      }).unwrap();
      setCountdown(60);
      // Show success feedback
      setSuccessMessage(result.message ||'OTP sent successfully!');
      console.log('Resend OTP Success:', result);
      reset();
      inputRefs[0].current.focus();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.log('Resend OTP Error:', error);
      setApiError(error.data?.message || 'Failed to resend OTP');
      setSuccessMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <View style={styles.centerContainer}>
        <Text style={styles.title}>Verify Phone Number</Text>

        <Text style={styles.subtitle}>Code is sent to {phoneNumber}</Text>

        <View style={styles.otpContainer}>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <Controller
              key={index}
              control={control}
              name={`otp${index + 1}`}
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[0-9]$/,
                  message: 'Only numbers allowed',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={inputRefs[index]}
                  style={[
                    styles.otpInput,
                    value && styles.otpInputFilled,
                    errors[`otp${index + 1}`] && styles.inputError,
                  ]}
                  value={value}
                  onChangeText={val => handleOtpChange(val, index, onChange)}
                  onKeyPress={e => handleKeyPress(e, index)}
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
          <Text style={styles.errorText}>Please enter valid 6-digit OTP</Text>
        )}

        {apiError && <Text style={styles.errorText}>{apiError}</Text>}
        {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
       <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get OTP Code?</Text>
          {countdown > 0 ? (
            <Text style={styles.countdownText}>
              Resend code in {countdown} seconds
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={isResending}>
              <Text style={styles.resendLink}>
                {isResending ? 'Sending...' : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Button
          title={isLoading ? 'Verifying...' : 'Verify'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
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
    width: 300,
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
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize:fonts.size.xs,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  countdownText: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  
  disabledLink: {
    color: colors.textSecondary,
    textDecorationLine: 'none',
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
  successText: {
    color: colors.primary || '#4CAF50',
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
