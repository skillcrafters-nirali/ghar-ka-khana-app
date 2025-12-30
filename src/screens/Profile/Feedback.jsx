import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';

const TOTAL_STARS = 5;

const feedbackTags = [
  'Food Quality',
  'Taste',
  'Packaging',
  'Delivery',
  'Portion Size',
  'Hygiene',
];

const Feedback = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [message, setMessage] = useState('');

  const MAX_CHARACTERS = 250;

  const handleTextChange = text => {
    const words = text.trim().split(/\s+/);

    if (words.length <= MAX_CHARACTERS) {
      setMessage(text);
    }
  };

  const toggleTag = tag => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = () => {
    if (message.length > 250) {
      return; // never submit invalid data
    }
    const payload = {
      rating: selectedRating,
      tags: selectedTags,
      message:message.trim(),
    };

    console.log('Feedback Submitted:', payload);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Feedback</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Title */}
        <Text style={styles.title}>How was your experience?</Text>

        {/* ⭐ Star Rating */}
        <View style={styles.starRow}>
          {[...Array(TOTAL_STARS)].map((_, index) => {
            const starValue = index + 1;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => setSelectedRating(starValue)}
              >
                <Icon
                  name={starValue <= selectedRating ? 'star' : 'star-outline'}
                  size={38}
                  color={
                    starValue <= selectedRating ? colors.primary : colors.border
                  }
                  style={styles.star}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback Tags */}
        <Text style={styles.sectionTitle}>What went well?</Text>
        <View style={styles.tagsContainer}>
          {feedbackTags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagSelected,
              ]}
              onPress={() => toggleTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Input */}
        <Text style={styles.sectionTitle}>Tell us more</Text>
        <TextInput
          placeholder="Share your experience with Ghar Ka Khana..."
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          multiline
          value={message}
          maxLength={250}
          onChangeText={handleTextChange}
        />

        <Text
          style={[
            styles.charCount,
            message.length > 230 && { color: colors.error },
          ]}
        >
          {message.length} / 250
        </Text>

        {/* Submit Button */}
        <Button
          title="Submit Feedback"
          variant="primary"
          size="large"
          style={{ marginTop: 24 }}
          onPress={handleSubmit}
          disabled={selectedRating === 0 || message.length > 250}
        />
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
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: fonts.size.lg,
    fontFamily: fonts.family.bold,
    marginBottom: 16,
    color: colors.textPrimary,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
  },
  star: {
    marginHorizontal: 4,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24, 
  },

  sectionTitle: {
    fontSize: fonts.size.md,
    fontFamily: fonts.family.medium,
    marginBottom: 12,
    color: colors.textPrimary,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 10,
    marginBottom: 10,
  },
  tagSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: fonts.size.sm,
    color: colors.textSecondary,
  },
  tagTextSelected: {
    color: colors.surface,
  },
  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: fonts.size.md,
    fontFamily: fonts.family.regular,
    textAlignVertical: 'top',
    backgroundColor: colors.surface,
  },
  charCount: {
    textAlign: 'right',
    fontSize: fonts.size.xs,
    color: colors.textSecondary,
    marginTop: 6,
  },
});

export default Feedback;
