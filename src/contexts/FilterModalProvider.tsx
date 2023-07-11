import { Filters } from '@components/Filters'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheet,
} from '@gorhom/bottom-sheet'
import { useTheme } from 'native-base'
import { ReactNode, createContext, useCallback, useMemo, useRef, useState } from 'react'

type ModalContextData = {
  openModal: () => void
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData)

type Props = {
  children: ReactNode
}

export function FilterModalProvider({children}: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['25%', '72%'], [])

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  function closeModal() {
    bottomSheetModalRef.current?.close()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.7}
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  )

  const { colors } = useTheme()

  return (
    <BottomSheetModalProvider>
      <ModalContext.Provider value={{openModal}}>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: colors.gray[200]}}
          handleIndicatorStyle={{ width: 56, backgroundColor: colors.gray[400], marginTop: 8}}
          style={{ zIndex: 20}}
        >
          <Filters
            onCloseModal={closeModal}
          />
        </BottomSheetModal>
      </ModalContext.Provider>
    </BottomSheetModalProvider>
  )
}