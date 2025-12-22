import "@/global.css";

import { RepositoryProvider } from "@/context/repository-context";
import { Stack } from "expo-router";
import React from "react";

import ShopitoThemeProvider from "@/components/ShopitoThemeProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {    
    return (
        <ShopitoThemeProvider>
            <KeyboardProvider>
                <RepositoryProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="shopping_list/[id]" />
                    </Stack>
                </RepositoryProvider>
            </KeyboardProvider>
        </ShopitoThemeProvider>
    );
}
