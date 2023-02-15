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
import { Actionsheet, useDisclose , Box, Center   } from "native-base";
import ForgatePass from "./ForgatePass";
import { useNavigation } from "@react-navigation/native";
const UserLogin = ({ navigation }) => {

  const {navigate} = useNavigation()

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const [signInWithEmailAndPassword, users, loading, errorss] =
    useSignInWithEmailAndPassword(auth);
  const [user, loadings, error] = useAuthState(auth);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
console.log(onOpen)
  return (
    <View>
      <View className="h-[75vh] border border-gray-200 rounded-lg p-3 bg-white">
        <View className=" flex items-center mt-20">
          <Image
            className="w-52 h-40"
            source={require("../../assets/login.png")}
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
              {/* <Button className="border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center" title="Submit" onPress={handleSubmit(onSubmit)} /> */}
            </View>
          </SafeAreaView>
          <TouchableOpacity oPress={onOpen}>
          <Text className="text-right mt-1 text-orange-600 font-medium">Forgate Password</Text>
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
     <Center>
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <View fontSize="16" color="gray.500" _dark={{
            color: "gray.300"
          }}>
              Albums
            </View>
          </Box>
          <Actionsheet.Item>Delete</Actionsheet.Item>
          <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
          <Actionsheet.Item>Play</Actionsheet.Item>
          <Actionsheet.Item>Favourite</Actionsheet.Item>
          <Actionsheet.Item>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
    </View>
  );
};

export default UserLogin;
