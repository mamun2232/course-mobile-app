import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Utilits/Loading";
const Home = ({navigation}) => {
  const [products, setProudct] = useState([]);
  // const { navigate } = useNavigation();
  const [loadings, setLoading] = useState(false);
  const cetagory = [
    { name: "Showes" },
    { name: "T-shart" },
    { name: "Hijab" },
    { name: "Laptop" },
    { name: "Tv" },
    { name: "Burka" },
    { name: "Course" },
    { name: "Pankabi" },
  ];

  useEffect(() => {
    setLoading(true)
    fetch("http://192.168.31.235:5000/api/v1/courses/course")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProudct(data.course);
          setLoading(false)
        }
      })
      .catch((e)=>{
        console.log(e)
      })
  }, []);

  return (
    <ScrollView className=""  showsVerticalScrollIndicator={false}>
      <View className=" px-5 pb-4 pt-3 bg-white  sticky top-0">
        <View className="mt h-12  relative">
          <TextInput
            className=" border h-12 rounded-lg px-4 border-slate-300"
            placeholder=" Search Your product"
          />
          <TouchableOpacity className=" absolute top-3 right-4">
            <Ionicons name="search" size={22} color={"#ea580c"}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="px-5 py-3">
        <View className="">
          <Text className="text-xl">All Catagory</Text>
         
          <View className="mt-2 ">
            <FlatList
              className="text-center"
              data={cetagory}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity className="  bg-white shadow-lg  mr-5 px-6 py-3 rounded-lg">
                    <Text> {item.name} </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View> */}

      {loadings ? (
        <Loading />
      ) : (
        <View className="flex-row flex-wrap ">
          {products?.map(({ _id, name, images }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Course Details", { _id })}
                className=" w-[50%] h-[250px]  p-3"
                key={_id}
              >
                <View>
                  <View className="bg-white h-[225px] p-3 rounded-lg shadow-sm items-center">
                    <View>
                      <Image
                        className=" rounded-lg"
                        style={{ width: 150, height: 110 }}
                        source={{ uri: images[0].url }}
                      />
                    </View>

                    <View className="w-full mt-3 ">
                      <View className="w-full  bg-slate-100 py-2 h-20 items-center rounded-b-lg px-1">
                        <Text className="">{name}</Text>
                        {/* <Text className="text-orange-600  font-medium text-[16px] ">
                        {price} USD
                      </Text> */}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
