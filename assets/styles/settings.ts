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
            backgroundColor: "transparent",
        },
        header: {
            paddingHorizontal: 22,
            paddingTop: 14,
            paddingBottom: 20,
            backgroundColor: "transparent",
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: 56,
            height: 56,
            borderRadius: 18,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 4,
        },
        titleTextContainer: {
            flex: 1,
        },
        title: {
            fontSize: 32,
            fontWeight: "800",
            letterSpacing: -0.5,
            color: colors.text,
        },
        subtitle: {
            marginTop: 4,
            fontSize: 14,
            fontWeight: "500",
            color: colors.textMuted,
            letterSpacing: 0.2,
        },
        mainPanel: {
            flex: 1,
            marginHorizontal: 10,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            backgroundColor: colors.surface,
            overflow: "hidden",
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: -3,
            },
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 8,
        },
        scrollView: {
            flex: 1,
        },
        content: {
            paddingHorizontal: 18,
            paddingTop: 18,
            gap: 14,
            paddingBottom: 130,
        },
        section: {
            borderRadius: 16,
            padding: 18,
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
        },
        sectionTitle: {
            fontSize: 17,
            fontWeight: "800",
            marginBottom: 14,
            letterSpacing: -0.3,
            color: colors.text,
        },
        sectionTitleDanger: {
            fontSize: 17,
            fontWeight: "800",
            marginBottom: 14,
            letterSpacing: -0.3,
            color: colors.danger,
        },
        statsContainer: {
            gap: 10,
        },
        statCard: {
            flexDirection: "row",
            alignItems: "center",
            padding: 14,
            borderRadius: 12,
            borderLeftWidth: 4,
            backgroundColor: colors.bg,
        },
        statIconContainer: {
            marginRight: 12,
        },
        statIcon: {
            width: 40,
            height: 40,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        statNumber: {
            fontSize: 24,
            fontWeight: "800",
            letterSpacing: -0.5,
            color: colors.text,
        },
        statLabel: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 2,
            color: colors.textMuted,
            letterSpacing: 0.2,
        },
        settingItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        settingLeft: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        settingIcon: {
            width: 36,
            height: 36,
            borderRadius: 9,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
        },
        settingText: {
            fontSize: 15,
            fontWeight: "600",
            color: colors.text,
            letterSpacing: 0.2,
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        actionLeft: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
        },
        actionIcon: {
            width: 36,
            height: 36,
            borderRadius: 9,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
        },
        actionText: {
            fontSize: 15,
            fontWeight: "600",
            color: colors.text,
            letterSpacing: 0.2,
        },
        actionTextDanger: {
            fontSize: 15,
            fontWeight: "600",
            color: colors.danger,
            letterSpacing: 0.2,
        },
    });

    return styles;
};
