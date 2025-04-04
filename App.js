import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindScout from "./screens/FindScout";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Chat } from "./screens/Chat";
import { Profile } from "./screens/Profile";
import { Map } from "./screens/Map";
import { ScoutsSuggestions } from "./screens/ScoutsSuggestions";
import SplashScreen from "./screens/SplashScreen";
import BecomeScoutGuide from "./screens/BecomeScoutGuide";
import {Settings} from "./screens/Settings";

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <NavigationIndependentTree>
            <Tab.Navigator
                initialRouteName="Map"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "FindScout") {
                            iconName = focused ? "git-compare" : "git-compare-outline";
                        } else if (route.name === "Chat") {
                            iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                        } else if (route.name === "Map") {
                            iconName = focused ? "location" : "location-outline";
                        } else if (route.name === "Profile") {
                            iconName = focused ? "person" : "person-outline";
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#ffffff",
                    tabBarStyle: {
                        height: 70,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        position: "absolute",
                        elevation: 50,
                        paddingTop: 5,
                        backgroundColor: "#3ba2cd",
                    },
                    tabBarIconStyle: {
                        width: 50,
                        height: 50,
                        justifyContent: "center",
                        padding: 0,
                    },
                    tabBarLabel: '',
                    headerShown: false,
                })}
                id="routes">
                <Tab.Screen name="Map" component={Map} />
                <Tab.Screen name="FindScout" component={FindScout} />
                <Tab.Screen name="Chat" component={Chat} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationIndependentTree>
    );
}

const RootStack = createNativeStackNavigator({
    initialRouteName: 'SplashScreen',
    screens: {
        SplashScreen: {
            screen: SplashScreen,
            options: {
                headerShown: false,
            }
        },
        BottomBar: {
            screen: TabNavigator,
            options: {
                headerShown: false,
            }
        },
        ScoutsSuggestions: {
            screen: ScoutsSuggestions,
            options: {
                headerShown: false,
            }
        },
        BecomeScoutGuide: {
            screen: BecomeScoutGuide,
            options: {
                headerShown: false,
            }
        },
        Settings: {
            screen: Settings,
            options: {
                headerShown: false,
            }
        }
    },
});

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="SplashScreen" id="SplashScreen">
                <RootStack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="BottomBar"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="ScoutsSuggestions"
                    component={ScoutsSuggestions}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="BecomeScoutGuide"
                    component={BecomeScoutGuide}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}