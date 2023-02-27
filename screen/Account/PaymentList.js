import { View, Text, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Toast } from 'native-base';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
const PaymentList = ({route}) => {
  const [id] = useState(route.params._id);
  const [selless, setSelles] = useState([]);
  const [reFetch, setRefetch] = useState(false);
  useEffect(() => {
    fetch(`http://192.168.31.235:5000/api/v1/order/allPaymentList/${id}   `)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSelles(data?.salles);
        } else {
        }
      });
  }, [selless, reFetch]);



const deleteHenedler = (id) => {
      console.log(id);
      fetch(`http://192.168.31.235:5000/api/v1/order/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
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
           ;
          } else {
          }
        });
    };
  return (
    <>
    {selless.length !== 0 ? (
      <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
        <View className="flex gap-3 pl-4 pr-6">
          {selless?.map(({ name, email, _id, paidPrice, status , country }) => (
            <View key={_id} className="w-full h-24 bg-white rounded-3xl p-4">
              <View className=" flex flex-row gap-3 ">
                <View className="w-[37.33vw]">
                  <View className=" h-">
                    <Text className=" text-gray-800 font-medium mt-">
                      {name}
                    </Text>
                    <Text className="text-[16px]  text-orange-600 font-medium">
                      {email}
                    </Text>
                    <Text className=" text-gray-800 font-medium mt-">
                      {country}
                    </Text>
                  </View>
                </View>

                <View className="w-[27.33vw] pt-">
                  <Text className="text-[16px] font-medium mt-0">
                    {status}
                  </Text>
                  <Text className="text-[16px] font-medium mt">
                    {paidPrice} USD Paid
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

              {/* <TouchableOpacity onPress={() => limitReduceHendler(_id)}>
                <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-2">
                  <Text className="text-white">Closing Limit</Text>
                </View>
              </TouchableOpacity> */}
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

export default PaymentList