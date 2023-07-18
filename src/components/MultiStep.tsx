import { Box, HStack } from "native-base"

export interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  return (
    <HStack position={"absolute"} bottom={1} zIndex={999} w={"full"} >

        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return <Box key={step} height={1} borderRadius={1} bg={"gray.200"} opacity={currentStep >= step? 0.75 : 0.5} flex={1} mx={1}/>
        })}

    </HStack>
  )
}