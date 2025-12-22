import { useShoppingItemModalContext } from "@/context/shopping-item-modal-context";
import ShoppingItem from "@/model/ShoppingItem";
import React from "react";
import { Pressable, Text, View } from "react-native";

export interface ShoppingItemRowProps {
    item: ShoppingItem;
    onCheck?: (value: boolean) => void;
}

const ShoppingItemRow = ({ item, onCheck }: ShoppingItemRowProps) => {

    const { show } = useShoppingItemModalContext()

    const handlePress = () => {
        if (item.id) {
            show(item.id)
        }
    }

    return (
        <Pressable onPress={handlePress}>
            <View className="flex-row px-8 py-2">
                <Text className="flex-1 text-xl text-text-primary">{item.name}</Text>
                <Text className="text-xl text-text-primary">{item.amount}</Text>
            </View>
        </Pressable>
    );
};

export default ShoppingItemRow;
