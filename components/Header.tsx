import { createHomeStyles } from "@/assets/styles/home";
import { api } from "@/convex/_generated/api";
import  useTheme  from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
    const { colors } = useTheme();
    const styles = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos);

    const completedCount = todos?.filter((todo) => todo.completed).length || 0;
    const totalCount = todos?.length || 0;

    const progress = totalCount > 0 ? completedCount / totalCount * 100 : 0;

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
                    <Ionicons name="checkmark-done" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.subtitle}>{completedCount} of {totalCount} completed</Text>
            </View>
        </View>
    );
};

export default Header;
