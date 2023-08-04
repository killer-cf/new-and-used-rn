import { useCallback, useState } from "react";
import { Box, HStack, ScrollView, Text, VStack, useToast } from "native-base";
import { Plus } from "phosphor-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { AdCard } from "@components/AdCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AdDTO } from "@dtos/AdDTO";

export function MyAds() {
  const selectOptions = ['Todos', 'Ativos', 'Inativos']  
  const [ads, setAds] = useState([]) 
  const toast = useToast()
  
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const myAdsPairs: any = []
  for (let i = 0; i < ads.length; i += 2) {
    myAdsPairs.push([ads[i], ads[i + 1]])
  }

  function handlePressPlus() {
    navigation.navigate('ad_form')
  }

  async function fetchAds() {
    try {
      const response = await api.get('/users/products')
      setAds(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os anúncios, tente novamente!'

      toast.show({
        title,
        placement: 'top',
        color: 'red.500'
      })
    }
  }

  useFocusEffect(useCallback(() => {
    fetchAds()
  }, []))

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
          {myAdsPairs.map((ads: AdDTO[]) => (
            <HStack key={ads[0].id}>
              <AdCard adData={ads[0]} mr={4} />
              {ads[1] ? <AdCard adData={ads[1]}/> : <Box flex={1} />}
          </HStack>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  )
}