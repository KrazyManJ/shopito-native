import AddNewShoppingListRow from "@/components/AddNewShoppingListRow";
import ShoppingListRow from "@/components/ShoppingListRow";
import { useRepository } from "@/context/repository-context";
import ShoppingList from "@/model/ShoppingList";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Tab() {

    const repository = useRepository()

    const [lists, setItems] = useState<ShoppingList[]>([])

    useEffect(() => {
        if (!repository) return

        const getItems = async () => setItems(await repository.getAllShoppingLists()) 

        getItems()
    }, [repository])

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