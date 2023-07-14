import { Center, HStack, Text, useTheme } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { X } from "phosphor-react-native";

type Props = IHStackProps & {
  selected?: boolean
  title: 'NEW' | 'USED'
}

export function FilterTag({ title, selected = false, ...rest}: Props) {
  const { colors } = useTheme()

  return (
    <HStack 
      bg={selected ? "lightBlue.500": "gray.300"}
      px={2}
      rounded={"full"}
      w={19}
      h={7}
      alignItems={"center"}
      justifyContent={"center"}
      {...rest}
    >
      <Text fontSize={'xs'} fontFamily={"heading"} color={selected ? "white" : "gray.500"} pr={2}>
        {title}
      </Text>
      {
        selected &&
          <Center rounded={"full"} w={4} h={4} bg={"gray.200"}>
            <X color={colors.lightBlue[500]} size={10} weight="bold" />
          </Center>
      }
    </HStack>
  )
}