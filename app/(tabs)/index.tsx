import { createHomeStyles } from "@/assets/styles/home";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpiiner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const { toggleTheme, colors } = useTheme();
    const styles = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const updateTodo = useMutation(api.todos.updateTodo);

    const isLoading = todos === undefined;

    if (isLoading) return <LoadingSpinner />;

    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={styles.container}
        >
            <StatusBar barStyle={colors.statusBarStyle} />
            <SafeAreaView style={styles.container}>
                <Header />
                <TodoInput />
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={styles.loadingText}>Toggle Theme</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Index;
