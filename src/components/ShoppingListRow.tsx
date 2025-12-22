import ShoppingList from "@/model/ShoppingList";
import { useRouter } from "expo-router";
import { LucideListTodo } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";

interface ShoppingListRowProps {
    list: ShoppingList;
}

const ShoppingListRow = ({ list }: ShoppingListRowProps) => {
    const router = useRouter();

    return (
        <View
            className="flex-1 flex-row gap-4 p-4 rounded-2xl items-center bg-background-secondary"
            onTouchStart={() => {
                router.navigate({
                    pathname: "/shopping_list/[id]",
                    params: { id: list.id ?? -1 }
                })
            }}
        >
            <Icon icon={LucideListTodo} className="size-10 text-text-primary"/>
            <View className="gap-1">
                <Text className="text-xl font-medium text-text-primary">{list.name}</Text>
                <Text className="text-text-secondary">
                    {list.description.length === 0
                        ? "No description provided"
                        : list.description}
                </Text>
            </View>
        </View>
    );
};

export default ShoppingListRow;
