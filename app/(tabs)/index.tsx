import { createHomeStyles } from "@/assets/styles/home";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpiiner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;
const Index = () => {
    const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
    const [editText, setEditText] = useState("");

    const { toggleTheme, colors } = useTheme();
    const styles = createHomeStyles(colors);

    const todos = useQuery(api.todos.getTodos);
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const updateTodo = useMutation(api.todos.updateTodo);

    const isLoading = todos === undefined;

    if (isLoading) return <LoadingSpinner />;

    const handleToggleTodo = async (id: Id<"todos">) => {
        try {
            await toggleTodo({ id });
        } catch (error) {
            console.log("Error toggling todo", error);
            Alert.alert("Error", "Failed to toggle todo");
        }
    };

    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteTodo({ id }),
                },
            ],
        );
    };

    const handleEditTodo = (todo: Todo) => {
        setEditText(todo.title);
        setEditingId(todo._id);
    };

    const handleSaveEdit = async () => {
        if (editingId) {
            try {
                await updateTodo({ id: editingId, title: editText.trim() });
                setEditingId(null);
                setEditText("");
            } catch (error) {
                console.log("Error updating todo", error);
                Alert.alert("Error", "Failed to update todo");
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const renderTodoItem = ({ item }: { item: Todo }) => {
        const isEditing = editingId === item._id;
        return (
            <View style={styles.todoItemWrapper}>
                <LinearGradient
                    colors={colors.gradients.surface}
                    style={styles.todoItem}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <TouchableOpacity
                        style={styles.checkbox}
                        activeOpacity={0.7}
                        onPress={() => handleToggleTodo(item._id)}
                    >
                        <LinearGradient
                            colors={
                                item.completed
                                    ? colors.gradients.success
                                    : colors.gradients.muted
                            }
                            style={[
                                styles.checkboxInner,
                                {
                                    borderColor: item.completed
                                        ? "transparent"
                                        : colors.border,
                                },
                            ]}
                        >
                            {item.completed && (
                                <Ionicons
                                    name="checkmark"
                                    size={18}
                                    color="#fff"
                                />
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    {isEditing ? (
                        <View style={styles.editContainer}>
                            <TextInput
                                style={styles.editInput}
                                value={editText}
                                onChangeText={setEditText}
                                autoFocus
                                multiline
                                placeholder="Edit your todo..."
                                placeholderTextColor={colors.textMuted}
                            />
                            <View style={styles.editButtons}>
                                <TouchableOpacity
                                    onPress={handleSaveEdit}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.success}
                                        style={styles.editButton}
                                    >
                                        <Ionicons
                                            name="checkmark"
                                            size={16}
                                            color="#fff"
                                        />
                                        <Text style={styles.editButtonText}>
                                            Save
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleCancelEdit}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.muted}
                                        style={styles.editButton}
                                    >
                                        <Ionicons
                                            name="close"
                                            size={16}
                                            color="#fff"
                                        />
                                        <Text style={styles.editButtonText}>
                                            Cancel
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.todoTextContainer}>
                            <Text
                                style={[
                                    styles.todoText,
                                    item.completed && {
                                        textDecorationLine: "line-through",
                                        color: colors.textMuted,
                                        opacity: 0.6,
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>

                            <View style={styles.todoActions}>
                                <TouchableOpacity
                                    onPress={() => handleEditTodo(item)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.warning}
                                        style={styles.actionButton}
                                    >
                                        <Ionicons
                                            name="pencil"
                                            size={14}
                                            color="#fff"
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleDeleteTodo(item._id)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={colors.gradients.danger}
                                        style={styles.actionButton}
                                    >
                                        <Ionicons
                                            name="trash"
                                            size={14}
                                            color="#fff"
                                        />
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </LinearGradient>
            </View>
        );
    };

    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={styles.container}
        >
            <StatusBar barStyle={colors.statusBarStyle} />
            <SafeAreaView style={styles.container}>
                <Header />
                <TodoInput />
                <FlatList
                    data={todos}
                    renderItem={renderTodoItem}
                    keyExtractor={(item) => item._id}
                    style={styles.todoList}
                    contentContainerStyle={styles.todoListContent}
                    ListEmptyComponent={<EmptyState />}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Index;
