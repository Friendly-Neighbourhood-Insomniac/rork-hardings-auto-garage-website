
import { StyledText } from './components/StyledText';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  Pressable,
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import {
  Wrench,
  Zap,
  Shield,
  Phone,
  MapPin,
  ChevronRight,
  Award,
  Clock,
  Users,
  Star,
  ChevronDown,
} from 'lucide-react-native';
import  Colors  from '../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SERVICES = [
  {
    id: '1',
    title: 'Vehicle Diagnostics',
    description: 'Advanced diagnostic tools for accurate problem identification',
    icon: 'wrench',
  },
  {
    id: '2',
    title: 'Lexus V8 Conversions',
    description: 'Expert engine conversions and performance upgrades',
    icon: 'zap',
  },
  {
    id: '3',
    title: 'ECU Remapping',
    description: 'Engine management upgrades and custom tuning',
    icon: 'shield',
  },
  {
    id: '4',
    title: 'Performance Tuning',
    description: 'Custom builds for maximum performance',
    icon: 'award',
  },
  {
    id: '5',
    title: 'Panel Beating',
    description: 'Professional panel beating and spray painting',
    icon: 'wrench',
  },
  {
    id: '6',
    title: 'Routine Servicing',
    description: 'Oil changes, filters, brakes, and maintenance',
    icon: 'clock',
  },
];

const GALLERY_IMAGES = [
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/q4ny8222kyizt6ba2w5oc',
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/8pkw7vavx2blqtgqwun9j',
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/c97xzoauxximbbh3yc9vv',
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lmfvhoibkhgr2la6wyq21',
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/xgra39733pmfhbowj85sh',
  'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/gz2421ktdppc5fy81cltb',
];

