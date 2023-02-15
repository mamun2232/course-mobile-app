import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useEffect } from "react";
import { Box, Toast } from "native-base";
import { Image } from "react-native";
const ActiveCourse = ({ navigation }) => {
  const [myCourses, setmyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(
      `http://192.168.31.235:5000/api/v1/courses/myCourses/${user?.email}   `
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setmyCourses(data?.course);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [show, myCourses]);

  // if (loading) {
  //   return <Loading />;
  // }


  const deleteHenedler = (id) => {
    console.log(id);
    fetch(`http://192.168.31.235:5000/api/v1/courses/course/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
                  <Text className="text-white">Course Delete Successfull</Text>
                </Box>
              );
            },
          });
        } else {
        }
      });
  };

  return (
    <>
      {myCourses.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pl-4 pr-6">
            {myCourses?.map(({ name, url, price, Stock, category, _id , status}) => status !== "Pending" &&(
              <View
                className="w-full h-32 bg-white rounded-3xl flex flex-row gap-3 p-1  "
                key={_id}
              >
                <View className="w-[33.33vw]">
                  <View className=" h-14">
                    <Text className=" text-gray-800 font-medium mt-">
                      {name}{" "}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Selles List" , {_id})}
                  >
                    <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-4">
                      <Text className="text-white">Selles List</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="w-[33.33vw] pt-">
                  <Text className="text-[16px]  text-orange-600 font-medium">
                    {category}
                  </Text>
                  <Text className=" text-gray-800 ">Active </Text>
                  <Text className="text-[16px] font-medium">
                    {Stock} limit
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Payment List" , {_id})}
                  >
                    <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-2">
                      <Text className="text-white">Payment List</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View className="w-[33.33vw] flex   justify-center">
                  {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                  <View className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center">
                    <Ionicons
                      name="trash"
                      size={22}
                      color={"#ea580c"}
                    ></Ionicons>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className=" flex  justify-center items-center h-screen  rounded-lg shadow">
          <Image
            className=" w-72 h-80"
            source={require("../../assets/noAvailbe.gif")}
          />
        </View>
      )}
    </>
  );
};

export default ActiveCourse;
