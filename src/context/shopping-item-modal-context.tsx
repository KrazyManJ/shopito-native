import ShoppingItemModalView from '@/components/ShoppingItemModalView';
import useShopitoColors from '@/hooks/useShopitoColors';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface ShoppingItemModalContextValue {
    show(id: number): void
    hide(): void
}

const ShoppingItemModalContext = createContext<ShoppingItemModalContextValue | null>(null)

export const ShoppingItemModalContextProvider = ({children}: {children: ReactNode}) => {

    const [id, setId] = useState<number | null>(null);
    const colors = useShopitoColors();

    const bottomSheetRef = useRef<BottomSheet>(null);
    // const snapPoints = useMemo(() => ['25%', '50%'], []);

    useEffect(() => {
        if (id) {
            bottomSheetRef.current?.expand()
        }
        else {
            bottomSheetRef.current?.close()
        }
    }, [id])

    return (
        <ShoppingItemModalContext.Provider value={{
            show: (id) => setId(id),
            hide: () => setId(null)
        }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                {children}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    enableDynamicSizing={true}
                    // snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onClose={() => setId(null)}
                    backdropComponent={(props: any) => <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior={"close"}
                    />}
                    backgroundStyle={{ backgroundColor: colors.backgroundPrimary }}
                    handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
                >
                    {id && <ShoppingItemModalView id={id}/>}
                </BottomSheet>
            </GestureHandlerRootView>
        </ShoppingItemModalContext.Provider>
    )
}

export function useShoppingItemModalContext() {
    const ctx = useContext(ShoppingItemModalContext);
    if (!ctx) throw Error("'useShoppingItemModalContext' must be called inside 'ShoppingItemModalContextProvider'")
    return ctx
}