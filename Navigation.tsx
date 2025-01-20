import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import * as Icon from "react-native-feather";
import { createStackNavigator } from "@react-navigation/stack";
import ScanScreen from "./screens/ScanScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import { BookScreen } from "./screens/BookScreen";
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Nav"
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookScreen"
          component={BookScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomNav() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#e82604",
        tabBarInactiveTintColor: "#363636",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          paddingHorizontal: 20,
          left: 0,
          right: 0,
          height: 60,
          borderTopWidth: 1,
          backgroundColor: "#FFFFFFAA",
          borderTopColor: "#e5e5e5",
          justifyContent: "space-between",
          shadowColor: "#fff",
        },
        tabBarIconStyle: {
          color: "#fff",
        },
        tabBarItemStyle: {
          top: 15,
          bottom: 15,
          height: "61%",
          borderRadius: 50,
        },
      }}
    >
      <BottomTab.Screen
        name="Nouveautés"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon.FileText color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Recherche"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon.Search color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Collection"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon.Book color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
