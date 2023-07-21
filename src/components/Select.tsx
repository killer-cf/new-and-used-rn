import { Box, IInputProps, Icon, Input, Text, VStack } from "native-base";
import { Pressable, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons"
import { useState } from "react";

type Props = IInputProps & {
  selectOptions: string[]
  defaultOption: string
}

export function Select({ selectOptions, defaultOption, ...rest}: Props) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ selectedOption, setSelectedOption ] = useState(defaultOption)

  const SELECT_WIDTH = 30

  return (
    <Box>
      <Input
        value={selectedOption}
        fontFamily={"body"}
        borderColor={"gray.400"}
        h={9}
        px={4}
        py={1}
        w={SELECT_WIDTH}
        color={"gray.600"}
        fontSize={"md"}
        rounded={"xl"}
        borderWidth={1}
        isDisabled
        _focus={{
          borderWidth: 1,
          borderColor: "gray.600",
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        _disabled={{
          opacity: 1,
        }}
        InputRightElement={
          <Pressable onPress={() => setIsOpen(!isOpen)}>
            <Icon as={<SimpleLineIcons name={isOpen? "arrow-up" : "arrow-down"} />} size={4} mr="2" color="gray.400" />
          </Pressable>
        }
        {...rest}
      />
      { 
        isOpen && 
        <VStack position={"absolute"} top={10} w={SELECT_WIDTH} bg={"gray.100"} rounded={"lg"} shadow={'4'} p={3}>
          {selectOptions.map(option => (
            <TouchableOpacity onPress={() => setSelectedOption(option)}>
            <Text pb={3} fontFamily={option === selectedOption ? 'heading' : 'body'}>
              {option}
            </Text>
          </TouchableOpacity>
          ))}
        </VStack>
      } 
    </Box>
  )
}
