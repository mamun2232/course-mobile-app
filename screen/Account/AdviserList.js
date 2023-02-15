import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Box, Toast } from "native-base";
export default function AdviserList() {
  const [adviser, setAdviser] = useState([]);
  useEffect(() => {
    fetch(`http://192.168.31.235:5000/api/v1/user/adviser`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAdviser(data?.user);
        } else {
        }
      });
  }, [adviser]);

  // const removeAdminHendeler = (userss) => {
  //       fetch(
  //         `http://192.168.31.235:5000/api/v1/user/remove/${userss}?roleAction=user`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             // authorization: `Bearer ${localStorage.getItem("Token")}`,
  //           },
  //         }
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.success) {

  //             Toast.show({
  //                   placement: "top",
  //                   render: () => {
  //                     return (
  //                       <Box
  //                         bg="#f97316"
  //                         color="#fff"
  //                         px="2"
  //                         py="2"
  //                         mt={16}
  //                         rounded="sm"
  //                         mb={5}
  //                       >
  //                         <Text className="text-white">Remove Adviser Succssfull</Text>
  //                       </Box>
  //                     );
  //                   },
  //                 });
  //           }
  //         });
  //     };
  const deleteHenedler = (id) => {
    fetch(`http://192.168.31.235:5000/api/v1/user/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // setFetch(true)
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
                  <Text className="text-white">User Delete Succssfull</Text>
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
      {adviser.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pb-20">
            {adviser?.map(({ name, email, _id, role }) => (
              <View key={_id} className="w-full h-20 bg-white rounded-3xl p-4">
                <View className=" flex flex-row gap-3 ">
                  <View className="w-[44.33vw]">
                    <View className=" h-">
                      <Text className=" text-gray-800 font-medium mt-">
                        {name}{" "}
                      </Text>
                      <Text className="text-[16px]  text-orange-600 font-medium">
                        {email}
                      </Text>
                    </View>
                  </View>

                  <View className="w-[24.33vw] pt-">
                    <Text className="text-[16px] font-medium mt-1">
                      Role- {role}
                    </Text>
                  </View>
                  <View className="w-[30.33vw] flex ">
                    {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                    <TouchableOpacity
                      onPress={() => deleteHenedler(_id)}
                      className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center mt-"
                    >
                      <Ionicons
                        name="trash"
                        size={22}
                        color={"#ea580c"}
                      ></Ionicons>
                    </TouchableOpacity>
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
}

const styles = StyleSheet.create({});
