import { useRepository } from "@/context/repository-context";
import useShopitoColors from "@/hooks/useShopitoColors";
import { extractLastAmount } from "@/lib/extract-last-amount";
import { cn } from "@/utils/cn";
import * as Haptics from 'expo-haptics';
import { LucideArrowUp } from "lucide-react-native";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Icon from "./Icon";


interface QuickAddProps {
    listId: number,
    onAdd?: () => void
}


const QuickAdd = ({ listId, onAdd }: QuickAddProps) => {

    const colors = useShopitoColors()
    const repository = useRepository()

    const [value, setValue] = useState("");

    const isEnabled = value.length > 0

    const createItem = async () => {
        if (!isEnabled) {
            return
        }
        const { name, amount } = extractLastAmount(value)
        await repository.addItemToShoppingList(listId,{
            name: name,
            amount: amount,
            checked: false
        })
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        if (onAdd) {
            onAdd()
        }
        setValue("")
    }

    return (
        <KeyboardAvoidingView
            behavior={"padding"}
            keyboardVerticalOffset={100}
        >
            <View className="px-4 py-8 gap-4">
                <View className="border-b-2 border-background-secondary rounded-full"/>
                <View className="flex-row items-center gap-4">
                    <TextInput
                        className="flex-1 h-auto text-lg text-text-primary"
                        placeholderTextColor={colors.textSecondary}
                        value={value}
                        onChangeText={setValue}
                        cursorColor={colors.primary}
                        selectionHandleColor={colors.primary}
                        placeholder="Add new item..."
                        returnKeyType="send"
                        onSubmitEditing={createItem}
                        submitBehavior="submit"
                    />
                    <View
                        className={cn(
                            "size-12 rounded-full items-center justify-center",
                            {
                                "bg-primary": isEnabled,
                                "bg-background-secondary": !isEnabled
                            }
                        )}
                        onTouchStart={createItem}
                    >
                        <Icon icon={LucideArrowUp} className="text-text-primary"/>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuickAdd;
