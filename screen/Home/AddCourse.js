import { View, Text, ScrollView, Image, Button } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Box, Center, useToast } from "native-base";

const AddCourse = () => {
  const [imageUri, setImageUri] = useState({});
  const [boxOneImage, setboxOneImage] = useState({});
  const [boxTwoImage, setTowOneImage] = useState({});
  const [boxThreeImage, setThreeeImage] = useState({});
  const [user] = useAuthState(auth);

  const handleImageSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result.type === "success") {
        setImageUri({
          uri: result.uri,
          name: result.name,
          type: result.type,
        });
     
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleboxOneImageSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result.type === "success") {
        setboxOneImage({
          uri: result.uri,
          name: result.name,
          type: result.type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleboxTwoImageSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result.type === "success") {
        setTowOneImage({
          uri: result.uri,
          name: result.name,
          type: result.type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleboxThreeImageSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result.type === "success") {
        setThreeeImage({
          uri: result.uri,
          name: result.name,
          type: result.type,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
 
  const onSubmit = async (data) => {
    const uri = imageUri.uri.split('/').pop()
    const lat = parseFloat(data?.courseLocationLat);
    const log = parseFloat(data?.courseLocation);

    const myForm = new FormData();

    myForm.append("name", data.name);
    myForm.append("category", data.category);
    myForm.append("description", data.description);
    myForm.append("Stock", data.Stock);
    myForm.append("email", user?.email);
    myForm.append("courseTitle", data.courseTitle);
    // // myForm.append("user", userId);
    // myForm.append('images', { uri: imageUri.uri, name: 'image.jpg', type: 'image/jpeg' });
    myForm.append("images", imageUri.uri);
    
    myForm.append("about", data.about);
    // myForm.append("mission", data.mission);
    // myForm.append("goal", data.goal);
    myForm.append("lat", lat);
    myForm.append("log", log);
    // myForm.append("boxOneImage", boxOneImage);
    myForm.append("boxOneTitle", data.boxOneTitle);
    // myForm.append("boxTwoImage", boxTwoImage);
    myForm.append("boxTwoTitle", data.boxTwoTitle);
    // myForm.append("boxThreeImage", boxThreeImage);
    myForm.append("boxThreeTitle", data.boxThreeTitle);
    await axios({
      method: "post",
      url: "http://192.168.31.235:5000/api/v1/courses/course",
      data: myForm,
      headers: {
        "Content-Type": "multipart/form-data",
        // authorization: `Bearer ${localStorage.getItem("UserToken")}`,
      },
    })
      .then((res) => {
        console.log(res)
        setImageUri({});
        setboxOneImage({});
        setTowOneImage({});
        setThreeeImage({});
        reset();
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
                <Text className="text-white">courses Added Success</Text>
              </Box>
            );
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="px-2 mt-5">
      {/* <View className=" h-24 bg-white rounded-lg shadow-md">
        <View className="px-4">
          <Text className=" text-xl font-medium mt-3 py-0">Hey, Mamun</Text>
          <Text className=" text-lg my-0 py-0">
            Good Morning, Add a new Course?
          </Text>
          <Text className="">Please Fill this form</Text>
        </View>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="h-[99%] bg-white   rounded-lg shadow-lg p-2"
      >
        <View className="flex justify-center px-2">
          <View className="">
            <SafeAreaView className="mt-5 pb-5">
              <View className="">
                <Text className="">Course Name</Text>
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
                      // secureTextEntry={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`${
                        error
                          ? " border-orange-500 border-2"
                          : "border-slate-200 border"
                      }   h-12 rounded-lg px-4 `}
                      placeholder="Enter Your Password"
                    />
                  )}
                  name="name"
                />
              </View>
              <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">Website Link</Text>
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
                        }   h-12 rounded-lg px-4 `}
                        placeholder="Enter Website Link"
                      />
                    )}
                    name="price"
                  />
                </View>
                <View className="w-[43vw]">
                  <Text className="">Phone number</Text>
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
                        }   h-12 rounded-lg px-4 `}
                        placeholder="Enter Phone number"
                      />
                    )}
                    name="category"
                  />
                </View>
              </View>
              <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">Number of usage</Text>
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
                        }   h-12 rounded-lg px-4 `}
                        placeholder="Enter Stock"
                      />
                    )}
                    name="Stock"
                  />
                </View>
                <View className="w-[43vw]">
                  <Text className="">Address</Text>
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
                        }   h-12 rounded-lg px-4 `}
                        placeholder="Enter Course Title"
                      />
                    )}
                    name="courseTitle"
                  />
                </View>
              </View>

              <View className="mt-4">
                <Text className="">Description</Text>
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
                      // secureTextEntry={true}
                      multiline={true}
                      numberOfLines={10}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`${
                        error
                          ? " border-orange-500 border-2"
                          : "border-slate-200 border"
                      }   h-12 rounded-lg px-4 `}
                      placeholder="Enter Description
                      "
                    />
                  )}
                  name="description"
                />
              </View>
              <View className="mt-4">
                <Text className="">About Course</Text>
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
                      // secureTextEntry={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`${
                        error
                          ? " border-orange-500 border-2"
                          : "border-slate-200 border"
                      }   h-12 rounded-lg px-4 `}
                      placeholder="Enter Your Password"
                    />
                  )}
                  name="about"
                />
              </View>
              {/* <View className="mt-4">
                <Text className="">Course Title</Text>
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
                      // secureTextEntry={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`${
                        error
                          ? " border-orange-500 border-2"
                          : "border-slate-200 border"
                      }   h-12 rounded-lg px-4 `}
                      placeholder="Enter Your Password"
                    />
                  )}
                  name="courseTitle"
                />
              </View> */}

              <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">Google Longitude code</Text>
                  <Controller
                    control={control}
                    // rules={{
                    //   // required: true,
                    // }}
                    render={({
                      field: { onChange, onBlur, value },
                      // fieldState: { error },
                    }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${"border-slate-200 border"}   h-12 rounded-lg px-4 `}
                        placeholder="Enter Stock"
                      />
                    )}
                    name="courseLocationLat"
                  />
                </View>

                <View className="w-[43vw]">
                  <Text className="">Google Latitude code</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({
                      field: { onChange, onBlur, value },
                      // fieldState: { error },
                    }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${"border-slate-200 border"}   h-12 rounded-lg px-4 `}
                        placeholder="Enter Course Title"
                      />
                    )}
                    name="courseLocation"
                  />
                </View>
              </View>
              {/* <Text className="text-red-500 mt-1 text-sm">
                Dear Admin, Google Longitude or Latitude put the code very
                carefully in the input field.Do Not Put Any alphabet or any
                fullstap comma in the code.
              </Text> */}

              <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <TouchableOpacity onPress={handleImageSelection}>
                    <View className=" w-36 h-24 border border-gray-200 rounded flex items-center justify-center">
                      <Ionicons
                        name="add-circle-outline"
                        size={45}
                        color={"#ea580c"}
                      ></Ionicons>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="w-[43vw]">
                  {imageUri.uri && (
                    <View className="h-24 relative border border-gray-200 rounded">
                      <Image
                        source={{ uri: imageUri.uri }}
                        className=" w-full h-24  rounded"
                      />

                      <View className="h-8 bo w- flex justify-center items-center border-orange-600 absolute right-0">
                        <TouchableOpacity onPress={() => setImageUri({})}>
                          <Ionicons
                            name="close-circle-outline"
                            size={30}
                            color={"#ea580c"}
                          ></Ionicons>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              <View className="mt-5">
                <Text className="text-lg">Optional filed</Text>

                <View className=" flex flex-row gap-2 mt-4">
                  <View className="w-[43vw]">
                    <TouchableOpacity onPress={handleboxOneImageSelection}>
                      <View className=" w-36 h-24 border border-gray-200 rounded flex items-center justify-center">
                        <Ionicons
                          name="add-circle-outline"
                          size={45}
                          color={"#ea580c"}
                        ></Ionicons>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="w-[43vw]">
                    {boxOneImage.uri && (
                      <View className="h-24 relative border border-gray-200 rounded">
                        <Image
                          source={{ uri: boxOneImage.uri }}
                          className=" w-full h-24  rounded"
                        />

                        <View className="h-8 bo w- flex justify-center items-center border-orange-600 absolute right-0">
                          <TouchableOpacity onPress={() => setboxOneImage({})}>
                            <Ionicons
                              name="close-circle-outline"
                              size={30}
                              color={"#ea580c"}
                            ></Ionicons>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <View className="mt-4">
                  <Text className="">Add Someting text</Text>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({
                      field: { onChange, onBlur, value },
                      // fieldState: { error },
                    }) => (
                      <TextInput
                        // secureTextEntry={true}
                        multiline={true}
                        numberOfLines={10}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${"border-slate-200 border"}   h-12 rounded-lg px-4 `}
                        placeholder="Enter Description
                      "
                      />
                    )}
                    name="boxOneTitle"
                  />
                </View>
                <View className=" flex flex-row gap-2 mt-4">
                  <View className="w-[43vw]">
                    <TouchableOpacity onPress={handleboxTwoImageSelection}>
                      <View className=" w-36 h-24 border border-gray-200 rounded flex items-center justify-center">
                        <Ionicons
                          name="add-circle-outline"
                          size={45}
                          color={"#ea580c"}
                        ></Ionicons>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="w-[43vw]">
                    {boxTwoImage.uri && (
                      <View className="h-24 relative border border-gray-200 rounded">
                        <Image
                          source={{ uri: boxTwoImage.uri }}
                          className=" w-full h-24  rounded"
                        />

                        <View className="h-8 bo w- flex justify-center items-center border-orange-600 absolute right-0">
                          <TouchableOpacity onPress={() => setTowOneImage({})}>
                            <Ionicons
                              name="close-circle-outline"
                              size={30}
                              color={"#ea580c"}
                            ></Ionicons>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <View className="mt-4">
                  <Text className="">Add Someting text</Text>
                  <Controller
                    control={control}
                    rules={
                      {
                        // required: true,
                      }
                    }
                    render={({
                      field: { onChange, onBlur, value },
                      // fieldState: { error },
                    }) => (
                      <TextInput
                        // secureTextEntry={true}
                        multiline={true}
                        numberOfLines={10}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${"border-slate-200 border"}   h-12 rounded-lg px-4 `}
                        placeholder="Enter Description
                      "
                      />
                    )}
                    name="boxTwoTitle"
                  />
                </View>
                <View className=" flex flex-row gap-2 mt-4">
                  <View className="w-[43vw]">
                    <TouchableOpacity onPress={handleboxThreeImageSelection}>
                      <View className=" w-36 h-24 border border-gray-200 rounded flex items-center justify-center">
                        <Ionicons
                          name="add-circle-outline"
                          size={45}
                          color={"#ea580c"}
                        ></Ionicons>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="w-[43vw]">
                    {boxThreeImage.uri && (
                      <View className="h-24 relative border border-gray-200 rounded">
                        <Image
                          source={{ uri: boxThreeImage.uri }}
                          className=" w-full h-24  rounded"
                        />

                        <View className="h-8 bo w- flex justify-center items-center border-orange-600 absolute right-0">
                          <TouchableOpacity onPress={() => setThreeeImage({})}>
                            <Ionicons
                              name="close-circle-outline"
                              size={30}
                              color={"#ea580c"}
                            ></Ionicons>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <View className="mt-4">
                  <Text className="">Add Someting text</Text>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: true,
                    // }}
                    render={({
                      field: { onChange, onBlur, value },
                      fieldState: { error },
                    }) => (
                      <TextInput
                        // secureTextEntry={true}
                        multiline={true}
                        numberOfLines={10}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className={`${"border-slate-200 border"}   h-12 rounded-lg px-4 `}
                        placeholder="Enter Description
                      "
                      />
                    )}
                    name="boxThreeTitle"
                  />
                </View>
              </View>

              <View className="mt-5">
                <TouchableOpacity
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                  // onPress={() => navigate("Home")}
                  className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
                >
                  <Text className="text-white  font-medium">Add Course</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddCourse;
