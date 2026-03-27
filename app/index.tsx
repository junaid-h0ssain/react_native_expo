import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Todo = {
  id: string;
  task: string;
  createdAt: string;
  status: "active" | "done";
};

type StoredTodo = Partial<Todo> & {
  title?: unknown;
  completed?: unknown;
};

type Filter = "all" | "active" | "done";

const initialTodos: Todo[] = [];
const TODOS_STORAGE_KEY = "@expo-todo/todos";

const createTodoId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatCreatedAt = (value: string) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const filterOptions: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [draftTitle, setDraftTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [hasLoadedTodos, setHasLoadedTodos] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const storedTodos = await AsyncStorage.getItem(TODOS_STORAGE_KEY);

        if (!storedTodos) {
          return;
        }

        const parsedTodos = JSON.parse(storedTodos) as unknown;

        if (!Array.isArray(parsedTodos)) {
          return;
        }

        const normalizedTodos = parsedTodos
          .map((item) => {
            if (!item || typeof item !== "object") {
              return null;
            }

            const todo = item as StoredTodo;
            const normalizedTask =
              typeof todo.task === "string"
                ? todo.task.trim()
                : typeof todo.title === "string"
                  ? todo.title.trim()
                  : "";

            if (!normalizedTask) {
              return null;
            }

            const normalizedStatus =
              todo.status === "done" || todo.completed === true
                ? "done"
                : "active";

            return {
              id:
                typeof todo.id === "string" && todo.id
                  ? todo.id
                  : createTodoId(),
              task: normalizedTask,
              createdAt:
                typeof todo.createdAt === "string" && todo.createdAt
                  ? todo.createdAt
                  : new Date().toISOString(),
              status: normalizedStatus,
            } satisfies Todo;
          })
          .filter((todo): todo is Todo => todo !== null);

        setTodos(normalizedTodos);
      } catch {
        setTodos(initialTodos);
      } finally {
        setHasLoadedTodos(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hasLoadedTodos) {
      return;
    }

    void AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [hasLoadedTodos, todos]);

  const remainingCount = todos.filter((todo) => todo.status !== "done").length;
  const completedCount = todos.length - remainingCount;

  let visibleTodos = todos;

  if (filter === "active") {
    visibleTodos = todos.filter((todo) => todo.status !== "done");
  } else if (filter === "done") {
    visibleTodos = todos.filter((todo) => todo.status === "done");
  }

  const addTodo = () => {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos((currentTodos) => [
      {
        id: createTodoId(),
        task: trimmedTitle,
        createdAt: new Date().toISOString(),
        status: "active",
      },
      ...currentTodos,
    ]);
    setDraftTitle("");
  };

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "done" ? "active" : "done",
            }
          : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.backdropOne} />
      <View style={styles.backdropTwo} />

      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.kicker}>Daily focus</Text>
          <Text style={styles.title}>Todo list</Text>
          <Text style={styles.subtitle}>
            Keep the day light. Add a task, check it off, and keep momentum.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/about")}
            style={({ pressed }) => [
              styles.heroButton,
              pressed && styles.heroButtonPressed,
            ]}
          >
            <Text style={styles.heroButtonText}>About this app</Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{todos.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{remainingCount}</Text>
            <Text style={styles.statLabel}>Left</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
        </View>

        <View style={styles.inputCard}>
          <TextInput
            placeholder="Add a new task"
            placeholderTextColor="#8d806f"
            style={styles.input}
            value={draftTitle}
            onChangeText={setDraftTitle}
            onSubmitEditing={addTodo}
            returnKeyType="done"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task"
            onPress={addTodo}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Ionicons name="add" size={22} color="#fbf5eb" />
          </Pressable>
        </View>

        <View style={styles.filterRow}>
          {filterOptions.map((option) => {
            const isSelected = filter === option.key;

            return (
              <Pressable
                key={option.key}
                accessibilityRole="button"
                onPress={() => setFilter(option.key)}
                style={({ pressed }) => [
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                  pressed && styles.pressedChip,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.listCard}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Tasks</Text>
          </View>

          <FlatList
            data={visibleTodos}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              styles.todoList,
              visibleTodos.length === 0 && styles.todoListEmpty,
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Ionicons name="leaf" size={24} color="#8d806f" />
                </View>
                <Text style={styles.emptyTitle}>Nothing here yet</Text>
                <Text style={styles.emptyText}>
                  Try adding a task or switch filters to see another part of
                  your list.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.todoRow}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    item.status === "done"
                      ? `Mark ${item.task} as active`
                      : `Mark ${item.task} as done`
                  }
                  onPress={() => toggleTodo(item.id)}
                  style={({ pressed }) => [
                    styles.todoToggle,
                    item.status === "done" && styles.todoToggleCompleted,
                    pressed && styles.pressedToggle,
                  ]}
                >
                  {item.status === "done" ? (
                    <Ionicons name="checkmark" size={14} color="#fbf5eb" />
                  ) : null}
                </Pressable>

                <View style={styles.todoTextWrap}>
                  <Text
                    style={[
                      styles.todoTitle,
                      item.status === "done" && styles.todoTitleCompleted,
                    ]}
                  >
                    {item.task}
                  </Text>
                  <Text style={styles.todoMeta}>
                    {item.status === "done" ? "Completed" : "In progress"} -
                    Added {formatCreatedAt(item.createdAt)}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${item.task}`}
                  onPress={() => deleteTodo(item.id)}
                  style={({ pressed }) => [
                    styles.deleteButton,
                    pressed && styles.pressedDelete,
                  ]}
                >
                  <Ionicons name="trash-outline" size={18} color="#8f5b46" />
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3eadb",
  },
  backdropOne: {
    position: "absolute",
    top: -110,
    right: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(144, 114, 81, 0.14)",
  },
  backdropTwo: {
    position: "absolute",
    left: -100,
    top: 180,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(143, 91, 70, 0.14)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 72,
    paddingBottom: 18,
    gap: 16,
  },
  hero: {
    gap: 8,
  },
  kicker: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#8f5b46",
  },
  title: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: "800",
    color: "#2f241b",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#6f5d49",
    maxWidth: 340,
  },
  heroButton: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#2f241b",
  },
  heroButtonPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.98 }],
  },
  heroButtonText: {
    color: "#fbf5eb",
    fontSize: 15,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(251, 245, 235, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(143, 91, 70, 0.12)",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2f241b",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#7d6b58",
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#f8f2e6",
    borderWidth: 1,
    borderColor: "rgba(143, 91, 70, 0.14)",
    shadowColor: "#7a5e46",
    shadowOpacity: 0.07,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2f241b",
    paddingVertical: 8,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#8f5b46",
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  filterRow: {
    flexDirection: "row",
    gap: 10,
  },
  filterChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(251, 245, 235, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(143, 91, 70, 0.12)",
  },
  filterChipSelected: {
    backgroundColor: "#2f241b",
    borderColor: "#2f241b",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6f5d49",
  },
  filterTextSelected: {
    color: "#fbf5eb",
  },
  pressedChip: {
    opacity: 0.85,
  },
  listCard: {
    flex: 1,
    padding: 16,
    borderRadius: 28,
    backgroundColor: "rgba(251, 245, 235, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(143, 91, 70, 0.12)",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2f241b",
  },
  todoList: {
    gap: 12,
    paddingBottom: 8,
  },
  todoListEmpty: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(143, 91, 70, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2f241b",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    color: "#6f5d49",
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#f8f2e6",
    borderWidth: 1,
    borderColor: "rgba(143, 91, 70, 0.1)",
  },
  todoToggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#b7aa99",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbf5eb",
  },
  todoToggleCompleted: {
    borderColor: "#8f5b46",
    backgroundColor: "#8f5b46",
  },
  pressedToggle: {
    opacity: 0.85,
  },
  todoTextWrap: {
    flex: 1,
    gap: 3,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2f241b",
  },
  todoTitleCompleted: {
    color: "#9a8d7b",
    textDecorationLine: "line-through",
  },
  todoMeta: {
    fontSize: 13,
    color: "#7d6b58",
  },
  deleteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(143, 91, 70, 0.08)",
  },
  pressedDelete: {
    opacity: 0.8,
  },
});
