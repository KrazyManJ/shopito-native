import ShoppingItem from "@/model/ShoppingItem";
import React from "react";
import { Text, View } from "react-native";

export interface ShoppingItemRowProps {
    item: ShoppingItem;
    onCheck?: (value: boolean) => void;
}

const ShoppingItemRow = ({ item, onCheck }: ShoppingItemRowProps) => {
    return (
        <View className="flex-row px-8 py-2">
            <Text className="flex-1 text-xl text-text-primary">{item.name}</Text>
            <Text className="text-xl text-text-primary">{item.amount}</Text>
        </View>
    );
};

export default ShoppingItemRow;
