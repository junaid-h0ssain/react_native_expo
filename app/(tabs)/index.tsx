import useTheme from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const { toggleTheme } = useTheme();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Index</Text>
            <TouchableOpacity onPress={toggleTheme}>
                <Text>Toggle Theme</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Index;
