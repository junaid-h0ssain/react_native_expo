import { createHomeStyles } from "@/assets/styles/home";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

const Index = () => {
    const { toggleTheme, colors } = useTheme();
    const styles = createHomeStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.background} style={styles.container}>
          <StatusBar barStyle={colors.statusBarStyle} />
            <SafeAreaView style={styles.container}>
                <Header />
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={styles.loadingText}>Toggle Theme</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Index;
