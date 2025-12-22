import { LucidePlus } from "lucide-react-native";
import { Text, View } from "react-native";
import Icon from "./Icon";


const AddNewShoppingListRow = () => {
    return <View className="flex-1 border-4 items-center p-2 rounded-2xl border-text-secondary border-dashed mb-4">
        <Icon icon={LucidePlus} className="text-text-secondary size-12"/>
        <Text className="text-text-secondary">Create new list</Text>
    </View>
};


export default AddNewShoppingListRow;
