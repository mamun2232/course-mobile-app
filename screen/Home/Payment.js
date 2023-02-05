import { View, Text } from 'react-native'
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { TouchableOpacity , Image} from "react-native";
import { TextInput } from "react-native";

const Payment = () => {
      const {
            control,
            handleSubmit,
            reset,
            formState: { errors },
          } = useForm();
        
          const onSubmit = (data) => {
            console.log(data);
            // navigation.navigate("Payment")
          };
  return (
      <View className="  flex justify-center px-4">
      <View className="h-[84%] bg-white mt-10  rounded-lg shadow-lg p-4">
        <View className=" flex items-center">
        <Image
            className="w-52 h-40"
            source={require("../../assets/payment2.gif")}
          />
        </View>
        <Text className="text-lg mt-10">Pay your yearly subscription fee</Text>
        <View className="h-[1px] bg-slate-500 mt-2"></View>
        <View className="mt-2 flex flex-row justify-between">
            <Text className="text-lg font-medium">Total Cost</Text>
            <Text className="text-lg font-medium">$30 USD</Text>

        </View>
        
        <SafeAreaView className="mt-10"> 
        <Text className=" font-medium text-lg">GOT A PROMO CODE?</Text>
          <View className="h-12 relative">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`${
                    error
                      ? " border-orange-500 border-2"
                      : "border-slate-200 border"
                  }   h-12 rounded-lg px-4 `}
                  placeholder="Enter Your Email"
                />
              )}
              name="name"
            />

            <View className=" absolute mt-1 right-0 px-1">
            <TouchableOpacity
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              // onPress={() => navigate("Home")}
              className=" border h-10 w-28 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Apply Code</Text>
            </TouchableOpacity>
            </View>
          </View>

          

          <View className="mt-20">
            <TouchableOpacity
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              // onPress={() => navigate("Home")}
              className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Pay With Paypal</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

export default Payment