import useTheme from "@/hooks/useTheme";
import { LucidePlus } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";


const AddNewShoppingListRow = () => {

    const theme = useTheme()

    return <View style={{...styles.container, borderColor: theme.textSecondary}}>
        <LucidePlus color={theme.textSecondary} size={48}/>
        <Text style={{color: theme.textSecondary}}>Create new list</Text>
    </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 3,
        alignItems: "center",
        padding: 8,
        borderRadius: 16,
        borderStyle: "dashed",
        marginBottom: 16
    }
})

export default AddNewShoppingListRow;
