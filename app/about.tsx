import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

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

      <Link href="/" style={styles.link}>
        Back to tasks
      </Link>
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
  link: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#2f241b",
    color: "#fbf5eb",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default About;
