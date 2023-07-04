import { HStack, Heading, Pressable, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Plus, Tag } from "phosphor-react-native";

import { Button } from "@components/Button";
import { UserAvatar } from "@components/UserAvatar";

export function Home() {
  const { colors } = useTheme()

  return (
    <VStack bg={"gray.100"} safeAreaTop flex={1} px={6} pt={5}>
      <HStack>
        <UserAvatar siz="md" source={{ uri: 'https://github.com/killer-cf.png'}} mr={3} />
        <VStack flex={1}>
          <Text fontFamily={'body'} color={"gray.700"} fontSize={"md"}>Boas vindas,</Text>
          <Heading fontFamily={"heading"} color={"gray.700"} fontSize={"md"}>Kilder!</Heading>
        </VStack>
        <Button
          ml={3} 
          text="Criar anúncio" 
          flex={1} 
          buttonColor="gray" 
          icon={<Plus color={colors.gray[100]} size={16}/>}
        />
      </HStack>

      <Heading color={"gray.500"} fontFamily={"body"} fontSize={'sm'} mt={8} mb={3}>
        Seus produtos anunciados para venda
      </Heading>
      <HStack px={4} py={3} bg={"blue.100"} alignItems={"center"} rounded={"lg"}>
        <Tag size={22} color={colors.blue[500]} />
        <VStack ml={4} flex={1}>
          <Text fontFamily={"heading"} fontSize={"xl"}>4</Text>
          <Text fontFamily={"body"}>anúncios ativos</Text>
        </VStack>
        <Pressable>
          <HStack alignItems={"center"}>
            <Text color={"blue.500"} fontFamily={"heading"} mr={3}>Meus anúncios</Text>
            <ArrowRight color={colors.blue[500]} />
          </HStack>  
        </Pressable>
      </HStack>
    </VStack>
  )
}