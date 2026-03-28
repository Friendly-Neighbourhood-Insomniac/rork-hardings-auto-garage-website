import { Text, TextProps, StyleSheet } from 'react-native';

type TVariant = 'normal' | 'heading';

export function StyledText(props: TextProps & { variant?: TVariant }) {
  const { variant = 'normal', ...rest } = props;
  const fontFamily = variant === 'heading' ? 'Poppins_700Bold' : 'Roboto_400Regular';

  return <Text {...rest} style={[styles.text, { fontFamily }, props.style]} />;
}

const styles = StyleSheet.create({
  text: {
    color: '#E2E8F0',
  },
});