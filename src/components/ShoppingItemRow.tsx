import { useRepository } from "@/context/repository-context";
import { useShoppingItemModalContext } from "@/context/shopping-item-modal-context";
import useShopitoColors from "@/hooks/useShopitoColors";
import ShoppingItem from "@/model/ShoppingItem";
import { cn } from "@/utils/cn";
import { LucideCheck, LucideTrash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import Icon from "./Icon";

export interface ShoppingItemRowProps {
    item: ShoppingItem;
    onUpdate?: () => void;
}

const ShoppingItemRow = ({ item, onUpdate }: ShoppingItemRowProps) => {

    const { show } = useShoppingItemModalContext()

    const repository = useRepository()

    const colors = useShopitoColors()

    const handlePress = () => {
        if (item.id) {
            show(item.id, onUpdate)
        }
    }

    const handleCheck = (state: boolean) => {
        (async () => {
            if (!item.id) return;
            await repository.changeItemCheckState(item.id, state)
            onUpdate?.()
        })()
    }

    const handleDelete = async () => {
        if (!item.id) return;
        await repository.deleteShoppingItem(item.id);
        onUpdate?.();
    };

    const RightActions = (
        _progress: SharedValue<number>,
        drag: SharedValue<number>
    ) => {
        const styleAnimation = useAnimatedStyle(() => {
            return {
                transform: [{ translateX: drag.value + 64 }],
            };
        });

        return (
            <Animated.View style={styleAnimation}>
                <Pressable
                    onPress={handleDelete}
                    className="bg-red-500 justify-center items-center px-6 h-full rounded-r-xl"
                >
                    <Icon icon={LucideTrash2} className="size-6 text-white" />
                </Pressable>
            </Animated.View>
        );
    };

    return (
        <Swipeable
            renderRightActions={RightActions}
            overshootRight={false}
            rightThreshold={40}
        >
            <Pressable onPress={handlePress}>
                <View className="flex-row p-2 items-center gap-4">
                    <Text className="flex-1 text-xl text-text-primary">{item.name}</Text>
                    <Text className="text-xl text-text-primary">{item.amount}x</Text>
                    <BouncyCheckbox 
                        isChecked={item.checked}
                        disableText
                        onPress={handleCheck}
                        fillColor={colors.primary}
                        innerIconStyle={{borderRadius: 4, borderWidth: 2}}
                        iconStyle={{borderRadius: 4}}
                        iconComponent={
                            <Icon 
                                icon={LucideCheck}
                                className={cn("size-5 text-text-primary stroke-[3]",{"hidden": !item.checked})}
                            />
                        }
                    />
                </View>
            </Pressable>
        </Swipeable>
    );
};

export default ShoppingItemRow;
