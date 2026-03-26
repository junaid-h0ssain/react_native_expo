import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.kicker}>About this app</Text>
      <Text style={styles.title}>A small todo app with a calm feel.</Text>
      <Text style={styles.content}>
        Add tasks, toggle them as you go, and keep the list focused on what
        matters today.
      </Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Back to tasks</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f3eadb",
    gap: 12,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#8f5b46",
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
    color: "#2f241b",
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    color: "#6f5d49",
    maxWidth: 340,
  },
  button: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#2f241b",
  },
  buttonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fbf5eb",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default About;
