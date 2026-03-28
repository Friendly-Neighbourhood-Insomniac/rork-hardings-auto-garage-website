const COLORS = {
  primary: '#1F4E79', // Steel Blue
  secondary: '#D62828', // Crimson Red
  dark: '#1a1a1a', // Charcoal/Matte Black
  darkGray: '#2C3E50', // Gunmetal Gray
  metallic: '#334155',
  lightGray: '#E2E8F0', // Silver/Light Gray
  white: '#ffffff',
  accent: '#F4A261', // Bright Amber
};

export default {
  light: {
    text: COLORS.white,
    background: COLORS.dark,
    tint: COLORS.primary,
    tabIconDefault: COLORS.lightGray,
    tabIconSelected: COLORS.primary,
  },
  dark: {
    text: COLORS.white,
    background: COLORS.dark,
    tint: COLORS.primary,
    tabIconDefault: COLORS.lightGray,
    tabIconSelected: COLORS.primary,
  },
  ...COLORS,
};