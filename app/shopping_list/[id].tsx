import QuickAdd from "@/components/QuickAdd";
import ShoppingItemRow from "@/components/ShoppingItemRow";
import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import ShoppingList from "@/model/ShoppingList";
import { Stack, useLocalSearchParams } from "expo-router";
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
    
    const fetchItemsWithScroll = async () => {
        setItems(await repository.getShoppingItemsFromShoppingList(parseInt(idString)))
        setIsScroll(true)
    }

    const checkItem = async (value: boolean,item: ShoppingItem) => {
        if (!item.id) {
            return
        }
        await repository.changeItemCheckState(item.id, value)
        setItems(await repository.getShoppingItemsFromShoppingList(parseInt(idString))) 
    }

    useEffect(() => {
        if (!repository) return

        (async () => {
            const id = parseInt(idString)

            const list = await repository.getShoppingListById(id)

            if (!list) {
                return
            }
            setList(list)
            setItems(await repository.getShoppingItemsFromShoppingList(id)) 
        })()
    }, [repository, idString])

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
            renderItem={({item}) => <ShoppingItemRow item={item} onCheck={value => checkItem(value, item)}/>}
            keyExtractor={item => `${item.id}`}
        />
        <QuickAdd 
            listId={parseInt(idString)}
            onAdd={fetchItemsWithScroll}
        />
    </View>
}