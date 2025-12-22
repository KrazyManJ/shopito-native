import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

export default function useShopitoColors() {
    const { colorScheme } = useColorScheme()
    
    return Colors[colorScheme ?? "dark"]
}