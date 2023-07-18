import { Box, IBoxProps, Text } from "native-base";

type Props = IBoxProps & {
  title: 'USADO' | 'NOVO'
}

export function Tag({ title, ...rest }: Props) {
  return (
    <Box 
      bg={title === 'USADO' ? "gray.600": "blue.500"}
      px={2}
      rounded={"full"}
      {...rest}
    >
      <Text fontSize={'xxs'} fontFamily={"body"} color={"white"} textAlign={"center"}>
        {title}
      </Text>
    </Box>
  )
}