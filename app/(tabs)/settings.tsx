import { createSettingsStyles } from "@/assets/styles/settings";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

const Settings = () => {

    const { toggleTheme, colors } = useTheme();
    const styles = createSettingsStyles(colors);
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.title}>Settings</Text>
        </View>
    );
};

export default Settings;
