import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: ColorScheme) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        safeArea: {
            flex: 1,
            backgroundColor: colors.bg,
        },
        header: {
            paddingHorizontal: 20,
            paddingTop: 24,
            paddingBottom: 28,
            backgroundColor: colors.bg,
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: 64,
            height: 64,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
        },
        title: {
            fontSize: 36,
            fontWeight: "800",
            letterSpacing: -0.5,
            color: colors.text,
        },
        scrollView: {
            flex: 1,
        },
        content: {
            paddingHorizontal: 20,
            gap: 18,
            paddingBottom: 120,
        },
        section: {
            borderRadius: 18,
            padding: 22,
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "800",
            marginBottom: 18,
            letterSpacing: -0.3,
            color: colors.text,
        },
        sectionTitleDanger: {
            fontSize: 18,
            fontWeight: "800",
            marginBottom: 18,
            letterSpacing: -0.3,
            color: colors.danger,
        },
        statsContainer: {
            gap: 14,
        },
        statCard: {
            flexDirection: "row",
            alignItems: "center",
            padding: 18,
            borderRadius: 14,
            borderLeftWidth: 4,
            backgroundColor: colors.bg,
        },
        statIconContainer: {
            marginRight: 16,
        },
        statIcon: {
            width: 44,
            height: 44,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
        },
        statNumber: {
            fontSize: 26,
            fontWeight: "800",
            letterSpacing: -0.5,
            color: colors.text,
        },
        statLabel: {
            fontSize: 13,
            fontWeight: "600",
            marginTop: 4,
            color: colors.textMuted,
            letterSpacing: 0.2,
        },
        settingItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        settingLeft: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        settingIcon: {
            width: 40,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
        },
        settingText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
            letterSpacing: 0.2,
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 18,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        actionLeft: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        actionIcon: {
            width: 40,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
        },
        actionText: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
            letterSpacing: 0.2,
        },
        actionTextDanger: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.danger,
            letterSpacing: 0.2,
        },
    });

    return styles;
};
