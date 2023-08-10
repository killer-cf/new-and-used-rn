import { ReactNode, createContext, useCallback, useMemo, useRef, useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Filters } from '@components/Filters'
import { PaymentMethodsType } from '@dtos/PaymentMethodDTO'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

import { useTheme } from 'native-base'

type ModalContextData = {
  openModal: () => void
  setFilter: (data: FilterParamsData) => void
  filters: FilterParamsData
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData)

type Props = {
  children: ReactNode
}

export type FilterParamsData = {
  is_new: boolean
  accept_trade: boolean
  payment_methods: PaymentMethodsType[]
}

export function FilterModalProvider({children}: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [filters, setFilters] = useState<FilterParamsData>({} as FilterParamsData)

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

  function setFilter(data: FilterParamsData) {
    setFilters(data)
  }

  const { colors } = useTheme()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ModalContext.Provider value={{openModal, setFilter, filters}}>
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
              onSetFilter={setFilter}
              filters={filters}
            />
          </BottomSheetModal>
        </ModalContext.Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}