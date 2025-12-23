import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react-native";
import { RefAttributes } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Icon from "./Icon";


const BUTTON_VARIANTS = cva("flex-row items-center gap-2 p-2 px-4 rounded-full", {
    variants: {
        variant: {
            filled: "bg-primary",
            outlined: "border border-primary",
        },
    },
    defaultVariants: {
        variant: "filled"
    }
});
const ICON_VARIANTS = cva("size-5", {
    variants: {
        variant: {
            filled: "text-text-primary",
            outlined: "text-primary"
        },
    },
    defaultVariants: {
        variant: "filled"
    }
});
const TEXT_VARIANTS = cva("", {
    variants: {
        variant: {
            filled: "text-text-primary",
            outlined: "text-primary"
        },
    },
    defaultVariants: {
        variant: "filled"
    }
});


type ButtonProps =  Omit<PressableProps & RefAttributes<View>, "children"> & VariantProps<typeof BUTTON_VARIANTS> & {
    text: string,
    icon?: LucideIcon
}


const Button = ({text, icon, variant, className, ...props}: ButtonProps) => {
    return (
        <Pressable 
            className={cn(BUTTON_VARIANTS({ variant, className }))}
            {...props}
        >
            { icon && <Icon icon={icon} className={cn(ICON_VARIANTS({ variant }))}/> }
            <Text className={cn(TEXT_VARIANTS({ variant }))}>{text}</Text>
        </Pressable>
    )
}

export default Button