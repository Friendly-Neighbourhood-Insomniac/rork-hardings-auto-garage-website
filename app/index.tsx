import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
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
} from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
  primary: '#1e3a8a',
  secondary: '#dc2626',
  dark: '#0f172a',
  darkGray: '#1e293b',
  metallic: '#334155',
  lightGray: '#64748b',
  white: '#ffffff',
  accent: '#3b82f6',
};

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

export default function HardingsAutoGarage() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
    const iconProps = { size: 32, color: COLORS.secondary, strokeWidth: 2 };
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
    const iconProps = { size: 28, color: COLORS.accent, strokeWidth: 2.5 };
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

  const logoScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });



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
        <LinearGradient
          colors={[COLORS.dark, COLORS.darkGray, COLORS.dark]}
          style={[styles.heroSection, { paddingTop: Math.max(insets.top + 20, 40) }]}
        >
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: logoScale }, { translateY: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -30],
                  extrapolate: 'clamp',
                }) }],
              },
            ]}
          >
            <Image
              source={{
                uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/iwnfqpqat4zr67rs8a8pc',
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={[styles.heroContent, { opacity: fadeAnim }]}>
            <View style={styles.divider} />
            <Text style={styles.tagline}>PRECISION. PERFORMANCE. PERFECTION.</Text>
            <Text style={styles.heroDescription}>
              Expert mechanical work, performance upgrades, and reliable servicing in Swartruggens
            </Text>
            
            <View style={styles.ctaButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleCall}
              >
                <Phone size={20} color={COLORS.white} strokeWidth={2.5} />
                <Text style={styles.primaryButtonText}>Call Now</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleWhatsApp}
              >
                <Text style={styles.secondaryButtonText}>WhatsApp</Text>
                <ChevronRight size={20} color={COLORS.secondary} strokeWidth={2.5} />
              </Pressable>
            </View>
          </Animated.View>
        </LinearGradient>

        <View style={styles.statsSection}>
          <LinearGradient
            colors={[COLORS.darkGray, COLORS.metallic]}
            style={styles.statsGradient}
          >
            <View style={styles.statsGrid}>
              {STATS.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={styles.statIconContainer}>
                    {getStatIcon(stat.icon)}
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.accentLine} />
              <Text style={styles.sectionTitle}>OUR SERVICES</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Comprehensive automotive solutions tailored to your needs
            </Text>
          </View>

          <View style={styles.servicesGrid}>
            {SERVICES.map((service, index) => (
              <View key={service.id} style={styles.serviceCard}>
                <LinearGradient
                  colors={[COLORS.darkGray, COLORS.metallic]}
                  style={styles.serviceCardGradient}
                >
                  <View style={styles.serviceIconContainer}>
                    {getServiceIcon(service.icon)}
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceCorner} />
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.gallerySection}>
          <LinearGradient
            colors={[COLORS.dark, COLORS.darkGray]}
            style={styles.galleryGradient}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.accentLine} />
                <Text style={styles.sectionTitle}>OUR WORK</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Showcasing excellence in every project
              </Text>
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
                    <Text style={styles.galleryNumber}>0{index + 1}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>
        </View>

        <View style={styles.aboutSection}>
          <View style={styles.aboutContent}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.accentLine} />
                <Text style={styles.sectionTitle}>ABOUT US</Text>
              </View>
              <Text style={styles.aboutText}>
                Hardings Auto Garage has built a strong reputation in Swartruggens for quality
                workmanship and customer satisfaction. We specialize in everything from routine
                servicing to complex performance upgrades and Lexus V8 engine conversions.
              </Text>
              <Text style={styles.aboutText}>
                Our team of expert technicians uses advanced diagnostic tools and state-of-the-art
                equipment to ensure your vehicle receives the best care possible.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contactSection}>
          <LinearGradient
            colors={[COLORS.darkGray, COLORS.dark]}
            style={styles.contactGradient}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.accentLine} />
                <Text style={styles.sectionTitle}>GET IN TOUCH</Text>
              </View>
              <Text style={styles.sectionSubtitle}>
                Visit us or reach out for expert automotive service
              </Text>
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
                  <Phone size={24} color={COLORS.secondary} strokeWidth={2.5} />
                </View>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>+27 76 268 3721</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.contactCard,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleLocation}
              >
                <View style={styles.contactIconContainer}>
                  <MapPin size={24} color={COLORS.secondary} strokeWidth={2.5} />
                </View>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>15 Liebenberg Street{'\n'}Swartruggens</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Hardings Auto Garage. All rights reserved.
          </Text>
          <Text style={styles.footerSubtext}>
            Precision Engineering • Performance Tuning • Customer Excellence
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    minHeight: SCREEN_HEIGHT * 0.85,
    paddingHorizontal: 20,
    paddingBottom: 60,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: SCREEN_WIDTH * 0.8,
    height: 200,
  },
  heroContent: {
    alignItems: 'center',
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.secondary,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accent,
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 15,
  },
  heroDescription: {
    fontSize: 16,
    color: COLORS.lightGray,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 40,
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
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 10,
    shadowColor: COLORS.secondary,
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
    borderColor: COLORS.secondary,
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
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '700',
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
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.lightGray,
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
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 15,
  },
  accentLine: {
    width: 4,
    height: 32,
    backgroundColor: COLORS.secondary,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.lightGray,
    marginLeft: 19,
    lineHeight: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  serviceCard: {
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
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 13,
    color: COLORS.lightGray,
    lineHeight: 20,
  },
  serviceCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 40,
    backgroundColor: COLORS.secondary,
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
    fontWeight: '800',
    color: COLORS.secondary,
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: COLORS.darkGray,
  },
  aboutContent: {
    maxWidth: 600,
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.lightGray,
    lineHeight: 26,
    marginBottom: 20,
    marginLeft: 19,
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
    backgroundColor: COLORS.metallic,
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
    color: COLORS.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLORS.dark,
    borderTopWidth: 1,
    borderTopColor: 'rgba(100, 116, 139, 0.2)',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.lightGray,
    opacity: 0.6,
    textAlign: 'center',
  },
});
