import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";


export default function useShoppingItemsFromList(listId: number) {
    
    const [items, setItems] = useState<ShoppingItem[]>([])
    
    const repository = useRepository()

    const fetchItems = async () => {
        setItems(await repository.getShoppingItemsFromShoppingList(listId))
    }

    useEffect(() => repository.onChange((table) => {
        if (table !== "shopping_items") return;
        fetchItems()
    }))

    useFocusEffect(() => { fetchItems() })

    return items
}