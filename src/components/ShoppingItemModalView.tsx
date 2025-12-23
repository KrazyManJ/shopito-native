import { useRepository } from '@/context/repository-context'
import useShopitoColors from '@/hooks/useShopitoColors'
import ShoppingItem from '@/model/ShoppingItem'
import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'
import { LucideTrash2 } from 'lucide-react-native'
import { cssInterop } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { View } from "react-native"
import Button from './Button'


interface ShoppingItemModalViewProps {
    id: number
    onHideRequest: () => void
}


cssInterop(BottomSheetView, {className: "style"})


const ShoppingItemModalView = ({id, onHideRequest} : ShoppingItemModalViewProps) => {

    const [item, setItem] = useState<ShoppingItem>({
        name: "",
        amount: 0,
        checked: false
    })

    const repository = useRepository()
    const colors = useShopitoColors()

    useEffect(() => {(async () => {
        const it = await repository.getShoppingItemById(id);
        if (it) setItem(it)
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

    return (
        <BottomSheetView className='flex-1 px-4 py-8'>
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
                <View className='flex-1'></View>
                <Button
                    text='Save Item'
                    onPress={saveItem}
                />
            </View>
        </BottomSheetView>
    )
}

export default ShoppingItemModalView