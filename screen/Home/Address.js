import { View, Text } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
const Address = ({navigation}) => {
  // const navigate = useNavigation()
  const [user, loadings, error] = useAuthState(auth);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({defaultValues:{
    name: user?.displayName,
    email: user?.email
  }});

  const onSubmit = async(data) => {
    
    const shippingInfo = JSON.stringify(data);
      await AsyncStorage.setItem("shippingInfo", shippingInfo);
    navigation.navigate("Payment")
  };
  return (
    <View className="  flex justify-center px-4">
      <View className="h-[90%] bg-white mt-10  rounded-lg shadow-lg p-4">
        <Text className="text-lg text-center">Fill this form</Text>
        <SafeAreaView className="mt-5"> 
          <View>
          <Text className="">Neme</Text>
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
          </View>

          <View className="mt-4">
          <Text className="">Email & Username</Text>
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
                  // secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`${
                    error
                      ? " border-orange-500 border-2"
                      : "border-slate-200 border"
                  }   h-12 rounded-lg px-4 `}
                  placeholder="Enter Your Password"
                />
              )}
              name="email"
            />
          </View>
          <View className="mt-4">
          <Text className="">Address</Text>
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
                  // secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`${
                    error
                      ? " border-orange-500 border-2"
                      : "border-slate-200 border"
                  }   h-12 rounded-lg px-4 `}
                  placeholder="Enter Your Password"
                />
              )}
              name="address"
            />
          </View>
          <View className="mt-4">
          <Text className="">State</Text>
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
                  // secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`${
                    error
                      ? " border-orange-500 border-2"
                      : "border-slate-200 border"
                  }   h-12 rounded-lg px-4 `}
                  placeholder="Enter Your Password"
                />
              )}
              name="country"
            />
          </View>

          <View className="mt-5">
            <TouchableOpacity
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              // onPress={() => navigate("Home")}
              className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Confirm Subscribe</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Address;
