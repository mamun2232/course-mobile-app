import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Box,  Toast } from 'native-base';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
export default function Ownerlist() {
      const [owner, setOwner] = useState([]);
      useEffect(()=>{
            fetch(`http://192.168.31.235:5000/api/v1/user/owner`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOwner(data?.user);
      //     setLoading(false);
        } else {
      //     setLoading(false);
        }
      });
      },[owner])
      const deleteHenedler = (id) => {
            fetch(`http://192.168.31.235:5000/api/v1/user/delete/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                
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
      {owner.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pb-20">
            {owner?.map(({ name, email, _id, role }) => (
              <View key={_id} className="w-full h-24 bg-white rounded-3xl p-4">
                <View className=" flex flex-row gap-3 ">
                  <View className="w-[68.33vw]">
                    <View className=" h-">
                      <Text className=" text-gray-800 font-medium mt-">
                        {name}{" "}
                      </Text>
                      <Text className="text-[16px]  text-orange-600 font-medium">
                        {email}
                      </Text>
                      <Text className="text-[16px] font-medium mt-1">
                     Role- {role}
                    </Text>
                    </View>
                  </View>

                  
                  <View className="w-[30.33vw] flex ">
                    {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                    <TouchableOpacity onPress={()=>deleteHenedler(_id)} className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center mt-">
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
            className="w-[90vw] h-96 rounded-lg"
            source={require("../../assets/noAvailbe.gif")}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({})