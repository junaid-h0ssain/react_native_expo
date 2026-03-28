import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 0,
                    height: 80,
                    paddingBottom: 24,
                    paddingTop: 12,
                    shadowColor: colors.shadow,
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 12,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "700",
                    letterSpacing: 0.3,
                },
                tabBarIconStyle: {
                    marginBottom: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Todos",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list-sharp" size={size + 2} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-sharp" size={size + 2} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
