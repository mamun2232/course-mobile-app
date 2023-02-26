import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

export default function PaymentSuccess() {
  return (
    <View>
     <View className="flex  justify-center items-center h-screen  rounded-lg shadow">
          <Image
            className="w-[95vw] h-80 "
            source={require("../../assets/paymentSuccess2.gif")}
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})