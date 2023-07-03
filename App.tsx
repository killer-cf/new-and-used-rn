import React from "react";
import { Center, NativeBaseProvider, Text } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { theme } from "./src/theme";

export default function App() {
  const [ fontsLoaded ] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} bgColor={"green.300"} alignItems={"center"}>
        { fontsLoaded && <Text>app</Text>}
      </Center>
    </NativeBaseProvider>
  );
}
