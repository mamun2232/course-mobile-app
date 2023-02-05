import { View, Text } from 'react-native'
import React from 'react'
import { Actionsheet , Box } from 'native-base'

const ForgatePass = ({isOpen , onClose}) => {
  return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="16" color="gray.500" _dark={{
          color: "gray.300"
        }}>
            Albums
          </Text>
        </Box>
        <Actionsheet.Item>Delete</Actionsheet.Item>
        <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
        <Actionsheet.Item>Play</Actionsheet.Item>
        <Actionsheet.Item>Favourite</Actionsheet.Item>
        <Actionsheet.Item>Cancel</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default ForgatePass