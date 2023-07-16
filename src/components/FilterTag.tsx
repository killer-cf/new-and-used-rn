import { Center, HStack, IPressableProps, Pressable, Text, useTheme } from "native-base";
import { X } from "phosphor-react-native";

type Props = IPressableProps & {
  selected?: boolean
  title: 'NOVO' | 'USADO'
}

export function FilterTag({ title, selected = false, ...rest}: Props) {
  const { colors } = useTheme()

  return (
    <Pressable 
      px={2}
      rounded={"full"}
      w={19}
      h={7}
      alignItems={"center"}
      justifyContent={"center"}
      bg={selected ? "lightBlue.500": "gray.300"}
      {...rest}
    >
      <HStack
      >
        <Text fontSize={'xs'} fontFamily={"heading"} color={selected ? "white" : "gray.500"} >
        {title}
      </Text>
      {
        selected &&
          <Center rounded={"full"} w={4} h={4} bg={"gray.200"} ml={2}>
            <X color={colors.lightBlue[500]} size={10} weight="bold" />
          </Center>
      }
      </HStack>
      
    </Pressable>
  )
}