import { useRepository } from '@/context/repository-context'
import useShopitoColors from '@/hooks/useShopitoColors'
import ShoppingItem from '@/model/ShoppingItem'
import ShoppingList from '@/model/ShoppingList'
import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import { ChevronRight, LucideListTodo, LucideTrash2 } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from "react-native"
import Button from './Button'
import Icon from './Icon'


interface ShoppingItemModalViewProps {
    id: number
    showListNavigation?: boolean
    onHideRequest: () => void
}


cssInterop(BottomSheetView, {className: "style"})


const ShoppingItemModalView = ({id, onHideRequest, showListNavigation = false} : ShoppingItemModalViewProps) => {

    const [item, setItem] = useState<ShoppingItem>({
        name: "",
        amount: 0,
        checked: false
    })
    const [list, setList] = useState<ShoppingList>({
        name: "",
        description: ""
    })

    const repository = useRepository()
    const colors = useShopitoColors()
    const router = useRouter()

    useEffect(() => {(async () => {
        const it = await repository.getShoppingItemById(id);
        if (it) setItem(it)
        const list = await repository.getShoppingListById(it?.listId ?? 0)
        if (list) setList(list)
    })()}, [repository, id])

    const saveItem = async () => {
        repository.updateShoppingItem(item)
        onHideRequest()
    }
    
    const deleteItem = async () => {
        if (!item.id) return;
        repository.deleteShoppingItem(item.id)
        onHideRequest()
    }

    const navigateToListOfItem = () => {
        onHideRequest()
        router.navigate({
            pathname: "/shopping_list/[id]",
            params: { id: list.id ?? -1 }
        })
    }

    return (
        <BottomSheetView className='flex-1 px-4 py-8 gap-4'>
            { showListNavigation && 
                <Pressable onPress={navigateToListOfItem}>
                    <View className='flex-row items-center gap-1'>
                        <Icon icon={LucideListTodo} className='text-text-primary'/>
                        <Icon icon={ChevronRight} size={16} className='text-text-secondary'/>
                        <Text className='text-primary underline'>{list.name}</Text>
                    </View>
                </Pressable>
            }
            <BottomSheetTextInput 
                className="flex-1 h-auto text-4xl text-text-primary"
                placeholderTextColor={colors.textSecondary}
                value={item?.name}
                onChangeText={(val) => setItem(prev => ({...prev, name: val}))}
                cursorColor={colors.primary}
                selectionHandleColor={colors.primary}
                placeholder="Add new item..."
            />
            <View className='flex-row my-4'>
                <Button
                    text='Delete'
                    icon={LucideTrash2}
                    variant={"outlined"}
                    onPress={deleteItem}
                />
                <View className='flex-1'/>
                <Button
                    text='Save Item'
                    onPress={saveItem}
                />
            </View>
        </BottomSheetView>
    )
}

export default ShoppingItemModalView