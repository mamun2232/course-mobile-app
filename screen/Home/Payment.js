import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { TouchableOpacity , Image} from "react-native";
import { TextInput } from "react-native";
import { WebView } from 'react-native-webview';
import { Box, Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { useEffect } from 'react';

const Payment = ({navigation}) => {
  const [cost , setCost] = useState(30)
  const [isDiscount, setIsDiscountCode] = useState(false);
  const [user, setUserId] = useState("");
  const [shippingInfo, setshippingInfo] = useState({});
  const [orders, setOrderItems] = useState({});
  console.log(orders)
      const {
            control,
            handleSubmit,
            reset,
            formState: { errors },
          } = useForm();

          useEffect(()=>{
            reeData()
          },[])

          const reeData = async () => {
            try {
              const value = await AsyncStorage.getItem("userId");
              const shipping = await AsyncStorage.getItem("shippingInfo");
              const order = await AsyncStorage.getItem("cart");
              const shippingD = JSON.parse(shipping)
              const orderItem = JSON.parse(order)
              if (value !== null) {
                // We have data!!
                setUserId(value);
                setshippingInfo(shippingD);
                setOrderItems(orderItem)
              }
            } catch (error) {
              // Error retrieving data
            }
          };
        
          const onSubmit = ({code}) => {
            fetch(`http://192.168.31.235:5000/api/v1/courses/course/validatePromo/${code}`,
              {
                method: "Get",
                headers: {
                  "Content-type": "application/json",
                }
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                if (data.success) {
                  
                  const tk = (data.discount.amount * cost) / 100;
                  setCost(cost - tk);
                  setIsDiscountCode(true);
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
                          <Text className="text-white"> {`congaculation you have ${data?.discount?.amount}% Descount.Happy Shopping`}</Text>
                        </Box>
                      );
                    },
                  }).catch((err) => console.log(err))
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
                          <Text className="text-white"> {`Sorry Promo code Dont Match`}</Text>
                        </Box>
                      );
                    },
                  })
                 
                 reset()
                }
              }).catch((err) => console.log(err))
          };
      
          const getFreeCourseAccessHendler = () => {
            const orderItems = {
              id: orders?._id,
              quantity: orders?.Stock
            }
            const data = {
              shippingInfo,
              orderItems,
            };
        
            fetch(`http://192.168.31.235:5000/api/v1/order/new`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${localStorage.getItem("UserToken")}`,
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.success) {
                }
              }).catch((err) => console.log(err))
        
            const paymentInfo = {
              orderItems,
              // name: user?.displayName,
              // email: user?.email,
              paidPrice: cost,
              shippingInfo,
              emails: user,
            };
            fetch(`http://192.168.31.235:5000/api/v1/order/post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // authorization: `Bearer ${localStorage.getItem("UserToken")}`,
              },
              body: JSON.stringify(paymentInfo),
            })
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                
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
                        <Text className="text-white">Congratulation All Courses Accesss Successfull</Text>
                      </Box>
                    );
                  },
                })
                // localStorage.removeItem("SubTotalPrice");
                // // localStorage.removeItem("ShippingPrice");
                // localStorage.removeItem("TotalCost");
                // localStorage.removeItem("Discount");
                // localStorage.removeItem("Cart");
                // disPatch(cartClear());
                // disPatch(clearShippingTotalCostDiscount());
                // disPatch(clearSubTotal());
              }).catch((err) => console.log(err))
          };
  
  return (
      <View className="  flex justify-center px-4">
      <View className="h-[84%] bg-white mt-10  rounded-lg shadow-lg p-4">
        <View className=" flex items-center">
        <Image
            className="w-52 h-40"
            source={require("../../assets/payment2.gif")}
          />
        </View>
        <Text className="text-lg mt-10">Pay your yearly subscription fee</Text>
        <View className="h-[1px] bg-slate-500 mt-2"></View>
        <View className="mt-2 flex flex-row justify-between">
            <Text className="text-lg font-medium">Total Cost</Text>
            <Text className="text-lg font-medium">${cost} USD</Text>

        </View>
        
        <SafeAreaView className="mt-10"> 
        <Text className=" font-medium text-lg">GOT A PROMO CODE?</Text>
          <View className="h-12 relative">
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
                  placeholder="Enter Your Promo code"
                />
              )}
              name="code"
            />

            <View className=" absolute mt-1 right-0 px-1">
            <TouchableOpacity
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              className=" border h-10 w-28 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Apply Code</Text>
            </TouchableOpacity>
            </View>
          </View>

          

          <View className="mt-20">
            {
              parseInt(cost) == 0 ? <TouchableOpacity
              // title="Submit"
              onPress={()=>getFreeCourseAccessHendler()}
              // onPress={() => navigate("Home")}
              className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Access Course</Text>
            </TouchableOpacity>

            :
            <TouchableOpacity
              title="Submit"
              onPress={()=>navigation.navigate("Confirm Payment", {cost})}
              // onPress={() => navigate("Home")}
              className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
            >
              <Text className="text-white  font-medium">Pay With Paypal</Text>
            </TouchableOpacity>
            }
            
          </View>
        </SafeAreaView>
      </View>
    </View>
  
  )
}

export default Payment