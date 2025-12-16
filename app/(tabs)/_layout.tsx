import { Tabs } from "expo-router";
import { ListChecks, Map, ScrollText } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="lists_summary"
                options={{
                    title: "Lists Summary",
                    tabBarIcon: ({ color }) => <ScrollText color={color} />,
                }}
            />
            <Tabs.Screen
                name="shopping_lists"
                options={{
                    title: "Shopping Lists",
                    tabBarIcon: ({ color }) => <ListChecks color={color} />,
                }}
            />
            <Tabs.Screen
                name="map_view"
                options={{
                    title: "Map View",
                    tabBarIcon: ({ color }) => <Map color={color} />,
                }}
            />
        </Tabs>
    );
}
