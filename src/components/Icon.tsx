import { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";
import React from "react";

interface IconProps extends LucideProps {
    icon: LucideIcon
}

const Icon = ({icon: IconComponent, ...props}: IconProps) => {
    cssInterop(IconComponent, {
        className: {
            target: "style",
            nativeStyleToProp: {
                color: true,
                opacity: true,
                width: true,
                height: true
            }
        }
    });
    
    return <IconComponent {...props} />;
};

export default Icon;
