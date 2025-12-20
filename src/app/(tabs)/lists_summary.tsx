import ShoppingItemRow from "@/components/ShoppingItemRow";
import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Tab() {

    const repository = useRepository()

    const [items, setItems] = useState<ShoppingItem[]>([])
    

    useEffect(() => {
        if (!repository) return

        const getItems = async () => setItems(await repository.getAllShoppingItems()) 

        getItems()
    }, [repository])

    return <View>
        <FlatList
            data={items}
            renderItem={({item}) => <ShoppingItemRow item={item}/>}
            keyExtractor={item => `${item.id}`}
        />
    </View>;
}
