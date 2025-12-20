import { ShopitoThemeColors } from "@/constants/Theme";
import { useRepository } from "@/context/repository-context";
import useTheme from "@/hooks/useTheme";
import { extractLastAmount } from "@/lib/extract-last-amount";
import * as Haptics from 'expo-haptics';
import { LucideArrowUp } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';


interface QuickAddProps {
    listId: number,
    onAdd?: () => void
}


const QuickAdd = ({ listId, onAdd }: QuickAddProps) => {

    const theme = useTheme()
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
            amount: amount
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
            <View style={{...styles.container, backgroundColor: theme.backgroundPrimary}}>
                <View
                    style={{
                        borderBottomColor: theme.backgroundSecondary,
                        borderBottomWidth: 2,
                        borderRadius: 2
                    }}
                />
                <View style={styles.textContainer}>
                    <TextInput
                        style={{...styles.textInput, color: theme.textPrimary}}
                        placeholderTextColor={theme.textSecondary}
                        value={value}
                        onChangeText={setValue}
                        cursorColor={theme.primary}
                        selectionHandleColor={theme.primary}
                        placeholder="Add new item..."
                    />
                    <View 
                        style={{...styles.sendButton, backgroundColor: isEnabled ? theme.primary : theme.backgroundSecondary}}
                        onTouchStart={createItem}
                    >
                        <LucideArrowUp color={ShopitoThemeColors.dark.textPrimary}/>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        gap: 16
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16
    },
    textInput: {
        flexGrow: 1,
        height: "auto",
        fontSize: 16
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default QuickAdd;
