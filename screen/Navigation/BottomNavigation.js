import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home";
import Account from "../Account/Account";
import Cart from "../cart/Cart";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddCourse from "../Home/AddCourse";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useAdviser from "../CustomHook/useAdviser";
import useAdmin from "../CustomHook/useAdmin";

const Tab = createBottomTabNavigator();

const BottomNavigation = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [adviser] = useAdviser(user);
  const [admin] = useAdmin(user)
  
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
           headerTitleAlign: "center" ,
          tabBarActiveTintColor: "#ea580c",
          nactiveTintColor: "black",
          
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              className="px-5"
            >
              <Ionicons
                name="cart-outline"
                size={26}
                color={"#ea580c"}
              ></Ionicons>
            </TouchableOpacity>
          ),
        }}
      />
      {
        (adviser || admin) && <Tab.Screen
        name="Add Course"
        component={AddCourse}
        options={{
          tabBarIcon: () => <IconContainer name="add-circle-outline" />,
          // title: "My Course",
          tabBarActiveTintColor: "#ea580c",
          nactiveTintColor: "black",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("My Active Courses")}
              className="px-5 flex items-center"
            >
              <Ionicons
                name="cart-outline"
                size={26}
                color={"#ea580c"}
              ></Ionicons>
              <Text className="text-[10px]">My Course</Text>
            </TouchableOpacity>
          ),
          
        }}
      />
      }
      
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => <IconContainer name="cart" />,
          title: "My Course",
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
