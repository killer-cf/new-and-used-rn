import { useState } from "react";
import { Input as NativeBaseInput, IInputProps, Pressable, Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

type Props = IInputProps & {
  secure?: boolean
}

export function Input({secure = false, ...rest}: Props) {
  const [show, setShow] = useState(false);

  return (
    <NativeBaseInput
      bgColor={"gray.100"}
      h={12}
      px={4}
      py={3}
      placeholderTextColor={"gray.400"}
      color={"gray.600"}
      fontSize={"md"}
      rounded={'sm'}
      borderWidth={0}
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: "gray.600",
      }}
      _invalid={{
        borderWidth: 1,
        borderColor: "red.500"
      }}
      type={!secure || show ? "text" : "password"}
      InputRightElement={
        secure ? 
        <Pressable onPress={() => setShow(!show)}>
          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
        </Pressable>
        : <></>
      }
      {...rest}
    >

    </NativeBaseInput>
  )
}