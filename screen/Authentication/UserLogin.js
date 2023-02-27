import React from "react";
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Utilits/Loading";

import ForgatePass from "./ForgatePass";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";

import { Actionsheet, Box, Center, useDisclose } from "native-base";
import { useState } from "react";
const UserLogin = ({ navigation }) => {
  const [showError, setShowError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const { navigate } = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [signInWithEmailAndPassword, users, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user, loadings, errorss] = useAuthState(auth);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    try {
      setMessageError("");
      setShowError(false);
      fetch("http://192.168.31.235:5000/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then(async (result) => {
          if (result.success) {
            await signInWithEmailAndPassword(data.email, data.password);
            // toast.success(data.message);
            // localStorage.setItem("Token", result?.token);
            // localStorage.setItem("userId", result.user._id);
            await AsyncStorage.setItem("Token", result.token);
            await AsyncStorage.setItem("userId", result.user._id);
            // navigate("/login");
          } else {
            // toast.error(result.message);
            setShowError(true);
            setMessageError(result.message);
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(et);
    }

    // reset();
    // navigate("Home");
  };
//  if (loading || loadings) {
//     return <Loading />;
//   }
  // if(error ||  errorss){ 
  //   console.log(error.message)
  //   setMessageError(error?.message || errors.message)
    
  //  return setShowError(true)
  // }
 
  if (user) {
    navigate.navigate("Home");
  }
  console.log(onOpen);

  return (
    <View>
      <View className="h-[75vh] border border-gray-200 rounded-lg p-3 bg-white">
        <View className={`${showError ? "mt-12" : "mt-20"} flex items-center `}>
          <Image
            className="w-52 h-40"
            source={require("../../assets/login.png")}
          />
          <Text className="text-2xl mt-4">Welcome Back</Text>
          <Text className="text-sm m">E-commarce App ,Happy Shopping</Text>
        </View>
        {showError && (
          <View className="h-12 bg-red-100 rounded mt-4 flex justify-center items-center">
            <Text className="text-red-500 font-medium">{messageError}</Text>
          </View>
        )}

        <View className="mt-6">
          {/* <Text className="text-2xl font-medium">Login Now</Text> */}
          <SafeAreaView>
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
                // onPress={() => navigate("Home")}
                className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
              >
                <Text className="text-white  font-medium">Login</Text>
              </TouchableOpacity>
              {/* <Button className="border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center" title="Submit" onPress={handleSubmit(onSubmit)} /> */}
            </View>
          </SafeAreaView>
          <TouchableOpacity onPress={() => onOpen()}>
            <Text className="text-right mt-1 text-orange-600 font-medium">
              Forgate Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="mt-2  text-center text-[15px]">
        Dont Have Any Account?
        <Text onPress={() => navigate("Register")} className="text-orange-600">
          Please Register
        </Text>
      </Text>

      {/* <ForgatePass isOpen={isOpen} onClose={onClose}/> */}

      {isOpen && <ForgatePass isOpen={isOpen} onClose={onClose} />}
    </View>
  );
};

export default UserLogin;
