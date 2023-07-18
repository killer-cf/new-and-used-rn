import { Box, Image, VStack } from "native-base";

import BikeImg from "@assets/bike.png"
import { Header } from "@components/Header";
import { MultiStep } from "@components/MultiStep";

export function Ad() {
  return (
    <VStack bg={"gray.200"} safeAreaTop flex={1}  >
      <Header px={6} pt={5} mb={3}/>
      <Box
        w={"full"}
        h={'37%'}
      >
        <Image 
          source={BikeImg}
          alt="nome do produto"
          w={"full"}
          h={"full"}
          resizeMode="cover"
          bg={"green.200"}
        />
        <MultiStep size={3} currentStep={1}/>
      </Box>
      
    </VStack>
  )
}