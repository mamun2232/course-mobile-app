// import { StyleSheet, Text, View } from 'react-native'
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const { navigate } = useNavigation();
  return (
    <View className="flex-1 justify-center p-5">
      <View className="h-[60vh] border border-gray-200 rounded-lg p-3 bg-white">
        <View className=" flex items-center">
          <Image
            className="w-52 h-40"
            source={require("../../assets/login.png")}
          />
          <Text className="text-2xl mt-2">Welcome Back</Text>
          <Text className="text-sm m">E-commarce App ,Happy Shopping</Text>
        </View>

        <View className="mt-8">
          {/* <Text className="text-2xl font-medium">Login Now</Text> */}
          <SafeAreaView>
            <View>
              <TextInput
                className=" border h-12 rounded-lg px-4 border-slate-200"
                placeholder="Enter Your Email"
              />
            </View>
            <View className="mt-4">
              <TextInput
                secureTextEntry={true}
                className=" border h-12 rounded-lg px-4 border-slate-200"
                placeholder="Enter Your Password"
              />
              <Text className="text-sm text-right text-orange-600 font-medium">
                Forget Password?
              </Text>
            </View>
            <View className="mt-5">
              <TouchableOpacity
                onPress={() => navigate("Home")}
                className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
              >
                <Text className="text-white  font-medium">Login</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
      <Text className="mt-5  text-center text-[15px]">
        Dont Have Any Account?
        <Text onPress={() => navigate("Register")} className="text-orange-600">
          Please Register
        </Text>
      </Text>
    </View>
  );
};

export default Login;
