import React from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/api';
// import { setCredentials } from '../../store/authSlice';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
    },
  });

  const phoneNumber = watch('phoneNumber');

  const onSubmit = async data => {
    try {
      const result = await login({
        phone: data.phoneNumber,
      }).unwrap();
      console.log('Login Success:', result);
      // dispatch(
      //   setCredentials({
      //     token: result.token,
      //     user: result.user,
      //   }),
      // );

      if (result.status) {
        navigation.navigate('Otp', {
          phoneNumber:data.phoneNumber,
          otp: result.data?.otp,
        });
      }
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Top Section - Title */}
      <View style={styles.topSection}>
        <Text style={styles.logoText}>GHAR KA KHANA</Text>
      </View>

      {/* Bottom Section - Sign In Form */}

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Enter valid 10-digit mobile number',
              },
              minLength: {
                value: 10,
                message: 'Phone number must be 10 digits',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.phoneInput,
                  errors.phoneNumber && styles.inputError,
                ]}
                placeholder="Mobile Number"
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
            )}
          />
        </View>

        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
        )}

        <Button
          title={isLoading ? 'Sending...' : 'Send OTP'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          size="large"
          style={styles.sendButton}
        />

        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
              }}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4423/4423697.png',
              }}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          Read Out <Text style={styles.boldText}>Privacy Policy</Text> and{' '}
          <Text style={styles.boldText}>Refund Policy</Text> Managed by company
          limited
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fonts.size.xl,
    fontFamily: fonts.family.bold,
    color: colors.primary,
    letterSpacing: 2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'left',
    marginBottom: 30,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 25,
  },
  phoneInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.regular,
    marginBottom: 15,
    marginTop: -15,
  },
  sendButton: {
    marginBottom: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 25,
  },
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: fonts.size.xs,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    paddingHorizontal: 15,
  },
  boldText: {
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },
});

export default AuthScreen;
