import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import UserReg from "./UserReg";
import AdviserReg from "./AdviserReg";

const Registion = () => {

  const [tabs, setTabs] = useState(true);
  return (
    <View className="flex-1 justify-center p-5">
       {/* custom tabs here  */}
       <View className="h-14 bg-white mb-3 rounded-lg border-gray-200 shadow flex flex-row items-center  px-">
        <View className={`${tabs ? "bg-orange-600 text-white": ""} w-[43vw]  flex-row justify-center py-3 rounded-l-lg`}>
          <TouchableOpacity onPress={() => setTabs(true)}>
            <Text className={`${tabs ? "text-white" : ""} text-lg  font-medium`}>User Register</Text>
          </TouchableOpacity>
        </View>
        <View className={`${!tabs ? "bg-orange-600 text-white": ""} w-[47vw]   flex-row justify-center py-3 rounded-r-lg`}>
          <TouchableOpacity onPress={() => setTabs(false)}>
            <Text className={`${!tabs ? "text-white" : ""} text-lg  font-medium`}>Adviser Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {
        tabs ? <UserReg/> : <AdviserReg/>
      }

    </View>
  );
};

export default Registion;
