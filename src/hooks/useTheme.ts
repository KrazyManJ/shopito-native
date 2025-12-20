import { ShopitoColors, ShopitoThemeColors } from "@/constants/Theme";
import { useColorScheme } from "react-native";


export default function useTheme() : ShopitoColors {
    const colorScheme = useColorScheme()

    return ShopitoThemeColors[colorScheme ?? "light"]
}