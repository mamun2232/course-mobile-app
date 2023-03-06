import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Toast } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const AllPayment = () => {
  const [myOrder, setMyOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://course-backend.vercel.app/api/v1/order/allPayments`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setMyOrder(data?.order);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  }, [myOrder]);

  // if (loading) {
  //   return <Loading />;
  // }

  const deleteHenedler = (id) => {
    console.log(id);
    fetch(`https://course-backend.vercel.app/api/v1/order/${id}`, {
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
                  <Text className="text-white">Delete Successfull</Text>
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
      {myOrder.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pl-4 pr-6">
            {myOrder?.map(
              ({
                name,
                email,
                _id,
                paidPrice,
                status,
                productId,
                createdAt,
              }) => (
                <View
                  key={_id}
                  className="w-full h-40 bg-white rounded-3xl p-4"
                >
                  <View className=" flex flex-row gap-3 ">
                    <View className="w-[37.33vw]">
                      <View className=" h-">
                        <Text className=" text-gray-800 font-medium mt-">
                          {name}
                        </Text>
                        <Text className="text-[16px]  text-orange-600 font-medium">
                          {email}
                        </Text>
                      </View>
                    </View>

                    <View className="w-[27.33vw] pt-">
                      <Text className="text-[16px] font-medium mt-0">
                        {status}
                      </Text>
                      <Text className="text-[16px] font-medium mt">
                        {paidPrice} USD
                      </Text>
                    </View>
                    <View className="w-[33.33vw] flex ">
                      {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                      <TouchableOpacity
                        onPress={() => deleteHenedler(_id)}
                        className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center mt-2"
                      >
                        <Ionicons
                          name="trash"
                          size={22}
                          color={"#ea580c"}
                        ></Ionicons>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <Text className=" text-gray-800 font-medium mt-">
                      ProudctId - {productId}
                    </Text>
                    <Text className="text-gray-800 font-medium mt-">
                      Payment Date - {createdAt}
                    </Text>
                    <Text className=" text-gray-800 font-medium text-center mt-1">
                      1 Year Agreement
                    </Text>
                  </View>
                </View>
              )
            )}
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

export default AllPayment;
