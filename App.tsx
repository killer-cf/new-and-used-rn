import React from "react";
import { Center, NativeBaseProvider, Text } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { theme } from "./src/theme";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
  const [ fontsLoaded ] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        { fontsLoaded && <Routes />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
