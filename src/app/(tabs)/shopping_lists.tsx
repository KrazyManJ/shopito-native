import AddNewShoppingListRow from "@/components/AddNewShoppingListRow";
import ShoppingListRow from "@/components/ShoppingListRow";
import { useRepository } from "@/context/repository-context";
import ShoppingList from "@/model/ShoppingList";
import { useFocusEffect } from "expo-router";
import { useState } from "react";
import { FlatList, View } from "react-native";

export default function Tab() {

    const repository = useRepository()

    const [lists, setItems] = useState<ShoppingList[]>([])

    useFocusEffect(() => {
        if (!repository) return

        const getItems = async () => setItems(await repository.getAllShoppingLists()) 

        getItems()
    })

    return <View className="p-4 flex">
        <FlatList
            data={lists}
            renderItem={({item}) => <ShoppingListRow list={item}/>}
            keyExtractor={list => `${list.id}`}
            ListHeaderComponent={ <AddNewShoppingListRow/> }
            ItemSeparatorComponent={() => <View style={{height: 16}} />}
        />
    </View>;
}