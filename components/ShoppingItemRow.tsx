import useTheme from "@/hooks/useTheme";
import ShoppingItem from "@/model/ShoppingItem";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface ShoppingItemRowProps {
    item: ShoppingItem;
}

const ShoppingItemRow = ({ item }: ShoppingItemRowProps) => {

    const theme = useTheme()

    const color = theme.textPrimary

    return (
        <View style={styles.item}>
            <Text style={{...styles.name, color}}>{item.name}</Text>
            <Text style={{...styles.amount, color}}>{item.amount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    name: {
        flex: 1,
        fontSize: 20,
    },
    amount: {
        fontSize: 20,
    }
});

export default ShoppingItemRow;
