import { Box, Heading, IBoxProps, Image, Pressable, Text } from "native-base";

import { Tag } from "./Tag";
import { UserAvatar } from "./UserAvatar";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AdDTO } from "@dtos/AdDTO";
import { formatCurrency } from "@utils/formatCurrency";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";

type Props = IBoxProps & {
  isAdDisabled?: boolean
  adData: AdDTO
}

export function AdCard({ isAdDisabled = false, adData, ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()

  function handleGoAdPage() {
    navigation.navigate('ad')
  }

  const avatarUrl = adData.user ? `${api.defaults.baseURL}/images/${adData.user.avatar}` : `${api.defaults.baseURL}/images/${user.avatar}`;

  return (
    <Box
      flex={1}
      overflow={"hidden"}
      mb={4}
      {...rest}
    >
      <Pressable w={"full"} onPress={handleGoAdPage}>
        <Image 
          source={{ uri: `${api.defaults.baseURL}/images/${adData.product_images[0].path}`}}
          alt={`foto do ${adData.name}`}
          w={"full"}
          h={120}    
          rounded={'lg'} 
        />
        <UserAvatar
          source={{ uri: avatarUrl}}
          siz="xs" 
          position={"absolute"} 
          top={1}
          left={1}
        />
        <Tag 
          title={adData.is_new ? 'NOVO' : 'USADO'} 
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
      <Text mt={1} color={"gray.600"} fontSize={'sm'} fontFamily={"body"}>{adData.name}</Text>
      <Heading color={"gray.700"} fontSize={'md'} fontFamily={"heading"}>R$ {formatCurrency(adData.price.toString())}</Heading>
    </Box>
  )
}