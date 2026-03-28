import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface ColorScheme {
    bg: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    shadow: string;
    gradients: {
        background: [string, string];
        surface: [string, string];
        primary: [string, string];
        success: [string, string];
        warning: [string, string];
        danger: [string, string];
        muted: [string, string];
        empty: [string, string];
    };
    backgrounds: {
        input: string;
        editInput: string;
    };
    statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
    bg: "#f6f1e8",
    surface: "#e8ddcb",
    text: "#2f2924",
    textMuted: "#6f655b",
    border: "#cdbca6",
    primary: "#a95f3c",
    success: "#5f8667",
    warning: "#bc8751",
    danger: "#ad4f46",
    shadow: "#2f2924",
    gradients: {
        background: ["#f6f1e8", "#e3d6c0"],
        surface: ["#efe5d7", "#d9c8b3"],
        primary: ["#b56b45", "#8f4d32"],
        success: ["#6e9875", "#51735a"],
        warning: ["#cb955b", "#a56f3f"],
        danger: ["#bf5c4f", "#954037"],
        muted: ["#b39d84", "#8f7c68"],
        empty: ["#ddd0bc", "#c8b59e"],
    },
    backgrounds: {
        input: "#fbf7f1",
        editInput: "#f1e7d8",
    },
    statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
    bg: "#1f1a17",
    surface: "#2f2823",
    text: "#f2e9dc",
    textMuted: "#b8a896",
    border: "#4a3d34",
    primary: "#d1895e",
    success: "#88b08e",
    warning: "#d7a36f",
    danger: "#d07469",
    shadow: "#000000",
    gradients: {
        background: ["#1f1a17", "#2f2823"],
        surface: ["#2f2823", "#3a312b"],
        primary: ["#d89a6f", "#b86d46"],
        success: ["#96c09c", "#6d9373"],
        warning: ["#ddb27c", "#bb8753"],
        danger: ["#dc877a", "#b35a50"],
        muted: ["#5c5047", "#756457"],
        empty: ["#4a3e35", "#5f5044"],
    },
    backgrounds: {
        input: "#2a231f",
        editInput: "#362d27",
    },
    statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
    isDarkMode: boolean;
    colors: ColorScheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("darkMode").then((value) => {
            if (value) setIsDarkMode(JSON.parse(value));
        });
    }, []);

    const toggleDarkMode = async () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    const colors = isDarkMode ? darkColors : lightColors;

    return (
        <ThemeContext.Provider
            value={{ isDarkMode, toggleTheme: toggleDarkMode, colors }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

const Theme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default Theme;
