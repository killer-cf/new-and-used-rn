import { Box, Text } from "native-base";

type Props = {
  title: 'USADO' | 'NOVO'
}

export function Tag({ title }: Props) {
  return (
    <Box 
      position={"absolute"} 
      right={1}
      top={1}
      bg={title === 'USADO' ? "gray.600": "blue.500"}
      px={2}
      rounded={"full"}
    >
      <Text fontSize={'xxs'} fontFamily={"body"} color={"white"}>
        {title}
      </Text>
    </Box>
  )
}