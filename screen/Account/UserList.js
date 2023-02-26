import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Box, Toast } from 'native-base';
import AdminModal from './AdminModal';
export default function UserList() {
      const [user, setUser] = useState([]);
      const [fetchData, setFetch] = useState(false);
      const [isOpen, setIsOpen] = useState(false);
      const [id, setId] = useState("");
      
      useEffect(()=>{
            fetch(`http://192.168.31.235:5000/api/v1/user/user`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setUser(data?.user);
            //     setLoading(false);
                setFetch(false);
              } else {
            //     setLoading(false);
              }
            });
      },[fetchData , user])

      const deleteHenedler = (id) => {
            fetch(`http://192.168.31.235:5000/api/v1/user/delete/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.success) {
                  setFetch(true)
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
                              <Text className="text-white">User Delete Succssfull</Text>
                            </Box>
                          );
                        },
                      });
                 
                } else {
               
                }
              });
          };

          const makeAdminHendler = (id) =>{
            setIsOpen(true)
            setId(id)
          

           
          }


  return (
      <>
      {user.length !== 0 ? (
        <ScrollView className="mt-3" showsVerticalScrollIndicator={false}>
          <View className="flex gap-3 pb-20">
            {user?.map(({ name, email, _id, role }) => (
              <View key={_id} className="w-full h-32 bg-white rounded-3xl p-4">
                <View className=" flex flex-row gap-3 ">
                  <View className="w-[68.33vw]">
                    <View className=" h-">
                      <Text className=" text-gray-800 font-medium mt-">
                        {name}{" "}
                      </Text>
                      <Text className="text-[16px]  text-orange-600 font-medium">
                        {email}
                      </Text>
                      <Text className="text-[16px] font-medium mt-1">
                     Role- {role}
                    </Text>
                    </View>
                  </View>

              
                  <View className="w-[30.33vw] flex ">
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

                <TouchableOpacity onPress={() => makeAdminHendler(_id)}>
                  <View className="h-6  bg-orange-600 flex items-center justify-center rounded-lg mt-2">
                    <Text className="text-white">Make Admin</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
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
     { isOpen && <AdminModal isOpen={isOpen} id={id} setIsOpen={setIsOpen} setFetch={setFetch} />}
    </>
  )
}

const styles = StyleSheet.create({})