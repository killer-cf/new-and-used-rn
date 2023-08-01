import { useContext } from "react";
import { Box, Divider, HStack, Heading, Pressable, ScrollView, Text, VStack, View, useTheme } from "native-base";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag } from "phosphor-react-native";

import { Button } from "@components/Button";
import { UserAvatar } from "@components/UserAvatar";
import { Input } from "@components/Input";
import { AdCard } from "@components/AdCard";
import { ModalContext } from "@contexts/FilterModalProvider";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

export function Home() {
  const { colors } = useTheme()
  const ads = [1,2,3,4,5,6,7,8,9]
  const { openModal } = useContext(ModalContext)
  const { user } = useAuth()

  const adsPairs: any = []
  for (let i = 0; i < ads.length; i += 2) {
    adsPairs.push([ads[i], ads[i + 1]])
  }

  function handlePresentModalPress() {
    openModal()
  }

  return (
      <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <HStack>
            <UserAvatar siz="md" source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}} mr={3} />
            <VStack flex={1}>
              <Text fontFamily={'body'} color={"gray.700"} fontSize={"md"}>Boas vindas,</Text>
              <Heading fontFamily={"heading"} color={"gray.700"} fontSize={"md"}>{user.name}!</Heading>
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

          <Heading color={"gray.500"} fontFamily={"body"} fontSize={'sm'} mt={8} mb={3}>
            Compre produtos variados
          </Heading>
          <Input
            placeholder="Buscar anúncio"
            InputRightElement={
              <HStack h={5} alignItems={"center"}>
                <Pressable>
                  <MagnifyingGlass weight="bold" color={colors.gray[600]} />
                </Pressable>
                <Divider 
                  orientation="vertical"
                  color={"gray.700"}
                  thickness="2"
                  mx={3}
                />
                <Pressable mr={3} onPress={handlePresentModalPress}>
                  <Sliders weight="bold" color={colors.gray[600]} />
                </Pressable>
              </HStack>
            }
          />
          
          <VStack mt={6}>
            {adsPairs.map((ad: any) => (
              <HStack key={ad}>
                <AdCard mr={4} />
                {ad[1] ? <AdCard key={ad[1]} /> : <Box flex={1} />}
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
  )
}