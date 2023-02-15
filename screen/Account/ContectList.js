import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Toast } from "native-base";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const ContectList = () => {
      const [contect, setContect] = useState([]);
      const [loading, setLoading] = useState(false);
      const [refetch, setReFetch] = useState(false);
     
    
      useEffect(() => {
        setLoading(true);
        fetch("http://192.168.31.235:5000/api/v1/contect/contect")
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setContect(data.contect);
              setLoading(false);
              setReFetch(false);
            } else {
              setLoading(false);
              setReFetch(false);
            }
          });
      }, [refetch]);
      
      // if (loading) return <Loading />;
    
      const contectDeleteHendeler = (id) => {
        fetch(`http://192.168.31.235:5000/api/v1/contect/contect/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setReFetch(true);
              swal({
                title: "Message Delete Successfull",
                text: "Thank you Sir",
                icon: "success",
                buttons: [false],
              });
            } else {
            }
          });
      };
    
  return (
      <>
      {contect.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pl-4 pr-6">
            {contect?.map(
              ({
                name,
                email,
                _id,
                phone,
                message
              }) => (
                <View
                  key={_id}
                  className="w-full  bg-white rounded-3xl p-4"
                >
                  <View className=" flex flex-row gap-3 ">
                    <View className="w-[67.33vw]">
                      <View className=" h-">
                        <Text className=" text-gray-800 font-medium mt-">
                          {name}
                        </Text>
                        <Text className="text-[16px]  text-orange-600 font-medium">
                          {email}
                        </Text>
                        <Text className="text-[16px] font-medium mt-0">
                        {phone}
                      </Text>
                      </View>
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
                    <Text className=" text-gray-800 font-medium mt-2">
                      User Message - {message}
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
            className=" w-72 h-80"
            source={require("../../assets/noAvailbe.gif")}
          />
        </View>
      )}
    </>
  )
}

export default ContectList