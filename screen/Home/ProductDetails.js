import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Box, Button, Center, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Utilits/Loading";
import ModalButton from "./ModalButton";

const ProductDetails = ({ route, navigation }) => {
  const [id] = useState(route.params._id);
  const [product, setProduct] = useState(null);
  const [loadings, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  // const { navigate } = useNavigation();
  useEffect(() => {
    setLoading(true);
    fetch(`http://192.168.31.235:5000/api/v1/courses/course/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setProduct(data.course);
          setLoading(false);
        }
      }).catch((e)=>{
        console.log(e)
      })
  }, []);

  const discountHendler = () => {
    toast.show({
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
            <Text className="text-white">
              You need to subscribe to use this discount
            </Text>
            <Text
              className="text-white font-medium text-center"
              onPress={() => navigation.navigate("Personal Information")}
            >
              Use Discount
            </Text>
          </Box>
        );
      },
    });
  };
  return (
    <View>
      {loadings ? (
        <Loading />
      ) : (
        <View className="">
          {product != null && (
            <View className="  h-[82vh]  relative  ">
              <Image
                className="  rounded-b-3xl rounded-t-lg w-full h-[280px] px-5"
                // style={{ width: "100%", height: 250 }}
                source={{ uri: product?.images[0].url }}
              />

              <ScrollView
                className="w-full bg-white px-2 absolute   top-60  rounded-t-[50px] p-5 h-full "
                showsVerticalScrollIndicator={false}
              >
                <Text className="text-sm  text-gray-400">
                  {product?.category}
                </Text>
                <Text className="text-xl font-medium">{product?.name}</Text>
                <Text className="text-[16px] mt-1">{product?.courseTitle}</Text>
                <Text className="mt-1 text-[16px]">{product?.description}</Text>
                {/* <Text className="mt-1 text-xl  font-medium  text-orange-600">
              Price: {product?.price} USD
            </Text>
            <Text className="">Stock available: {product?.Stock} PSC</Text> */}

                <View className="mt-3">
                  <Text className="text-xl font-medium">
                    Other Information:
                  </Text>
                  <Text className=" text-[16px] text-gray-600">
                    <Text className="text-gray-900  font-medium">
                      Course About:
                    </Text>{" "}
                    {product?.about}
                  </Text>
                  <Text className="mt-1 text-[16px] text-gray-600">
                    <Text className="text-gray-900  font-medium">
                      Course Goal:
                    </Text>{" "}
                    {product?.goal}
                  </Text>
                  <Text className="mt-1 text-[16px] text-gray-600">
                    <Text className="text-gray-900  font-medium">
                      Course Mession:
                    </Text>{" "}
                    {product?.mission}
                  </Text>
                </View>
                <View className="mt-3 pb-10">
                  <Text className="text-xl font-medium">
                    Extera Information:
                  </Text>

                  <View>
                    <View
                      className={`${
                        product?.boxOneImage?.url || product.boxOneTitle !== ""
                          ? `border h-52 overflow-y-auto w-full
                  rounded  border-gray-200 shadow p-2`
                          : ``
                      }`}
                    >
                      <View className=" flex items-center">
                        {product?.boxOneImage?.url && (
                          <Image
                            className="  rounded-b-3xl rounded-t-lg w-32 h-20 px-5"
                            // style={{ width: "100%", height: 250 }}
                            source={{ uri: product?.boxOneImage?.url }}
                          />
                        )}
                      </View>
                      {product?.boxOneTitle && (
                        <Text className=" text-[16px] text-gray-600 mt-1">
                          {product?.boxOneTitle}
                        </Text>
                      )}
                    </View>
                    <View
                      className={`${
                        product?.boxTwoImage?.url || product.boxTwoTitle !== ""
                          ? `border h-52  overflow-scroll w-full
                  rounded  border-gray-200 shadow p-2 mt-2`
                          : ``
                      }`}
                    >
                      <View className=" flex items-center">
                        {product?.boxTwoImage?.url && (
                          <Image
                            className="  rounded-b-3xl rounded-t-lg w-32 h-20 px-5"
                            // style={{ width: "100%", height: 250 }}
                            source={{ uri: product?.boxTwoImage?.url }}
                          />
                        )}
                      </View>
                      {product?.boxTwoTitle && (
                        <Text className=" text-[16px] text-gray-600 mt-1">
                          {product?.boxTwoTitle}
                        </Text>
                      )}
                    </View>
                    <View
                      className={`${
                        product?.boxThreeImage?.url ||
                        product.boxThreeTitle !== ""
                          ? `border h-52 overflow-y-auto w-full
                  rounded  border-gray-200 shadow p-2  mt-2`
                          : ``
                      }`}
                    >
                      <View className=" flex items-center">
                        {product?.boxThreeImage?.url && (
                          <Image
                            className="  rounded-b-3xl rounded-t-lg w-32 h-20 px-5"
                            // style={{ width: "100%", height: 250 }}
                            source={{ uri: product?.boxThreeImage?.url }}
                          />
                        )}
                      </View>
                      {product?.boxThreeTitle && (
                        <Text className=" text-[16px] text-gray-600 mt-1">
                          {product?.boxThreeTitle}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                {/* <View className="pb-10">
              <TouchableOpacity className=" w-full  bg-orange-600 mt-5 h-14 rounded-3xl items-center justify-center">
                <Text className="text-white text-lg font-medium">
                  Go Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className=" w-full  bg-orange-600 mt-1 h-14 rounded-3xl items-center justify-center">
                <Text className="text-white text-lg font-medium">
                  Use Discount
                </Text>
              </TouchableOpacity>
            </View> */}
               
              </ScrollView>
            </View>
          )}
          <View className=" flex flex-row h-20 bg-white rounded gap-5 px-4 mt-2">
            <View className="w-[42vw]">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Course Location", {
                    let: product?.lat,
                    log: product?.log,
                  })
                }
                className="  bg-orange-600 h-12 rounded-xl items-center justify-center"
              >
                <Text className="text-white text-lg font-medium">
                  Chack Location
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-[42vw]">
              <TouchableOpacity
                onPress={() => discountHendler()}
                className="  bg-orange-600  h-12 rounded-xl items-center justify-center"
              >
                <Text className="text-white text-lg font-medium">
                  Use Discount
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {isOpen && <ModalButton isOpen={isOpen} setIsOpen={setIsOpen} />}
    </View>
  );
};

export default ProductDetails;
