import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useState } from "react";
import { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { Box, Toast } from "native-base";
const ConfromPayment = ({ route , navigation}) => {
  const [price] = useState(route.params.cost);
  const [user, setUserId] = useState("");
  const [shippingInfo, setshippingInfo] = useState({});
  const [orders, setOrderItems] = useState({});
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
  const stateChange = (navState) => {
      const {url , title} = navState
   
    if(title == "PayPal Sucess"){
//    database call 
     navigation.navigate("Payment Success")
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
        navigation.navigate("Payment Success")
       
        // localStorage.removeItem("SubTotalPrice");
        // // localStorage.removeItem("ShippingPrice");
        // localStorage.removeItem("TotalCost");
        // localStorage.removeItem("Discount");
        // localStorage.removeItem("Cart");
        // disPatch(cartClear());
        // disPatch(clearShippingTotalCostDiscount());
        // disPatch(clearSubTotal());
      }).catch((err) => console.log(err))
    }
  };
  return (
    <WebView
      source={{ uri: `http://192.168.31.235:5000/pay?price=${price}` }}
      startInLoadingState={true}
      onNavigationStateChange={stateChange}
    >
      {/* <Text>{price}</Text> */}
    </WebView>
  );
};

export default ConfromPayment;

const styles = StyleSheet.create({});
