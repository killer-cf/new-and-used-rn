export const formatCurrency = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, '')

  if (numericValue.length === 0) {
    return '0,00'
  }

  const intValue = numericValue.slice(0, -2) || '0'
  const decValue = numericValue.slice(-2).padStart(2, '0')

  const formattedValue = Number(intValue).toLocaleString('pt-BR')

  return `${formattedValue},${decValue}`
}