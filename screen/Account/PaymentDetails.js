import { View, Text } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
const PaymentDetails = () => {
  const [myPayment, setPayment] = useState(false);
  return (
    <View className="mt-4 px-2">
      <TouchableOpacity
        onPress={() => setPayment(!myPayment)}
        className={`${
          myPayment ? "h-12" : "h-12"
        }  bg-white border border-gray-200  rounded-lg px-3 flex flex-row  justify-between items-center`}
      >
        <Text>My Payment Information</Text>
        <View>
          {myPayment ? (
            <Ionicons
              name="chevron-down"
              size={22}
              color={"#ea580c"}
            ></Ionicons>
          ) : (
            <Ionicons name="chevron-up" size={22} color={"#ea580c"}></Ionicons>
          )}
        </View>
      </TouchableOpacity>

      {myPayment && (
        <View className=" bg-white  border border-gray-200 rounded-lg px-2 h-44 mt-2 p-3">
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Name</Text>
            <Text className="">developer Mamun</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Statu</Text>
            <Text className="">Paid</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Product Id</Text>
            <Text className="">63d8f654d4e870f1528bc43f</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Payment Price</Text>
            <Text className="">
              {" "}
              <Text className=""> 30 USD</Text>
            </Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Date</Text>
            <Text className="">2023-02-02T08:51:41.122Z</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Agreement</Text>
            <Text className="">1 Year</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default PaymentDetails;
