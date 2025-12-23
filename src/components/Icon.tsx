import { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";
import React from "react";

interface IconProps extends LucideProps {
    icon: LucideIcon
}

const interopCache = new WeakSet<LucideIcon>();

const Icon = ({icon: IconComponent, ...props}: IconProps) => {
    if (!interopCache.has(IconComponent)) {
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
        interopCache.add(IconComponent);
    }
    
    return <IconComponent {...props} />;
};

export default Icon;
