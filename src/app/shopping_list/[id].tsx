import QuickAdd from "@/components/QuickAdd";
import ShoppingItemRow from "@/components/ShoppingItemRow";
import { useRepository } from "@/context/repository-context";
import useShoppingItemsFromList from "@/hooks/useShoppingItemsFromList";
import ShoppingItem from "@/model/ShoppingItem";
import ShoppingList from "@/model/ShoppingList";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";


export default function ShoppingListScreen() {
    const { id: idString } = useLocalSearchParams<{id: string}>();
    const id = parseInt(idString)

    const flatListRef = useRef<FlatList<ShoppingItem>>(null);

    const repository = useRepository()

    const [list, setList] = useState<ShoppingList | null>(null)
    
    const items = useShoppingItemsFromList(id)

    const [isScroll, setIsScroll] = useState<boolean>()

    useEffect(() => {
        if (!isScroll) return;
        
        flatListRef.current?.scrollToEnd({ animated: true });
        
        setIsScroll(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items])

    useFocusEffect(() => {
        if (!repository) return

        (async () => {
            const list = await repository.getShoppingListById(id)

            if (!list) return
            
            setList(list)
        })()
    })

    return <View className="flex-1">
        <Stack.Screen 
            options={{
                headerShadowVisible: false,
                title: list?.name ?? "Loading..." 
            }} 
        />
        <FlatList
            className="px-4"
            ref={flatListRef}
            data={items}
            renderItem={({item}) => <ShoppingItemRow item={item}/>}
            keyExtractor={item => `${item.id}`}
        />
        <QuickAdd 
            listId={parseInt(idString)}
            onAdd={() => setIsScroll(true)}
        />
    </View>
}