import { useNavigation } from "@react-navigation/native";
import { Pressable, HStack, Heading } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { ArrowLeft } from "phosphor-react-native";
import { ReactNode } from "react";

type Props = IHStackProps & {
  title?: string
  noBackButton?: boolean
  iconRight?: ReactNode
  onPressIconRight?: () => void
}

export function Header({ title, noBackButton = false, iconRight, onPressIconRight, ...rest }: Props) {
  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  return (
    <HStack justifyContent={"space-between"} w={"full"} alignItems={"center"} {...rest}>
      <Pressable w={7} onPress={handleBack}>
        { !noBackButton && <ArrowLeft size={26}  weight="bold" />} 
      </Pressable>    
      <Heading flex={1} textAlign={"center"} fontFamily={"heading"} fontSize={"2xl"}>
        {title}
      </Heading>
      <Pressable w={7} onPress={onPressIconRight}>
        {iconRight}
      </Pressable>     
    </HStack>
  )
}