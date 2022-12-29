import { View, Text, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
const Account = () => {
  return (
    <>
    <View className="pb-4">
      <View className=" flex items-center  bg-white pt-5">
        <Image
          className="w-36 h-36 rounded-full  border-2 border-gray-800 "
          // style={{ width: 10, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
        />
        <Text className="text-lg  font-medium mt-1">Mamun Islam</Text>
        <Text className=" text-gray-500">Mamun12@gmail.com</Text>
      </View>
      <View className="pt-8 pb-4 px-6 flex flex-row justify-between bg-white">
        <View>
          <View className="w-16 h-16 rounded-full bg-slate-200 flex  items-center justify-center">
            <Ionicons name="document" size={22} color={"#ea580c"}></Ionicons>
          </View>
          <Text className=" text-center text-gray-500">My Orders</Text>
        </View>

        <View>
          <View className="w-16 h-16 rounded-full bg-slate-200 flex  items-center justify-center">
            <Ionicons name="person" size={22} color={"#ea580c"}></Ionicons>
          </View>
          <Text className=" text-center text-gray-500">Profile</Text>
        </View>

        <View>
          <View className="w-16 h-16 rounded-full bg-slate-200 flex  items-center justify-center">
            <Ionicons name="navigate" size={22} color={"#ea580c"}></Ionicons>
          </View>
          <Text className=" text-center text-gray-500">Address</Text>
        </View>

        <View>
          <View className="w-16 h-16 rounded-full bg-slate-200 flex  items-center justify-center">
            <Ionicons name="chatbubbles" size={22} color={"#ea580c"}></Ionicons>
          </View>
          <Text className=" text-center text-gray-500">Message</Text>
        </View>
      </View>
    </View>

    <View className="bg-white pt-5 h-screen">
      <View className="p-4">
        <Text className="text-lg">Trames And Condation</Text>
        <Text className="text-lg">Change Password</Text>
        <Text className="text-lg">LogOut</Text>
      </View>

    </View>
    </>
  );
};

export default Account;
