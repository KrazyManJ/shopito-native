import { ShopitoColors } from "@/constants/Colors";
import { vars } from "nativewind";

export default function colorsToVars(colors: ShopitoColors) {
    const objectResult = Object.keys(colors).reduce<Record<string,string>>((acc, key) => {
        const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

        acc[`--color-${kebabKey}`] = colors[key as keyof ShopitoColors]

        return acc
    }, {})

    return vars(objectResult)
}