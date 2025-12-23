import ShoppingItemModalView from '@/components/ShoppingItemModalView';
import useShopitoColors from '@/hooks/useShopitoColors';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface ShoppingItemModalContextValue {
    show(id: number, onClosed?: () => void): void
    hide(): void
}

const ShoppingItemModalContext = createContext<ShoppingItemModalContextValue | null>(null)

export const ShoppingItemModalContextProvider = ({children}: {children: ReactNode}) => {

    const [id, setId] = useState<number | null>(null);
    const colors = useShopitoColors();
    
    const onClosedCallbackRef = useRef<(() => void)>(undefined);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (id) {
            bottomSheetRef.current?.expand()
        }
        else {
            bottomSheetRef.current?.close()
        }
    }, [id])

    const handleSheetClose = () => {
        setId(null);
        if (onClosedCallbackRef.current) {
            onClosedCallbackRef.current();
            onClosedCallbackRef.current = undefined;
        }
    }


    const modalContent = useMemo(() => {
        if (!id) return null;
        return <ShoppingItemModalView id={id} onHideRequest={() => setId(null)}/>
    }, [id])

    return (
        <ShoppingItemModalContext.Provider value={{
            show: (id, onClosed) => {
                setId(id)
                onClosedCallbackRef.current = onClosed;
            },
            hide: () => setId(null)
        }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                {children}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    enableDynamicSizing={true}
                    enablePanDownToClose={true}
                    onClose={handleSheetClose}
                    backdropComponent={(props: any) => <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior={"close"}
                    />}
                    backgroundStyle={{ backgroundColor: colors.backgroundPrimary }}
                    handleIndicatorStyle={{ backgroundColor: colors.textSecondary }}
                    keyboardBehavior="interactive"
                    keyboardBlurBehavior="restore"
                >
                    {modalContent}
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