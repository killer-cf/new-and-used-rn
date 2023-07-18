import { Header } from "@components/Header";
import { VStack } from "native-base";
import { Plus } from "phosphor-react-native";

export function MyAds() {
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
    </VStack>
  )
}