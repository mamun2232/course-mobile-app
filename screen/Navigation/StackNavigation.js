import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Authentication/Login";
import Registion from "../Authentication/Registion";

import BottomNavigation from "./BottomNavigation";
import ProductDetails from "../Home/ProductDetails";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Register"
        component={Registion}
        options={{ headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{ headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
