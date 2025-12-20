import "../global.css";

import { RepositoryProvider } from "@/context/repository-context";
import useTheme from "@/hooks/useTheme";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { setBackgroundColorAsync } from 'expo-system-ui';
import React, { useEffect } from "react";

import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const theme = useTheme()

    const themeInstance = colorScheme === "dark" ? DarkTheme : DefaultTheme

    const ShopitoTheme: Theme = {
        ...themeInstance,
        colors: {
            ...themeInstance.colors,
            primary: theme.primary,
            background: theme.backgroundPrimary,
            text: theme.textPrimary,
            card: theme.backgroundPrimary,
            border: theme.textSecondary
        }
    }

    useEffect(() => {
        setBackgroundColorAsync(ShopitoTheme.colors.background);
    }, [ShopitoTheme.colors.background]);
    
    return (
        <ThemeProvider value={ShopitoTheme}>
            <KeyboardProvider>
                <RepositoryProvider>
                    <Stack screenOptions={{contentStyle: { backgroundColor: ShopitoTheme.colors.background }}}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="shopping_list/[id]" />
                    </Stack>
                </RepositoryProvider>
            </KeyboardProvider>
        </ThemeProvider>
    );
}
