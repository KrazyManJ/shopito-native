import useTheme from "@/hooks/useTheme";
import ShoppingList from "@/model/ShoppingList";
import { useRouter } from "expo-router";
import { LucideListTodo } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface ShoppingListRowProps {
    list: ShoppingList;
}

const ShoppingListRow = ({ list }: ShoppingListRowProps) => {
    const router = useRouter();

    const theme = useTheme();

    const backgroundColor = theme.backgroundSecondary;

    return (
        <View 
            style={{ ...styles.container, backgroundColor }}
            onTouchStart={() => {
                router.navigate({
                    pathname: "/shopping_list/[id]",
                    params: { id: list.id ?? -1 }
                })
            }}
        >
            <LucideListTodo size={32} color={theme.textPrimary}/>
            <View style={styles.textContainer}>
                <Text style={{...styles.title, color: theme.textPrimary}}>{list.name}</Text>
                <Text style={{color: theme.textSecondary}}>
                    {list.description.length === 0
                        ? "No description provided"
                        : list.description}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 16,
        padding: 16,
        borderRadius: 16,
        alignItems: "center"
    },
    textContainer: {
        gap: 4
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    description: {

    }
});

export default ShoppingListRow;
