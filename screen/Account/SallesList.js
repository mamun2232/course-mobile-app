import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Box, Toast } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const SallesList = ({ route }) => {
  const [id] = useState(route.params._id);
  const [selles, setSelles] = useState([]);
  const [reFetch, setRefetch] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://course-backend.vercel.app/api/v1/order/allsellesList/${id}   `)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelles(data?.salles);
        } else {
        }
      });
  }, [reFetch, selles]);

  const limitReduceHendler = (postId) => {
    console.log(postId);
    fetch(`https://course-backend.vercel.app/api/v1/order/limit/${postId}   `, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setRefetch(true);
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
                  <Text className="text-white">{json?.message}</Text>
                </Box>
              );
            },
          });
        } else {
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
                  <Text className="text-white">{json?.message}</Text>
                </Box>
              );
            },
          });
        }
      });
  };

  const deleteHenedler = (id) => {
    console.log(id);
    fetch(`https://course-backend.vercel.app/api/v1/order/order/${id}`, {
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
      {selles.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pl-4 pr-6">
            {selles?.map(({ name, email, _id, limit }) => (
              <View key={_id} className="w-full h-28 bg-white rounded-3xl p-4">
                <View className=" flex flex-row gap-3 ">
                  <View className="w-[37.33vw]">
                    <View className=" h-">
                      <Text className=" text-gray-800 font-medium mt-">
                        {name}{" "}
                      </Text>
                      <Text className="text-[16px]  text-orange-600 font-medium">
                        {email}
                      </Text>
                    </View>
                  </View>

                  <View className="w-[27.33vw] pt-">
                    <Text className="text-[16px] font-medium mt-5">
                      {limit} limit Avalible
                    </Text>
                  </View>
                  <View className="w-[33.33vw] flex ">
                    {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                    <TouchableOpacity onPress={()=>deleteHenedler(_id)} className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center mt-2">
                      <Ionicons
                        name="trash"
                        size={22}
                        color={"#ea580c"}
                      ></Ionicons>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => limitReduceHendler(_id)}>
                  <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-2">
                    <Text className="text-white">Closing Limit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className=" flex  justify-center items-center h-screen  rounded-lg shadow">
          <Image
            className="w-[90vw] h-96 rounded-lg"
            source={require("../../assets/noAvailbe.gif")}
          />
        </View>
      )}
    </>
  );
};

export default SallesList;