const STATS = [
  { label: 'Years Experience', value: '15+', icon: 'clock' },
  { label: 'Happy Clients', value: '500+', icon: 'users' },
  { label: 'Projects Done', value: '1000+', icon: 'award' },
  { label: 'Rating', value: '5.0', icon: 'star' },
];

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: isHovered ? 1.05 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isHovered, scaleAnim]);

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={styles.serviceCardPressable}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <LinearGradient
          colors={[Colors.darkGray, Colors.metallic]}
          style={styles.serviceCardGradient}
        >
          <View style={styles.serviceIconContainer}>
            {getServiceIcon(service.icon)}
          </View>
          <StyledText variant='heading' style={styles.serviceTitle}>{service.title}</StyledText>
          <StyledText style={styles.serviceDescription}>{service.description}</StyledText>
          <View style={styles.serviceCorner} />
          <StyledText style={styles.learnMore}>Learn more</StyledText>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default function HardingsAutoGarage() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, bounceAnim]);

  const handleCall = () => {
    Linking.openURL('tel:+27762683721');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/27762683721');
  };

  const handleLocation = () => {
    const address = '15 Liebenberg Street, Swartruggens';
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    });
    Linking.openURL(url);
  };

  const getServiceIcon = (iconName: string) => {
    const iconProps = { size: 32, color: Colors.secondary, strokeWidth: 2 };
    switch (iconName) {
      case 'wrench':
        return <Wrench {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'clock':
        return <Clock {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  const getStatIcon = (iconName: string) => {
    const iconProps = { size: 28, color: Colors.accent, strokeWidth: 2.5 };
    switch (iconName) {
      case 'clock':
        return <Clock {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'award':
        return <Award {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={[styles.heroSection, { paddingTop: Math.max(insets.top, 0) }]}>
          <FlatList
            data={GALLERY_IMAGES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.heroImage} />
            )}
          />
          <View style={styles.heroOverlay} />
          <Animated.View style={[styles.heroContent, { opacity: fadeAnim }]}>
            <StyledText variant='heading' style={styles.mainHeadline}>Trusted Auto Repairs & Service</StyledText>
            <StyledText style={styles.subHeadline}>15+ years keeping you on the road</StyledText>
            <View style={styles.ctaButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleCall}
              >
                <Phone size={20} color={Colors.white} strokeWidth={2.5} />
                <StyledText style={styles.primaryButtonText}>Book Service</StyledText>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleWhatsApp}
              >
                <StyledText style={styles.secondaryButtonText}>WhatsApp</StyledText>
                <ChevronRight size={20} color={Colors.secondary} strokeWidth={2.5} />
              </Pressable>
            </View>
          </Animated.View>
          <Animated.View style={[styles.downArrowContainer, { transform: [{ translateY: bounceAnim }] }]}>
            <ChevronDown size={32} color={Colors.white} />
          </Animated.View>
        </View>

        <View style={styles.statsSection}>
          <LinearGradient
            colors={[Colors.darkGray, Colors.metallic]}
            style={styles.statsGradient}
          >
            <View style={styles.statsGrid}>
              {STATS.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    {getStatIcon(stat.icon)}
                  </View>
                  <StyledText variant='heading' style={styles.statValue}>{stat.value}</StyledText>
                  <StyledText style={styles.statLabel}>{stat.label}</StyledText>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <StyledText variant='heading' style={styles.sectionTitle}>OUR SERVICES</StyledText>
            </View>
            <StyledText style={styles.sectionSubtitle}>
              Comprehensive automotive solutions tailored to your needs
            </StyledText>
          </View>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        </View>

        <View style={styles.gallerySection}>
          <LinearGradient
            colors={[Colors.dark, Colors.darkGray]}
            style={styles.galleryGradient}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.accentLine} />
                <StyledText variant='heading' style={styles.sectionTitle}>OUR WORK</StyledText>
              </View>
              <StyledText style={styles.sectionSubtitle}>
                Showcasing excellence in every project
              </StyledText>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryScroll}
            >
              {GALLERY_IMAGES.map((image, index) => (
                <View key={index} style={styles.galleryImageContainer}>
                  <Image source={{ uri: image }} style={styles.galleryImage} />
                  <View style={styles.galleryOverlay}>
                    <StyledText variant='heading' style={styles.galleryNumber}>0{index + 1}</StyledText>
                  </View>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutContent}>
            <View style={styles.aboutImageContainer}>
              <Image source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lmfvhoibkhgr2la6wyq21' }} style={styles.aboutImage} />
            </View>
            <View style={styles.aboutTextContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <View style={styles.accentLine} />
                  <StyledText variant='heading' style={styles.sectionTitle}>ABOUT US</StyledText>
                </View>
                <StyledText style={styles.aboutText}>
                  Hardings Auto Garage has built a strong reputation in Swartruggens for quality
                  workmanship and customer satisfaction. We specialize in everything from routine
                  servicing to complex performance upgrades and Lexus V8 engine conversions.
                </StyledText>
                <StyledText style={styles.aboutText}>
                  Our team of expert technicians uses advanced diagnostic tools and state-of-the-art
                  equipment to ensure your vehicle receives the best care possible.
                </StyledText>
                <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
                  <StyledText style={styles.secondaryButtonText}>View Portfolio</StyledText>
                  <ChevronRight size={20} color={Colors.secondary} strokeWidth={2.5} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contactSection}>
          <LinearGradient
            colors={[Colors.darkGray, Colors.dark]}
            style={styles.contactGradient}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.accentLine} />
                <StyledText variant='heading' style={styles.sectionTitle}>GET IN TOUCH</StyledText>
              </View>
              <StyledText style={styles.sectionSubtitle}>
                Visit us or reach out for expert automotive service
              </StyledText>
            </View>

            <View style={styles.contactCards}>
              <Pressable
                style={({ pressed }) => [
                  styles.contactCard,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleCall}
              >
                <View style={styles.contactIconContainer}>
                  <Phone size={24} color={Colors.secondary} strokeWidth={2.5} />
                </View>
                <StyledText style={styles.contactLabel}>Phone</StyledText>
                <StyledText style={styles.contactValue}>+27 76 268 3721</StyledText>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.contactCard,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleLocation}
              >
                <View style={styles.contactIconContainer}>
                  <MapPin size={24} color={Colors.secondary} strokeWidth={2.5} />
                </View>
                <StyledText style={styles.contactLabel}>Location</StyledText>
                <StyledText style={styles.contactValue}>15 Liebenberg Street{'
'}Swartruggens</StyledText>
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <StyledText style={styles.footerText}>
            © 2025 Hardings Auto Garage. All rights reserved.
          </StyledText>
          <StyledText style={styles.footerSubtext}>
            Precision Engineering • Performance Tuning • Customer Excellence
          </StyledText>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
  },
  mainHeadline: {
    fontSize: 48,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subHeadline: {
    fontSize: 20,
    color: Colors.lightGray,
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  downArrowContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 10,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  statsSection: {
    marginTop: -30,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  statsGradient: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 20,
  },
  statCard: {
    alignItems: 'center',
    minWidth: (SCREEN_WIDTH - 80) / 2,
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 32,
    color: Colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.lightGray,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  sectionHeader: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 15,
    alignSelf: 'flex-start',
  },
  accentLine: {
    width: 4,
    height: 32,
    backgroundColor: Colors.secondary,
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 28,
    color: Colors.white,
    letterSpacing: 2,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: Colors.lightGray,
    lineHeight: 24,
    marginLeft: 0,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  serviceCardPressable: {
    width: (SCREEN_WIDTH - 55) / 2,
    marginBottom: 5,
  },
  serviceCardGradient: {
    borderRadius: 12,
    padding: 20,
    minHeight: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.2)',
  },
  serviceIconContainer: {
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 13,
    color: Colors.lightGray,
    lineHeight: 20,
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accent,
    marginTop: 10,
  },
  serviceCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 40,
    backgroundColor: Colors.secondary,
    opacity: 0.1,
  },
  gallerySection: {
    marginVertical: 40,
  },
  galleryGradient: {
    paddingVertical: 60,
  },
  galleryScroll: {
    paddingLeft: 20,
    gap: 15,
  },
  galleryImageContainer: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_WIDTH * 0.75 * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  galleryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  galleryNumber: {
    fontSize: 32,
    color: Colors.secondary,
  },
  aboutSection: {
    paddingHorizontal: 0,
    paddingVertical: 60,
    backgroundColor: Colors.darkGray,
  },
  aboutContent: {
    paddingHorizontal: 0,
    maxWidth: 600,
  },
  aboutImageContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  aboutImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
  },
  aboutTextContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  aboutText: {
    fontSize: 16,
    color: Colors.lightGray,
    lineHeight: 26,
    marginBottom: 20,
    marginLeft: 0,
  },
  contactSection: {
    paddingVertical: 60,
  },
  contactGradient: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  contactCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactCard: {
    flex: 1,
    minWidth: (SCREEN_WIDTH - 55) / 2,
    backgroundColor: Colors.metallic,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(100, 116, 139, 0.3)',
  },
  contactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactLabel: {
    fontSize: 12,
    color: Colors.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.dark,
    borderTopWidth: 1,
    borderTopColor: 'rgba(100, 116, 13.9, 0.2)',
  },
  footerText: {
    fontSize: 14,
    color: Colors.lightGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.lightGray,
    opacity: 0.6,
    textAlign: 'center',
  },
});
