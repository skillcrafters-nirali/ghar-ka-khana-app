import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Button from '../../components/common/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    type: 'splash',
    title: 'Ghar Ka Khana',
    logo: '🌾',
  },
  {
    id: 2,
    type: 'onboarding',
    title: 'Looking for Dabba?',
    subtitle:
      'Save time with Annapurna! Easily find dabba at your area and get them delivered right to your doorstep.',
    img: 'https://cdn-icons-png.flaticon.com/512/5210/5210711.png',
  },
  {
    id: 3,
    type: 'onboarding',
    title: 'GHAR KA KHANA',
    subtitle:
      'An authoritative meal for you to optimize your health and get them delivered right to your doorstep.',
    img: 'https://www.pngitem.com/pimgs/m/273-2732209_tiffin-png-rated-transparent-png.png',
    // img:'https://static.vecteezy.com/system/resources/thumbnails/066/950/495/small/stainless-steel-tiffin-with-indian-food-on-transparent-background-png.png',

    features: [
      '1. Customizable Meal Options',
      '2. Flexible Subscription Plans',
      '3. Browse friendly Local Tiffin Services',
      '4. Hassle-Free Ordering',
    ],
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        handleNext();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    } else {
      navigation.navigate('Auth');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Auth');
  };

  const handleGetStarted = () => {
    navigation.navigate('Auth');
  };

  const renderSplashScreen = () => (
    <LinearGradient
      colors={[colors.gradientDark, colors.gradientMid, colors.gradientLight]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.splashContainer}
    >
      <View style={styles.splashContent}>
        <Text style={styles.wheatIcon}>🌾</Text>
        <Text style={styles.splashTitle}>GHAR KA KHANA</Text>
      </View>
    </LinearGradient>
  );

  const renderOnboardingScreen = (screen, index) => {
    const isSecondScreen = index === 1;
    const topSectionStyle = isSecondScreen
      ? styles.topSectionLarge
      : styles.topSectionSmall;
    const borderWrapperStyle = isSecondScreen
      ? styles.borderWrapperSmall
      : styles.borderWrapperLarge;
    const bottomSectionStyle = isSecondScreen
      ? styles.bottomSectionSmall
      : styles.bottomSectionLarge;

    return (
      <View style={styles.onboardingContainer}>
        <View style={topSectionStyle}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: screen.img }}
              style={styles.onboardingImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={borderWrapperStyle}>
          <View style={bottomSectionStyle}>
            <View style={styles.textContainer}>
              <Text style={styles.onboardingTitle}>{screen.title}</Text>
              <Text style={styles.onboardingSubtitle}>{screen.subtitle}</Text>

              {screen.features && (
                <View style={styles.featuresContainer}>
                  <Text style={styles.featuresTitle}>Features:</Text>
                  {screen.features.map((feature, idx) => (
                    // <Text key={idx} style={styles.featureText}>
                    <Text key={`feature-${idx}`} style={styles.featureText}>
                      {feature}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            <View
              style={
                index === onboardingData.length - 1
                  ? styles.centeredContainer
                  : styles.bottomContainer
              }
            >
              {index === onboardingData.length - 1 ? (
                <Button
                  title="Get Started!"
                  onPress={handleGetStarted}
                  variant="primary"
                  size="large"
                />
              ) : (
                <>
                  <TouchableOpacity
                    onPress={handleSkip}
                    style={styles.skipButton}
                  >
                    <Text style={styles.skipText}>
                      Skip
                      <AntDesign name="right" color="#000" size={16} />
                    </Text>
                  </TouchableOpacity>
                  <Button
                    title="Next"
                    onPress={handleNext}
                    variant="primary"
                    size="medium"
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={currentIndex === 0 ? 'light-content' : 'dark-content'}
        backgroundColor={currentIndex === 0 ? 'transparent' : colors.background}
        translucent={currentIndex === 0}
        hidden={currentIndex === 0}
      />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        scrollEnabled={true}
      >
        {onboardingData.map((screen, index) => (
          <View key={screen.id} style={styles.screenContainer}>
            {screen.type === 'splash'
              ? renderSplashScreen()
              : renderOnboardingScreen(screen, index)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  screenContainer: {
    width: width,

    flex: 1,
  },
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
  },
  wheatIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 32,
    fontFamily: fonts.family.bold,
    color: colors.surface,
    letterSpacing: 2,
  },
  // Onboarding Screen Styles
  onboardingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  topSectionLarge: {
    flex: 0.7,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 60,
  },
  topSectionSmall: {
    flex: 0.5,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  borderWrapperSmall: {
    flex: 0.6,
    // flex:0.5,
    backgroundColor: colors.textSecondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 2,
  },
  borderWrapperLarge: {
    flex: 0.85,

    backgroundColor: colors.textSecondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 2,
  },
  bottomSectionSmall: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 40,
  },
  bottomSectionLarge: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingImage: {
    width: width * 0.5,
    height: width * 0.4,
    maxWidth: 200,
    maxHeight: 160,
  },
  textContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  onboardingTitle: {
    fontSize: 28,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  onboardingSubtitle: {
    fontSize: 16,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontFamily: fonts.family.medium,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    fontFamily: fonts.family.regular,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  skipText: {
    fontSize: 16,
    fontFamily: fonts.family.bold,
    color: colors.textPrimary,
  },
});

export default OnboardingScreen;
