import { Box, Heading, IBoxProps, Image, Pressable, Skeleton, Text } from "native-base";

import { Tag } from "./Tag";
import { UserAvatar } from "./UserAvatar";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AdDTO } from "@dtos/AdDTO";
import { formatCurrency } from "@utils/formatCurrency";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { useState } from "react";

type Props = IBoxProps & {
  isAdDisabled?: boolean
  adData: AdDTO
}

export function AdCard({ isAdDisabled = false, adData, ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const { user } = useAuth()
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleGoAdPage() {
    navigation.navigate('ad', { id: adData.id })
  }

  const avatarUrl = adData.user ? `${api.defaults.baseURL}/images/${adData.user.avatar}` : `${api.defaults.baseURL}/images/${user.avatar}`;
  const productImageLoad = `${api.defaults.baseURL}/images/${adData.product_images[0].path}`

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box
      flex={1}
      overflow={"hidden"}
      mb={4}
      {...rest}
    >
      <Pressable w={"full"} onPress={handleGoAdPage}>
        <Image 
          source={{ uri: productImageLoad}}
          onLoad={handleImageLoad}
          alt={`foto do ${adData.name}`}
          w={"full"}
          h={120}    
          rounded={'lg'} 
        />
        {!imageLoaded && 
          <Skeleton position={"absolute"} rounded={"lg"} w={"full"} h={120} bgColor={"gray.400"} zIndex={2}/>
        }
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