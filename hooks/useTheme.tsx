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
    bg: "#faf8f5",
    surface: "#f4ede5",
    text: "#3d3530",
    textMuted: "#8b7f77",
    border: "#e8dfd5",
    primary: "#c86d4a",
    success: "#7fa86d",
    warning: "#d89f5a",
    danger: "#d66063",
    shadow: "#3d3530",
    gradients: {
        background: ["#faf8f5", "#f4ede5"],
        surface: ["#f4ede5", "#ead8c8"],
        primary: ["#c86d4a", "#a85a3f"],
        success: ["#7fa86d", "#6b9059"],
        warning: ["#d89f5a", "#c68c45"],
        danger: ["#d66063", "#b85052"],
        muted: ["#c4b5a0", "#b39f90"],
        empty: ["#e8dfd5", "#ddd1c4"],
    },
    backgrounds: {
        input: "#ffffff",
        editInput: "#f8f3ed",
    },
    statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
    bg: "#2a251f",
    surface: "#3d3530",
    text: "#f5f1ed",
    textMuted: "#b5aaa0",
    border: "#4d4540",
    primary: "#d98056",
    success: "#92c080",
    warning: "#e5b570",
    danger: "#e07073",
    shadow: "#000000",
    gradients: {
        background: ["#2a251f", "#3d3530"],
        surface: ["#3d3530", "#4d4540"],
        primary: ["#d98056", "#c85c42"],
        success: ["#92c080", "#7daa6b"],
        warning: ["#e5b570", "#d49959"],
        danger: ["#e07073", "#c85c5f"],
        muted: ["#5d5550", "#6a6058"],
        empty: ["#4d4540", "#5d5550"],
    },
    backgrounds: {
        input: "#2a251f",
        editInput: "#2a251f",
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
