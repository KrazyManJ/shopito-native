import { cssInterop } from "nativewind";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Tab() {
    cssInterop(MapView, { className: "style" })

    return (
        <View className="flex-1">
            <MapView className="size-full">
                <Marker
                    coordinate={{ latitude: 50, longitude: 49 }}
                    title="My cool marker"
                />
            </MapView>
        </View>
    );
}
