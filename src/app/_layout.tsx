import "@/global.css";

import { RepositoryProvider } from "@/context/repository-context";
import { Stack } from "expo-router";
import React from "react";

import ShopitoThemeProvider from "@/components/ShopitoThemeProvider";
import { ShoppingItemModalContextProvider } from "@/context/shopping-item-modal-context";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {    
    return (
        <ShopitoThemeProvider>
            <KeyboardProvider>
                <RepositoryProvider>
                    <ShoppingItemModalContextProvider>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="shopping_list/[id]" />
                        </Stack>
                    </ShoppingItemModalContextProvider>
                </RepositoryProvider>
            </KeyboardProvider>
        </ShopitoThemeProvider>
    );
}
