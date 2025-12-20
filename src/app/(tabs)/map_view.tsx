import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Tab() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                <Marker
                    coordinate={{ latitude: 50, longitude: 49 }}
                    title="My cool marker"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
