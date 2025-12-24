import { useRepository } from "@/context/repository-context";
import { useShoppingItemModalContext } from "@/context/shopping-item-modal-context";
import useShopitoColors from "@/hooks/useShopitoColors";
import ShoppingItem from "@/model/ShoppingItem";
import { cn } from "@/utils/cn";
import { LucideCheck, LucideTrash2 } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TouchableHighlight, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import Icon from "./Icon";

export interface ShoppingItemRowProps {
    item: ShoppingItem;
}

const ShoppingItemRow = ({ item }: ShoppingItemRowProps) => {

    const { show } = useShoppingItemModalContext()

    const repository = useRepository()

    const colors = useShopitoColors()

    const handlePress = () => {
        if (item.id) {
            show(item.id)
        }
    }

    const handleCheck = (state: boolean) => {
        (async () => {
            if (!item.id) return;
            await repository.changeItemCheckState(item.id, state)
        })()
    }

    const handleDelete = async () => {
        if (!item.id) return;
        await repository.deleteShoppingItem(item.id);
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
                    className="bg-primary justify-center items-center px-6 h-full rounded-r-xl"
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
            <TouchableHighlight 
                onPress={handlePress}
                underlayColor={colors.backgroundSecondary}
                className="rounded-xl"
                activeOpacity={0.7}
            >
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
            </TouchableHighlight>
        </Swipeable>
    );
};

export default ShoppingItemRow;
