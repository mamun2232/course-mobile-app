import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  Box,
  Button,
  Center,
  CheckIcon,
  Menu,
  Select,
  Toast,
  VStack,
} from "native-base";
import { TextInput } from "react-native";
import { AsyncStorage } from "react-native";
export default function AdminModal({ isOpen, setIsOpen, id, setFetch }) {
  const [user, setUser] = useState({});
  const onClose = () => setIsOpen(!isOpen);
  const [shouldOverlapWithTrigger] = useState(false);
  const [position, setPosition] = useState("Please Select Role");
  const cancelRef = React.useRef(null);
  const [token, SetToken] = useState("");
  useEffect(() => {
    reeData();
    fetch(`https://course-backend.vercel.app/api/v1/user/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data?.user);
          // setUser(data?.user);
          // setLoading(false);
        } else {
          // setLoading(false);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(token);
  // get data to mobile store
  const reeData = async () => {
    try {
      const value = await AsyncStorage.getItem("Token");

      if (value !== null) {
        // We have data!!
        SetToken(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const makeUserAdminHendeler = () => {
    fetch(
      `https://course-backend.vercel.app/api/v1/user/admin/${user?.email}?roleAction=${position}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // disPatch(fetchUser());
          // disPatch(fetchAdmin());
          // toast("Admin Make Successfull");
          // closeModal();
          setIsOpen(false);
          setFetch(true);
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
                  <Text className="text-white">Admin Make Successfull</Text>
                </Box>
              );
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Center>
      {/* <Button shadow={2} colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
        Delete Customer
      </Button> */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Make A Website Admin </AlertDialog.Header>
          {/* {user.name} */}
          <AlertDialog.Body>
            <View>
              <TextInput
                name="email"
                value={user?.name}
                className={` border-slate-200 border
                       h-12 rounded-lg px-4 `}
                placeholder="Enter Your Email"
              />
            </View>
            <View className="mt-2">
              <TextInput
                name="email"
                value={user?.email}
                className={` border-slate-200 border
                       h-12 rounded-lg px-4 `}
                placeholder="Enter Your Email"
              />
            </View>
            <View className="mt-2">
              <VStack space={6} alignSelf="flex-start" w="100%">
                <Select
                  selectedValue={position}
                  mx={{
                    base: 0,
                    md: "auto",
                  }}
                  onValueChange={(nextValue) => setPosition(nextValue)}
                  _selectedItem={{
                    bg: "cyan.600",
                    endIcon: <CheckIcon size={4} />,
                  }}
                  accessibilityLabel="Select a position for Menu"
                >
                  <Select.Item
                    label="Please Select Role"
                    value="Please Select Role"
                  />
                  <Select.Item label="Adviser" value="Adviser" />
                  <Select.Item label="owner" value="owner" />
                  {/* <Select.Item label="Top Right" value="top right" />
                  <Select.Item label="Right Top" value="right top" />
                  <Select.Item label="Right" value="right" />
                  <Select.Item label="Right Bottom" value="right bottom" />
                  <Select.Item label="Bottom Left" value="bottom left" />
                  <Select.Item label="Bottom" value="bottom" />
                  <Select.Item label="Bottom Right" value="bottom right" />
                  <Select.Item label="Left Top" value="left top" />
                  <Select.Item label="Left" value="left" />
                  <Select.Item label="Left Bottom" value="left bottom" /> */}
                </Select>
              </VStack>
            </View>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <>
              <Button
                className="w-full bg-orange-600 text-white"
                colorScheme="danger"
                onPress={() => makeUserAdminHendeler()}
              >
                Make Admin
              </Button>
            </>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}

const styles = StyleSheet.create({});
