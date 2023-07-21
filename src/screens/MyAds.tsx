import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { Box, CheckIcon, HStack, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function MyAds() {
  const [service, setService] = useState("");
  function handlePressPlus() {
    console.log("Plus clicado")
  }

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
      <Header 
        title="Meus anúncios"
        noBackButton
        iconRight={<Plus size={26} weight="bold" />}
        onPressIconRight={handlePressPlus}
      />

      <HStack mt={6} justifyContent={"space-between"} w={"full"}>
        <Text flex={1} color={"gray.600"} fontSize={'sm'}>9 anúncios</Text>

        <Select selectOptions={['Todos', 'Ativos', 'Inativos']} defaultOption="Todos"/>

      </HStack>
    </VStack>
  )
}