import { Box, Heading, IBoxProps, Image, Text } from "native-base";

import BikeImg from "@assets/bike.png"

type Props = IBoxProps & {}

export function AdCard({...rest }: Props) {
  return (
    <Box 
      flex={1}
      overflow={"hidden"}
      mb={4}
      {...rest}
    >
      <Box w={"full"}>
        <Image 
          source={BikeImg}
          alt="nome do produto"
          w={"full"}    
          rounded={'lg'} 
        />
      </Box>
      <Text mt={1} color={"gray.600"} fontSize={'sm'} fontFamily={"body"}>Bicicleta</Text>
      <Heading color={"gray.700"} fontSize={'md'} fontFamily={"heading"}>R$ 59,90</Heading>
    </Box>
  )
}