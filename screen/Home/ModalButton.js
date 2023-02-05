import { View, Text } from 'react-native'
import React from 'react'
import { AlertDialog } from "native-base";
import { Skeleton, VStack, Center , Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
const ModalButton = ({isOpen , setIsOpen }) => {

  const {navigate} = useNavigation()
     

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
      <Center>
      
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          {/* <AlertDialog.CloseButton /> */}
          {/* <AlertDialog.Header>Delete Customer</AlertDialog.Header> */}
          <AlertDialog.Body>
            
          You need to subscribe to use this discount
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <View className=" flex flex-row">
              <Button w="50%" variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cancel
              </Button>
              <Button w="50%" colorScheme="danger" onPress={()=> navigate("Personal Information")}>
              Use Discount
              </Button>
            </View>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

export default ModalButton