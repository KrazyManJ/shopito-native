import { ArrayToObject, Prettify } from "@/types";



export type ShopitoColors = Prettify<ArrayToObject<[
    "primary", 
    "backgroundPrimary", 
    "backgroundSecondary", 
    "textPrimary", 
    "textSecondary",
    "unused",
]>>

export const ShopitoThemeColors: { light: ShopitoColors; dark: ShopitoColors } = {
    light: {
        primary: "#D53A3A",
        textPrimary: "#2A2A2A",
        textSecondary: "#5E5E5E",
        backgroundPrimary: "#F2F0ED",
        backgroundSecondary: "#DAD8D4",
        unused: "#9747FF"
    },
    dark: {
        primary: "#D53A3A",
        textPrimary: "#F2F0ED",
        textSecondary: "#717070",
        backgroundPrimary: "#181717",
        backgroundSecondary: "#343434",
        unused: "#9747FF"
    },
};