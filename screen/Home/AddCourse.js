import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
const AddCourse = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
//     navigation.navigate("Payment");
  };
  return (
    <View className="px-2 mt-5">
      <View className=" h-24 bg-white rounded-lg shadow-md">
        <View className="px-4">
          <Text className=" text-xl font-medium mt-3 py-0">Hey, Mamun</Text>
          <Text className=" text-lg my-0 py-0">
            Good Morning, Add a new Course?
          </Text>
          <Text className="">Please Fill this form</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="h-[85%] bg-white mt-3  rounded-lg shadow-lg p-2">
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
                  name="email"
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
                    name="name"
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
                    name="name"
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
                    name="name"
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
                    name="name"
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
                  name="email"
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
                  name="address"
                />
              </View>
             
              <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">Google Longitude code</Text>
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
                    name="name"
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
                    name="name"
                  />
                </View>
                
              </View>
              <Text className="text-red-500 mt-1 text-sm">Dear Admin, Google Longitude or Latitude put the code very carefully in the input field.Do Not Put Any alphabet or any fullstap comma in the code.</Text>



              <View className="mt-4">
                <Text className="">Picture</Text>
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
                  name="country"
                />
              </View>

              <View className="mt-5">
                  <Text className="text-lg">Optional filed</Text>

                  <View className=" flex flex-row gap-2 mt-1">
                <View className="w-[43vw]">
                  <Text className="">box-1 image</Text>
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
                    name="name"
                  />
                </View>
                <View className="w-[43vw]">
                  <Text className="">Add Someting text</Text>
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
                    name="name"
                  />
                </View>
              </View>
           
                  <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">box-2 image</Text>
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
                    name="name"
                  />
                </View>
                <View className="w-[43vw]">
                  <Text className="">Add Someting text</Text>
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
                    name="name"
                  />
                </View>
              </View>
           
                  <View className=" flex flex-row gap-2 mt-4">
                <View className="w-[43vw]">
                  <Text className="">box-3 image</Text>
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
                    name="name"
                  />
                </View>
                <View className="w-[43vw]">
                  <Text className="">Add Someting text</Text>
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
                    name="name"
                  />
                </View>
              </View>
           

              </View>

              <View className="mt-5">
                <TouchableOpacity
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                  // onPress={() => navigate("Home")}
                  className=" border h-12 rounded-lg px-4 bg-orange-600 border-slate-200 flex items-center justify-center "
                >
                  <Text className="text-white  font-medium">
                    Add Course
                  </Text>
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
