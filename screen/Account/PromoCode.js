import { Image, StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Box, Toast } from "native-base";
const PromoCode = () => {
  const [allPromoCode, setAllPromoCode] = useState([]);
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    fetch(
      "https://course-backend.vercel.app/api/v1/courses/course/getAllPromoCode",
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAllPromoCode(data.promeCode);
        } else {
          // toast.error("something went wrong");
        }
      })
      .catch((err) => console.log(err));
  }, [allPromoCode]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({amount , usageLimit, code}) => {
    const discountPercent ={
      amount, usageLimit, code,
      expiresAt: date}
    fetch(`https://course-backend.vercel.app/api/v1/courses/course/generate-discount-code/${amount}`, {
            method: 'POST',
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(discountPercent),
        })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
                if (data.success) {
                    
                    reset()
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
                            <Text className="text-white">Generated Promo code successFully</Text>
                          </Box>
                        );
                      },
                    })
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
                          <Text className="text-white">Someting Is Worng!</Text>
                        </Box>
                      );
                    },
                  })
                }
            }).catch((err) => console.log(err))
  };

  // delete hundler 
  const handleDelete = (id) => {
    fetch(`https://error-ten.vercel.app/api/v1/courses/course/delete-discount-code/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Parsed JSON data:', data);
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
                        <Text className="text-white">Promo code deleted</Text>
                      </Box>
                    );
                  },
                })
                // setAllPromoCode(allPromoCode.filter((code) => code._id !== id));
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
                      <Text className="text-white">Something was wrong</Text>
                    </Box>
                  );
                },
              })
             
            }
        })
        .catch((error) => {
            console.error('There was a problem with the delete operation:', error);
        });
};
  return (
    <View className="mt-4 px-2">
      <View className="bg-white rounded-lg  h-80 px-4">
        <View className=" flex flex-row gap-2 mt-1">
          <View className="w-[43vw]">
            <Text className="">Discount Percentage</Text>
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
                  placeholder="Enter discount percentage"
                />
              )}
              name="amount"
            />
          </View>

       
          <View className="w-[43vw]">
            <Text className="">Number of usage</Text>
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
                  placeholder="Enter validity Limit / Number of uses"
                />
              )}
              name="usageLimit"
            />
          </View>
        </View>
        <View className="  mt-1">
          <View className="w">
            <Text className="">Promo Code</Text>
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
                  placeholder="Enter your discount code"
                />
              )}
              name="code"
            />
          </View>
        </View>
        <View className=" flex flex-row gap-2 mt-1">
          <View className="w-[20vw]">
          <Text className="">Expire Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Image
                className="w-20 h-20"
                source={require("../../assets/calenderpng.png")}
              ></Image>
            </TouchableOpacity>
          </View>

        
          <View className="w-[43vw] flex justify-center">
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShowDatePicker(false);
                  setDate(currentDate);
                }}
              />
            )}

            <Text className=" font-medium text-smd">
              {date.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View className="mt-1">
          <TouchableOpacity
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            // onPress={() => navigate("Home")}
            className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
          >
            <Text className="text-white  font-medium"> Generate Promo Code</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className=" h-[48vh] bg-white rounded mt-3 ">
        <>
          {allPromoCode.length !== 0 ? (
            <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
              <View className="flex gap-3 pl-4 pr-6 pb-5">
                {allPromoCode?.map(
                  ({
                    _id,
                    expiresAt,
                    usageLimit,
                    amount,
                    code,
                  }) => (
                    <View
                      key={_id}
                      className="w-full  bg-orange-600 rounded-3xl p-4 "
                    >
                      <View className=" flex flex-row gap-3 ">
                        <View className="w-[67.33vw]">
                          <View className=" h-">
                            <Text className=" text-white font-medium mt-">
                              Code: {code}
                            </Text>
                            <Text className="  text-white font-medium">
                              Total Limit: {usageLimit}
                            </Text>
                            <Text className=" font-medium mt-0  text-white">
                              Discount Percentige: {amount}
                            </Text>
                            <Text className="font-medium mt-0  text-white">
                            Expire Date: {expiresAt}
                            </Text>
                          </View>
                        </View>

                        <View className="w-[33.33vw] flex ">
                          {/* <Text className="text-[16px] font-medium">{Stock} limit</Text> */}

                          <TouchableOpacity
                            onPress={() => handleDelete(_id)}
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
      </ScrollView>
    </View>
  );
};

export default PromoCode;

const styles = StyleSheet.create({});
