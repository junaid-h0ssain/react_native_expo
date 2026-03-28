import useTheme, { ColorScheme } from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

const Index = () => {
    const { toggleTheme, colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.text}>Index</Text>
            <TouchableOpacity onPress={toggleTheme}>
                <Text style={styles.text}>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    );
};

const createStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.bg,
    },
    text: {
      color: colors.text,
    },
  });
  return styles;
};

export default Index;
