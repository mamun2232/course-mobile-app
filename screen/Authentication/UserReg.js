import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Utilits/Loading";
import { useNavigation } from "@react-navigation/native";

const UserReg = ({navigation}) => {
  const {navigate} = useNavigation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword, Cuser, loading, Cerror] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, Uerror] = useUpdateProfile(auth);
  const onSubmit = (data) => {
   
    const name = `${data.fistName} ${data.lastName}`;
    const userInfo = {
      name,
      email: data.email,
      role: "User",
    };
    fetch("https://course-commerce-back-end.vercel.app/api/v1/user/register", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        if (result.success) {
          await createUserWithEmailAndPassword(data.email, data.password);
          await updateProfile({ displayName: name });
          // navigate("/login");
          // localStorage.setItem("Token", result?.token);
          // localStorage.setItem("userId", result.user._id);
        } else {
        }
      })
      .catch((error) => console.log("fetch error:", error));

    // navigate("Home")
  };

  // if(errors || Cerror){
  //   alert(errors?.message || Cerror?.message )
  // }
  if(loading || updating){
    return <Loading/>

  }
  if (user) {
    navigation.navigate("Home");
  }

  return (
    <View>
      <View className="h-[75vh] border border-gray-200 rounded-lg p-3 bg-white">
        <View className=" flex items-center mt-10">
          <Image
            className="w-52 h-40"
            source={require("../../assets/register.png")}
          />
          <Text className="text-2xl mt-2">Let's Get Stared</Text>
          <Text className="text-sm m">fill this form to create an account</Text>
        </View>

        <View className="mt-8">
          {/* <Text className="text-2xl font-medium">Login Now</Text> */}
          <SafeAreaView>
            <View className=" flex flex-row gap-3">
              <View>
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
                      }   h-12 w-[40vw] rounded-lg px-4 `}
                      placeholder="Enter firstName"
                    />
                  )}
                  name="fistName"
                />
              </View>
              <View>
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
                      }   h-12 w-[40vw] rounded-lg px-4 `}
                      placeholder="Enter lastName"
                    />
                  )}
                  name="lastName"
                />
              </View>

              {/* <TextInput
                className=" border h-12 w-[40vw] rounded-lg px-4 border-slate-200"
                placeholder="Enter Last Name"
              /> */}
            </View>
            <View className="mt-4">
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
            <View className="mt-4">
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
                    secureTextEntry={true}
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
                name="password"
              />
            </View>
            <View className="mt-5">
              <TouchableOpacity
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
              >
                <Text className="text-white  font-medium">Registion</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
      <Text className="mt-2  text-center text-[15px] ">
        All Ready Register?
        <Text onPress={() => navigate("Login")} className="text-orange-600 ">
          Please Login
        </Text>
      </Text>
    </View>
  );
};

export default UserReg;
