import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Skeleton, VStack, Center } from "native-base";
const Loading = () => {
  return (
    <Center w="100%" h="85%">
      <VStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  );
};

export default Loading;

const styles = StyleSheet.create({});
