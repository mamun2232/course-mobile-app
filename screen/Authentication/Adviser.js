import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import Loading from "../Utilits/Loading";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import { useDisclose } from "native-base";
import ForgatePass from "./ForgatePass";
const Adviser = ({navigation}) => {
  const {navigate} = useNavigation()
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  
  // https://new-golf.vercel.app 
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, users, loading, errorss] =
    useSignInWithEmailAndPassword(auth);
  const [user, loadings, error] = useAuthState(auth);
  const onSubmit = (data) => {
    fetch("https://course-commerce-back-end.vercel.app/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(data);
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
        }
      }).catch((e)=>console.log(e))
    // reset();
    // navigate("Home");
  };

  if (loading || loadings) {
    return <Loading />;
  }
  if (user) {
    navigation.navigate("Home");
  }
  return (
    <View>
      <View className="h-[75vh] border border-gray-200 rounded-lg p-3 bg-white">
        <View className=" flex items-center mt-20">
          <Image
            className="w-52 h-40"
            source={require("../../assets/advier.png")}
          />
          <Text className="text-2xl mt-2">Welcome Back</Text>
          <Text className="text-sm m">E-commarce App ,Happy Shopping</Text>
        </View>

        <View className="mt-8">
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
            </View>
          </SafeAreaView>

        </View>
        <TouchableOpacity onPress={()=>onOpen()}>
            
            <Text className="text-right mt-1 text-orange-600 font-medium">Forgate Password</Text>
            </TouchableOpacity>
      </View>
      
      <ForgatePass isOpen={isOpen} onClose={onClose} />
      <Text className="mt-2  text-center text-[15px]">
        Dont Have Any Account?
        <Text onPress={() => navigate("Register")} className="text-orange-600">
          Please Register
        </Text>
      </Text>
    </View>
  );
};

export default Adviser;
