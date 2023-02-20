import { View, Text } from 'react-native'
import React from 'react'
import { Actionsheet , Box , Center} from 'native-base'
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';

const ForgatePass = ({isOpen , onClose}) => {
  const [sendingTextShow , setSendingTextShow] = useState("")
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSendingTextShow("Dear User, Please Chack Email")
  }
  return (
    <Center>
    {/* <Button onPress={onOpen}>Actionsheet</Button> */}
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        
        <Actionsheet.Item>
          <View className="h-[220px]">
            <Text className="text-[16px] font-medium">Hey, You Can Change Password?</Text>
            <View className="mt-5 w-full">
                  <Text className="">Email</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${
                          error
                            ? " border-orange-500 border-2"
                            : "border-slate-200 border"
                        }   h-12 rounded-lg px-4 w-[90vw] mt-1`}
                        placeholder="Enter Your Email"
                      />
                    )}
                    name="password"
                  />
                </View>
                <View className="mt-3">
              <TouchableOpacity
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                // onPress={() => navigate("Home")}
                className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
              >
                <Text className="text-white  font-medium">Submit Now</Text>
              </TouchableOpacity>

             {sendingTextShow &&  <Text className="mt-1 text-orange-600">{sendingTextShow}</Text>}
           
            </View>
          </View>


        </Actionsheet.Item>
        {/* <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
        <Actionsheet.Item>Play</Actionsheet.Item>
        <Actionsheet.Item>Favourite</Actionsheet.Item>
        <Actionsheet.Item>Cancel</Actionsheet.Item> */}
      </Actionsheet.Content>
    </Actionsheet>
  </Center>
  )
}

export default ForgatePass