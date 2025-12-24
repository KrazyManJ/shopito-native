import { useRepository } from "@/context/repository-context";
import ShoppingItem from "@/model/ShoppingItem";
import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";


export default function useShoppingItemsSummary() {
    
    const [items, setItems] = useState<ShoppingItem[]>([])
    
    const repository = useRepository()

    const fetchItems = async () => setItems(await repository.getAllShoppingItems())
    
    useEffect(() => repository.onChange(fetchItems))

    useFocusEffect(() => { fetchItems() })

    return items
}