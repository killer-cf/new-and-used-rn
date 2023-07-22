import { useRoute } from "@react-navigation/native";
import { Box, HStack, Heading, Icon, Image, Pressable, Text, VStack, useTheme } from "native-base";

import { Header } from "@components/Header";
import { Plus, X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import ProductImage from "@assets/product.png"

type AdFormParams = {
  id: string
  name: string
}

export function AdForm() {
  const route = useRoute()
  const { colors } = useTheme()

  const params  = route.params as AdFormParams

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
      <Header title={`${params ? 'Editar' : 'Criar'} anúncio`} />

      <Heading fontFamily={"heading"} fontSize={'md'} color={"gray.600"} mt={6} mb={1}>
        Imagens
      </Heading>
      <Text color={"gray.500"} fontSize={'sm'}>
        Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
      </Text>
      <HStack mt={3}>
        <Box w={25} h={25} rounded={"lg"} overflow={"hidden"} mr={2}>
          <Image 
            source={ProductImage}
            w={"full"}
            h={"full"}
            resizeMode="cover"
          />
          <Pressable 
            position={"absolute"} 
            right={1} 
            top={1} 
            w={4} 
            h={4} 
            rounded={"full"} 
            bg={"gray.700"} 
            justifyContent={"center"} 
            alignItems={"center"} 
          >
            <Icon as={<X color={colors.gray[100]} size={10} weight="bold"/>}  />
          </Pressable>
        </Box>
        <TouchableOpacity>
          <Box w={25} h={25} justifyContent={"center"} alignItems={"center"} rounded={"lg"} bg={"gray.300"} >
            <Icon as={<Plus color={colors.gray[400]}/>}  />
          </Box>
        </TouchableOpacity>   
      </HStack>
    </VStack>
  )
}