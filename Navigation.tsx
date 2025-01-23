import "react-native-gesture-handler";
import { KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import * as Icon from "react-native-feather";
import ScanScreen from "./screens/ScanScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import { BookScreen } from "./screens/BookScreen";
import { AuthorScreen } from "./screens/AuthorScreen";
import { EditionScreen } from "./screens/EditionScreen";
import MapScreen from "./screens/Map";
import { CollecScreen } from "./screens/CollecScreen";
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Nav" component={BottomNav} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function BottomNav() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <BottomTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#e82604",
          tabBarInactiveTintColor: "#363636",
          tabBarStyle: {
            display: keyboardVisible ? "none" : "flex",
            position: "relative",
            paddingHorizontal: 20,
            left: 0,
            right: 0,
            height: 60,
            borderTopWidth: 1,
            backgroundColor: "#FFFFFFAA",
            borderTopColor: "#eeeeee",
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
            tabBarIcon: ({ color }) => <Icon.FileText color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Recherche"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color }) => <Icon.Search color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Collection"
          component={CollecScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon.Book color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon.Map color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </KeyboardAvoidingView>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
      <Stack.Screen name="EditionScreen" component={EditionScreen} />
      <Stack.Screen name="AuthorScreen" component={AuthorScreen} />
    </Stack.Navigator>
  );
}
