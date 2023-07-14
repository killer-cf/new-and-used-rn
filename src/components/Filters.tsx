import { HStack, Heading, Pressable, VStack, useTheme } from "native-base";
import { X } from "phosphor-react-native"
import { FilterTag } from "./FilterTag";

type Props = {
  onCloseModal: () => void
}

export function Filters({ onCloseModal}: Props) {
  const { colors } = useTheme()

  return (
    <VStack bg={"gray.200"} p={6} flex={1}>
      <HStack justifyItems={"center"} justifyContent={"space-between"} >
        <Heading fontSize={'xl'} mb={6} color={"gray.700"} fontFamily={"heading"}>
          Filtrar anúncios
        </Heading>
        <Pressable onPress={onCloseModal}>
          <X color={colors.gray[400]}/>
        </Pressable>
      </HStack>    

      <Heading fontFamily={"heading"} fontSize={'sm'} color={"gray.600"} >
        Condição
      </Heading>
      <HStack pt={3}>
        <FilterTag title="NEW" mr={2} />
        <FilterTag title="USED" />
      </HStack>  
    </VStack>
  )
}