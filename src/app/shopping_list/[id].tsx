import QuickAdd from "@/components/QuickAdd";
import ShoppingItemRow from "@/components/ShoppingItemRow";
import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import ShoppingList from "@/model/ShoppingList";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";


export default function ShoppingListScreen() {
    const { id: idString } = useLocalSearchParams<{id: string}>();

    const flatListRef = useRef<FlatList<ShoppingItem>>(null);

    const repository = useRepository()

    const [list, setList] = useState<ShoppingList | null>(null)
    const [items, setItems] = useState<ShoppingItem[]>([])
    const [isScroll, setIsScroll] = useState<boolean>()

    useEffect(() => {
        if (!isScroll) return;

        flatListRef.current?.scrollToEnd({ animated: true });

        setIsScroll(false)
    }, [isScroll])
    
    const fetchItems = async () => {
        setItems(await repository.getShoppingItemsFromShoppingList(parseInt(idString))) 
    }

    const fetchItemsWithScroll = async () => {
        fetchItems()
        setIsScroll(true)
    }

    useFocusEffect(() => {
        if (!repository) return

        (async () => {
            const id = parseInt(idString)

            const list = await repository.getShoppingListById(id)

            if (!list) {
                return
            }
            setList(list)
            fetchItems()
        })()
    })

    return <View style={{flex: 1}}>
        <Stack.Screen 
            options={{
                headerShadowVisible: false,
                title: list?.name ?? "Loading..." 
            }} 
        />
        <FlatList
            ref={flatListRef}
            data={items}
            renderItem={({item}) => <ShoppingItemRow item={item} onUpdate={fetchItems}/>}
            keyExtractor={item => `${item.id}`}
        />
        <QuickAdd 
            listId={parseInt(idString)}
            onAdd={fetchItemsWithScroll}
        />
    </View>
}