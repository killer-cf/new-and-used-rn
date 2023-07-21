import { Box, Heading, IBoxProps, Image, Pressable, Text } from "native-base";

import BikeImg from "@assets/bike.png"
import { Tag } from "./Tag";
import { UserAvatar } from "./UserAvatar";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type Props = IBoxProps & {
  isAdDisabled?: boolean
}

export function AdCard({ isAdDisabled = false, ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoAdPage() {
    navigation.navigate('ad')
  }

  return (
    <Box
      flex={1}
      overflow={"hidden"}
      mb={4}
      {...rest}
    >
      <Pressable w={"full"} onPress={handleGoAdPage}>
        <Image 
          source={BikeImg}
          alt="nome do produto"
          w={"full"}    
          rounded={'lg'} 
        />
        <UserAvatar
          source={{ uri: 'https://github.com/killer-cf.png'}}
          siz="xs" 
          position={"absolute"} 
          top={1}
          left={1}
        />
        <Tag 
          title="USADO" 
          position={"absolute"} 
          right={1}
          top={1} 
        />
        {
          isAdDisabled &&
          <>
            <Box position={"absolute"} w={"full"} h={"full"} bg={"gray.700"} opacity={0.3} />         
            <Text 
              position={"absolute"}
              bottom={1}
              left={1} 
              color={"gray.100"}
              fontFamily={"heading"}
              fontSize={"xs"}
            >
              ANÚNCIO DESATIVADO
            </Text>
          </>  
        }
      </Pressable>
      <Text mt={1} color={"gray.600"} fontSize={'sm'} fontFamily={"body"}>Bicicleta</Text>
      <Heading color={"gray.700"} fontSize={'md'} fontFamily={"heading"}>R$ 59,90</Heading>
    </Box>
  )
}