import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

const Cart = () => {
  const product = [
    {
      name: "Nike aik Max 200",
      price: "230",
      url: "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17305046/2022/2/26/d3e17ae1-f482-42d1-bc3b-a46afb1a25c01645858426508KillerMenNavyBlueSlip-OnSneakers1.jpg",
      quantity: "1",
    },
    {
      name: "Smart Panjabi",
      price: "200",
      url: "https://nikotbazar.com.bd/wp-content/uploads/2021/07/Black-Punjabi-Collection-Nikot-Bazar.jpg",
      quantity: "1",
    },
    {
      name: "Arabian burka",
      price: "170",
      url: "https://media.istockphoto.com/id/507867030/photo/beautiful-muslim-woman-wearing-a-burka.jpg?s=612x612&w=0&k=20&c=ag-QQ2atUc0h9HI-hlYf206XQcMn-WvD0SzPBYLIK7U=",
      quantity: "1",
    },
    {
      name: "Smart Man T-shart",
      price: "200",
      url: "https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/2fdbd7ab-f378-4c63-8b21-c944ad2633fd/header_t-shirts2.jpg",
      quantity: "1",
    },
    {
      name: "Smart Tv",
      price: "230",
      url: "https://aws-obg-image-lb-1.tcl.com/content/dam/brandsite/region/south-korea/blog/TCL-smart-TV.png",
      quantity: "1",
    },
  ];
  return (
    <ScrollView className="mt-3 ">
      <View className="flex gap-3 pl-4 pr-6">
        {product.map(({ name, url, price, quantity }) => (
          <View
            className="w-full h-24 bg-white rounded-3xl flex flex-row gap-3 p-1  "
            key={name}
          >
            <View className="w-[26.33vw]">
              <Image
                className="w-16 h-16 rounded-full  border-2 border-gray-800 "
                // style={{ width: 10, height: 50 }}
                source={{ uri: url }}
              />
            </View>

            <View className="w-[38.33vw] pt-2">
              <Text className=" text-gray-800 font-medium">{name} </Text>
              <Text className="text-[16px]  text-orange-600 font-medium">
                {price} USD
              </Text>
            </View>
            <View className="w-[33.33vw] pt-4">
              <Text className="text-[16px] font-medium">{quantity} </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Cart;
