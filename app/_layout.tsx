import useTheme from "@/hooks/useTheme";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

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
    
    return (
        <ThemeProvider value={ShopitoTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
