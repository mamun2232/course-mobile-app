import { View, Text } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { Box, TextArea, Toast } from "native-base";
import { TouchableOpacity } from "react-native";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ContactNow() {
  const [user, loadings, error] = useAuthState(auth);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
    },
  });

  const onSubmit = async ({ name, email, subject, phone, message }) => {
    const contect = {
      name,
      email,
      subject,
      phone,
      message,
    };
    fetch("http://192.168.31.235:5000/api/v1/contect/contect", {
      method: "POST",
      body: JSON.stringify(contect),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          reset();

          Toast.show({
            placement: "top",
            render: () => {
              return (
                <Box
                  bg="#f97316"
                  color="#fff"
                  px="2"
                  py="2"
                  mt={16}
                  rounded="sm"
                  mb={5}
                >
                  <Text className="text-white">Message Send Successfull</Text>
                </Box>
              );
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View className="mt-4  px-2">
      <View className="h-80 bg-white rounded-lg px-4">
        <View className=" flex flex-row gap-2 mt-2">
          <View className="w-[43vw]">
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
                  placeholder="Enter Your Name"
                />
              )}
              name="name"
            />
          </View>
          <View className="w-[43vw]">
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
              name="email"
            />
          </View>
        </View>
        <View className=" flex flex-row gap-2 mt-3">
          <View className="w-[43vw]">
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
                  placeholder="Enter Subject"
                />
              )}
              name="subject"
            />
          </View>
          <View className="w-[43vw]">
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
                  placeholder="Enter Your Phone"
                />
              )}
              name="phone"
            />
          </View>
        </View>

        <View className="mt-3">
          <Box alignItems="center" w="100%">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                //     <TextInput
                //       onBlur={onBlur}
                //       onChangeText={onChange}
                //       value={value}
                //       className={`${
                //         error
                //           ? " border-orange-500 border-2"
                //           : "border-slate-200 border"
                //       }   h-12 rounded-lg px-4 `}
                //       placeholder="Enter Your Phone"
                //     />
                <TextArea
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`${
                    error ? " border-orange-500 border-2" : ""
                  }    rounded-lg px-4 `}
                  h={20}
                  placeholder="Enter Message"
                  w="100%"
                />
              )}
              name="message"
            />
          </Box>
        </View>

        <View className="mt-3">
          <TouchableOpacity
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            // onPress={() => navigate("Home")}
            className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
          >
            <Text className="text-white  font-medium">Add Course</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text>ContactNow</Text> */}
    </View>
  );
}
