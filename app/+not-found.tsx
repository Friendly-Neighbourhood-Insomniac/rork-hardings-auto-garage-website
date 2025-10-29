import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const COLORS = {
  dark: '#0f172a',
  secondary: '#dc2626',
  lightGray: '#64748b',
  white: '#ffffff',
};

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Page Not Found</Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.dark,
  },
  title: {
    fontSize: 72,
    fontWeight: "800",
    color: COLORS.secondary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.white,
    marginBottom: 30,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
});
