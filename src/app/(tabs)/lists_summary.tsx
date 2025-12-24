import ShoppingItemRow from "@/components/ShoppingItemRow";
import useShoppingItemsSummary from "@/hooks/useShoppingItemsSummary";
import { FlatList, View } from "react-native";

export default function Tab() {

    const items = useShoppingItemsSummary()

    return <View className="p-8">
        <FlatList
            data={items}
            renderItem={({item}) => <ShoppingItemRow item={item}/>}
            keyExtractor={item => `${item.id}`}
        />
    </View>;
}
