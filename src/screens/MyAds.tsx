import { Header } from "@components/Header";
import { Box, CheckIcon, HStack, Select, Text, VStack } from "native-base";
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
        <Text color={"gray.600"} fontSize={'sm'}>9 anúncios</Text>
        <Box maxW="300">
        <Select selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
      </Box>
      </HStack>
    </VStack>
  )
}