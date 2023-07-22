import { Button as NativeBaseButton, IButtonProps, Text, Icon, HStack } from "native-base"
import { ReactNode } from "react"

const COLORS = {
  gray: 'gray.700',
  blue: 'blue.500',
  'light-blue': 'lightBlue.500',
  'white-gray': 'gray.300'
} as const

type Props = IButtonProps & {
  text: string
  buttonColor?: keyof typeof COLORS
  icon?: ReactNode
}

export function Button({ icon, buttonColor = 'blue', text, ...rest}: Props) {
  return (
    <NativeBaseButton
      w={"full"}
      p={3}
      bgColor={COLORS[buttonColor]}
      rounded={"lg"}
      {...rest}
    > 
      <HStack
        alignItems={"center"}
      >
        {
        icon &&
          <Icon
            color={buttonColor === 'white-gray' ? 'gray.700': "gray.100"}
            mr={2}
            size={4}
            as={icon}
      />
      }
      
      <Text 
        fontSize={"sm"} 
        fontFamily={"heading"} 
        color={buttonColor === 'white-gray' ? 'gray.700': "gray.100"}
      >
        {text}
      </Text>
      </HStack>
      
    </NativeBaseButton>
  )
}