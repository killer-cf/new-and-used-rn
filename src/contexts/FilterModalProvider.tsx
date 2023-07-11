import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { Text, View } from 'native-base'
import { ReactNode, createContext, useCallback, useMemo, useRef } from 'react'

type ModalContextData = {
  openModal: () => void
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData)

type Props = {
  children: ReactNode
}

export function FilterModalProvider({children}: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <ModalContext.Provider value={{openModal}}>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
        >
          <View flex={1} alignItems={'center'}  bg={'green.300'} >
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </ModalContext.Provider>
    </BottomSheetModalProvider>
  )
}