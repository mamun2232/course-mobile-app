import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Box, Toast } from "native-base";
import { Image } from "react-native";
const PaymentDetails = () => {
  const [myPayment, setPayment] = useState(false);
  const [payment , setPy] = useState({})
  const [user, loadings, error] = useAuthState(auth);
  useEffect(() => {
  
    fetch(`http://192.168.31.235:5000/api/v1/order/myPayment/${user?.email}   `)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPy(data?.order);
         
        } else {
          
        }
      }).catch((err) =>console.log(err))
  }, [payment]);
  

  // if (loading) {
  //   return <Loading />;
  // }

  const deleteHenedler = (id) => {
  
    fetch(`http://192.168.31.235:5000/api/v1/order/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
    { Object.keys(payment).length !== 0 ?
    <View className="mt-4 px-2">
      <TouchableOpacity
        onPress={() => setPayment(!myPayment)}
        className={`${
          myPayment ? "h-12" : "h-12"
        }  bg-white border border-gray-200  rounded-lg px-3 flex flex-row  justify-between items-center`}
      >
        <Text>My Payment Information</Text>
        <View>
          {myPayment ? (
            <Ionicons
              name="chevron-down"
              size={22}
              color={"#ea580c"}
            ></Ionicons>
          ) : (
            <Ionicons name="chevron-up" size={22} color={"#ea580c"}></Ionicons>
          )}
        </View>
      </TouchableOpacity>

      {myPayment && (
        <View className=" bg-white  border border-gray-200 rounded-lg px-2 h-44 mt-2 p-3">
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Name</Text>
            <Text className="">{payment.name}</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">{payment.status}</Text>
            <Text className={`${payment?.paidPrice == 0 ? "text-red-600 font-medium" : " font-medium text-gray-800"}`}>{payment?.paidPrice == 0 ? "Access Free" : "Paid"}</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Product Id</Text>
            <Text className="">{payment?.productId}</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Payment Price</Text>
            <Text className="">
              {" "}
              <Text className="">{payment?.paidPrice} USD</Text>
            </Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Date</Text>
            <Text className="">{payment?.createdAt}</Text>
          </View>
          <View className="flex flex-row gap-5">
            <Text className=" w-[30vw]">Agreement</Text>
            <Text className="">1 Year</Text>
          </View>
        </View>
      )}
    </View>
    :
     
    <View className=" flex  justify-center items-center h-screen  rounded-lg shadow">
          <Image
            className=" w-72 h-80"
            source={require("../../assets/payment33.gif")}
          />
        </View>
      }
    </>
  );
};

export default PaymentDetails;
