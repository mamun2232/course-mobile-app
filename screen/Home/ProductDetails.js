import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ route }) => {
  const [id] = useState(route.params._id);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(
      `https://course-commerce-back-end.vercel.app/api/v1/courses/course/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setProduct(data.course);
        }
      });
  }, []);

  console.log(product);
  return (
    <View className="p-5">
      {product != null && (
        <View className="  h-[280px] relative  ">
          <Image
            className="  rounded-b-3xl rounded-t-lg w-full h-[280px] px-5"
            // style={{ width: "100%", height: 250 }}
            source={{ uri: product?.images[0].url }}
          />

          <ScrollView className="w-full bg-white px-2 absolute   top-60  rounded-t-[50px] p-5">
            <Text className="text-sm  text-gray-400">{product?.category}</Text>
            <Text className="text-2xl font-medium">{product?.name}</Text>
            <Text className="text-[15px]">{product?.courseTitle}</Text>
            <Text className="mt-1 text-[15px]">{product?.description}</Text>
            <Text className="mt-1 text-xl  font-medium  text-orange-600">
              Price: {product?.price} USD
            </Text>
            <Text className="">Stock available: {product?.Stock} PSC</Text>

            <View className="mt-3">
              <Text className="text-lg">Order Information:</Text>
              <Text className="mt-1 text-[15px] text-gray-600">
                About: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, sit!
              </Text>
              <Text className="mt-1 text-[15px] text-gray-600">
                Goal: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Atque, nulla. Eligendi blanditiis ullam magni natus!
              </Text>
              <Text className="mt-1 text-[15px] text-gray-600">
                Mission: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ratione dignissimos repellat ipsa, excepturi rem ducimus.
              </Text>
            </View>
            <TouchableOpacity className=" w-full  bg-orange-600 mt-5 h-14 rounded-3xl items-center justify-center">
              <Text className="text-white text-lg font-medium">
                Add To Cart
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
