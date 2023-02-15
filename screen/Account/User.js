import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import UserList from "./UserList";
import AdviserList from "./AdviserList";
import Ownerlist from "./Ownerlist";

export default function User() {
  const [user, setuser] = useState(true);
  const [adviser, setAdviser] = useState(false);
  const [owner, setOwner] = useState(false);

  const userTeb = () => {
    setuser(true);
    setAdviser(false);
    setOwner(false);
  };
  const adviserTeb = () => {
    setuser(false);
    setAdviser(true);
    setOwner(false);
  };
  const ownerTeb = () => {
    setuser(false);
    setAdviser(false);
    setOwner(true);
  };
  return (
    <View className="py-5 px-2">
      {/* custom tabs here  */}
      <View className="h-14 bg-white mb-3 rounded-lg border-gray-200 shadow flex flex-row items-center  px-">
        <View
          className={`${
            user ? "bg-orange-600 text-white" : ""
          } w-[33vw]  flex-row justify-center py-3 rounded-l-lg`}
        >
          <TouchableOpacity onPress={() => userTeb()}>
            <Text
              className={`${user ? "text-white" : ""} text-lg  font-medium`}
            >
              User
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${
            adviser ? "bg-orange-600 text-white" : ""
          } w-[29vw]   flex-row justify-center py-3 `}
        >
          <TouchableOpacity onPress={() => adviserTeb()}>
            <Text
              className={`${adviser ? "text-white" : ""} text-lg  font-medium`}
            >
              Adviser
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${
            owner ? "bg-orange-600 text-white" : ""
          } w-[33vw]   flex-row justify-center py-3 rounded-r-lg`}
        >
          <TouchableOpacity onPress={() => ownerTeb()}>
            <Text
              className={`${owner ? "text-white" : ""} text-lg  font-medium`}
            >
              Owner
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {tabs ? <UserLogin /> : <Adviser />} */}

      {user && <UserList />}
      {adviser && <AdviserList />}
      {owner && <Ownerlist />}
    </View>
  );
}

const styles = StyleSheet.create({});
