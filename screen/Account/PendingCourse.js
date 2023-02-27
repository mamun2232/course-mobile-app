import { Box, Toast } from "native-base";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const PendingCourse = ({ navigation }) => {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.31.235:5000/api/v1/courses/course")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setCourse(data.course);
        }
      });
  }, [course]);

  const deleteHenedler = (id) => {
    fetch(`http://192.168.31.235:5000/api/v1/courses/course/${id}`, {
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
  // if (loading) return <Loading />;

  const activeHendler = (id) => {
    fetch(`http://192.168.31.235:5000/api/v1/courses/course/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: "Active",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
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
                  <Text className="text-white"> Course Active Successfull</Text>
                </Box>
              );
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {course.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pl-4 pr-6">
            {course?.map(
              ({ name, price, Stock, category, status, _id }) =>
                status !== "Active" && (
                  <View
                    className="w-full h-32 bg-white rounded-3xl flex flex-row gap-3 p-1  "
                    key={_id}
                  >
                    <View className="w-[33.33vw]">
                      {/* <Image
                className="w-16 h-16 rounded-full  border-2 border-gray-800 "
                // style={{ width: 10, height: 50 }}
                source={{ uri: url }}
                  <Text className=" text-gray-800 font-medium">{name} </Text>
              /> */}
                      <View className=" h-14">
                        <Text className=" text-gray-800 font-medium mt-">
                          {name}{" "}
                        </Text>
                        {/* <Text className=" text-gray-800 font-medium mt-1">{price} </Text> */}
                      </View>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Course Details", { _id })
                        }
                      >
                        <View className="h-6  bg-slate-300 flex items-center justify-center rounded-lg mt-4">
                          <Text className=" text-red-600">Details</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View className="w-[33.33vw] pt-">
                      <Text className="text-[16px]  text-orange-600 font-medium">
                        {category}
                      </Text>
                      <Text className=" text-gray-800 ">{status} </Text>
                      <Text className="text-[16px] font-medium">
                        {Stock} limit
                      </Text>
                      <TouchableOpacity onPress={() => activeHendler(_id)}>
                        <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-3">
                          <Text className="text-white">Active Now</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View className="w-[33.33vw] flex   justify-center">
                      {/* <Text className="text-[16px] font-medium">{quantity} limit</Text> */}
                      <TouchableOpacity onPress={() => deleteHenedler(_id)}>
                        <View className="w-12 h-12 rounded-full bg-slate-200 flex  items-center justify-center">
                          <Ionicons
                            name="trash"
                            size={22}
                            color={"#ea580c"}
                          ></Ionicons>
                        </View>
                      </TouchableOpacity>
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

export default PendingCourse;
