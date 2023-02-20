import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import { useState } from "react";

const ConfromPayment = ({ route , navigation}) => {
  const [price] = useState(route.params.cost);
  const stateChange = (navState) => {
      const {url , title} = navState
    console.log(navState);
    if(title == "PayPal Sucess"){
//    database call 
     navigation.navigate("Payment Success")
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
