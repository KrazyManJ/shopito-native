import { useRepository } from '@/context/repository-context'
import ShoppingItem from '@/model/ShoppingItem'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { cssInterop } from 'nativewind'
import { useEffect, useState } from 'react'
import { Text } from "react-native"


interface ShoppingItemModalViewProps {
    id: number
}

const ShoppingItemModalView = ({id} : ShoppingItemModalViewProps) => {

    const [item, setItem] = useState<ShoppingItem | null>(null)

    const repository = useRepository()

    useEffect(() => {
        (async () => setItem(await repository.getShoppingItemById(id)))()
    }, [id, repository])

    cssInterop(BottomSheetView, {className: "style"})

    return (
        <BottomSheetView className='flex-1 p-4'>
            <Text>Item ID: {id}</Text>
        </BottomSheetView>
    )
}

export default ShoppingItemModalView