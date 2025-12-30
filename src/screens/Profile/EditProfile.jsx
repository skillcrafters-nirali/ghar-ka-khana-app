import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const EditProfile = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [editableField, setEditableField] = useState(null);

  const handleUpdate = () => {
    // 🔮 Future API Call
    console.log({ name, email, phone });
    navigation.goBack();
  };
  console.log('USER OBJECT 👉', user);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* NAME */}
        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={[
                styles.input,
                editableField !== 'name' && styles.readOnlyInput,
              ]}
              value={name}
              onChangeText={setName}
              editable={editableField === 'name'}
            />
          </View>

          <TouchableOpacity onPress={() => setEditableField('name')}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        {/* EMAIL */}
        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                editableField !== 'email' && styles.readOnlyInput,
              ]}
              value={email}
              onChangeText={setEmail}
              editable={editableField === 'email'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity onPress={() => setEditableField('email')}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        {/* PHONE */}
        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                editableField !== 'phone' && styles.readOnlyInput,
              ]}
              value={phone}
              onChangeText={setPhone}
              //   editable={editableField === 'phone'}
              //  editable={editableField === 'phone' || editableField === null}
              editable={editableField === 'phone'}
              selectTextOnFocus={editableField === 'phone'}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <TouchableOpacity onPress={() => setEditableField('phone')}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FIXED BUTTON */}
      <View style={styles.footer}>
        <Button
          title="Update"
          variant="primary"
          size="large"
          onPress={handleUpdate}
        />
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },

  form: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    fontSize: fonts.size.md,
    color: colors.textPrimary,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 28,
  },

  editText: {
    fontSize: fonts.size.sm,
    fontFamily: fonts.family.medium,
    color: colors.primary,
    marginLeft: 12,
    paddingBottom: 6,
  },

  readOnlyInput: {
    color: colors.textSecondary,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});

export default EditProfile;
