import { Header } from "@components/Header";
import { useRoute } from "@react-navigation/native";
import { Center, Text } from "native-base";

type AdFormParams = {
  id: string
  name: string
}

export function AdForm() {
  const route = useRoute()

  const params  = route.params as AdFormParams

  return (
    <Center flex={1}>
      <Header />
      <Text>Ad {params?.id ?? 'nao tem'} </Text>
    </Center>
  )
}