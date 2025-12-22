import { ShopitoColors } from "@/constants/Colors";
import useShopitoColors from "@/hooks/useShopitoColors";
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useColorScheme, vars } from "nativewind";
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

    const varsStyles = useMemo(() => {
        return Object.keys(colors).reduce<Record<string,string>>((acc, key) => {
            const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

            acc[`--color-${kebabKey}`] = colors[key as keyof ShopitoColors]

            return acc
        }, {})
    }, [colors])

    useEffect(() => {
        setBackgroundColorAsync(ShopitoTheme.colors.background);
    }, [ShopitoTheme.colors.background]);

    return (
        <ThemeProvider value={ShopitoTheme}>
            <View style={vars(varsStyles)} className="flex-1">
                {children}
            </View>
        </ThemeProvider>
    );
};

export default ShopitoThemeProvider;
