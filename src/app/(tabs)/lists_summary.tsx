import ShoppingItemRow from "@/components/ShoppingItemRow";
import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Tab() {

    const repository = useRepository()

    const [items, setItems] = useState<ShoppingItem[]>([])
    

    const updateItems = useCallback(async () => {
        setItems(await repository.getAllShoppingItems())
    }, [repository])

    useFocusEffect(() => { updateItems() })

    return <View className="p-8">
        <FlatList
            data={items}
            renderItem={({item}) => <ShoppingItemRow item={item} onUpdate={updateItems}/>}
            keyExtractor={item => `${item.id}`}
        />
    </View>;
}
