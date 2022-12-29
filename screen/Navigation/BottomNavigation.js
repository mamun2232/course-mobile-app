import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home";
import Account from "../Account/Account";
import Cart from "../cart/Cart";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="Homes"
        component={Home}
        options={{
          tabBarIcon: () => <IconContainer name="home" />,
          title: "Home",
          tabBarActiveTintColor: "#ea580c",
          nactiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => <IconContainer name="cart" />,
          title: "My Cart",
          tabBarActiveTintColor: "#ea580c",
          nactiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: () => <IconContainer name="heart" />,
          tabBarActiveTintColor: "#ea580c",
          nactiveTintColor: "black",
        }}
      />
    </Tab.Navigator>
  );
};

const IconContainer = ({ name }) => {
  return <Ionicons name={name} size={22} color={"#ea580c"}></Ionicons>;
};
export default BottomNavigation;
