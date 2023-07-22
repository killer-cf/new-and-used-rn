import { Box, HStack, ScrollView, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { AdCard } from "@components/AdCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyAds() {
  const selectOptions = ['Todos', 'Ativos', 'Inativos']  
  const ads = [1,2,3,4,5]
  
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const myAdsPairs: any = []
  for (let i = 0; i < ads.length; i += 2) {
    myAdsPairs.push([ads[i], ads[i + 1]])
  }

  function handlePressPlus() {
    navigation.navigate('ad_form')
  }

  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1} px={6} pt={5} >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50}}>
        <Header 
          title="Meus anúncios"
          noBackButton
          iconRight={<Plus size={26} weight="bold" />}
          onPressIconRight={handlePressPlus}
        />

        <HStack mt={6} justifyContent={"space-between"} w={"full"} alignItems={"center"}>
          <Text flex={1} color={"gray.600"} fontSize={'sm'}>9 anúncios</Text>
          <Select selectOptions={selectOptions} defaultOption="Todos"/>
        </HStack>

        <VStack mt={6}>
          {myAdsPairs.map((ad: any) => (
            <HStack key={ad}>
              <AdCard key={ad[0]} mr={4} />
              {ad[1] ? <AdCard key={ad[1]} /> : <Box flex={1} />}
            </HStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  )
}