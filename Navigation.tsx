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
import { AuthorScreen } from "./screens/AuthorScreen";
import { EditionScreen } from "./screens/EditionScreen";
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

import { KeyboardAvoidingView, Platform, Keyboard, View } from "react-native";
import { useEffect, useState } from "react";

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
            display: keyboardVisible ? "none" : "flex", // Masquer complètement
            position: "relative",
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
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon.Book color={color} />,
          }}
        />
      </BottomTab.Navigator>
    </KeyboardAvoidingView>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditionScreen"
        component={EditionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthorScreen"
        component={AuthorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
