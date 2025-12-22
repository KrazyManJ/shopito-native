import useShopitoColors from "@/hooks/useShopitoColors";
import colorsToVars from "@/lib/colors-to-vars";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme } from "nativewind";
import { ReactNode, useEffect, useMemo } from "react";
import { View } from "react-native";

interface ShopitoThemeProviderProps {
    children: ReactNode
}


const ShopitoThemeProvider = ({children}: ShopitoThemeProviderProps) => {
    
    const { colorScheme } = useColorScheme()

    const themeInstance = colorScheme === "dark" ? DarkTheme : DefaultTheme

    const colors = useShopitoColors()

    const ShopitoTheme: Theme = {
        ...themeInstance,
        colors: {
            ...themeInstance.colors,
            primary: colors.primary,
            background: colors.backgroundPrimary,
            text: colors.textPrimary,
            card: colors.backgroundPrimary,
            border: colors.textSecondary
        }
    }

    const varsStyles = useMemo(() => colorsToVars(colors), [colors])

    useEffect(() => {
        setBackgroundColorAsync(ShopitoTheme.colors.background);
    }, [ShopitoTheme.colors.background]);

    return (
        <ThemeProvider value={ShopitoTheme}>
            <View style={varsStyles} className="flex-1">
                {children}
            </View>
        </ThemeProvider>
    );
};

export default ShopitoThemeProvider;
