import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Authentication/Login";
import Registion from "../Authentication/Registion";

import BottomNavigation from "./BottomNavigation";
import ProductDetails from "../Home/ProductDetails";
import CMap from "../Home/CMap";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Address from "../Home/Address";
import Payment from "../Home/Payment";
import PaymentDetails from "../Account/PaymentDetails";
import ActiveCourse from "../Account/ActiveCourse";
import Ionicons from "react-native-vector-icons/Ionicons";
import SallesList from "../Account/SallesList";
import PaymentList from "../Account/PaymentList";
import PendingCourse from "../Account/PendingCourse";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const [user] = useAuthState(auth);
  return (
    <Stack.Navigator initialRouteName="Login">
      {!user ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Course Details"
            component={ProductDetails}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Course Location"
            component={CMap}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Personal Information"
            component={Address}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Payment Details"
            component={PaymentDetails}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="My Active Courses"
            component={ActiveCourse}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Selles List"
            component={SallesList}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Payment List"
            component={PaymentList}
            options={{ headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="Pending Courses"
            component={PendingCourse}
            options={{ headerTitleAlign: "center" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
