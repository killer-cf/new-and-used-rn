export const formatCurrency = (value: string) => {
  const hasNonNumericCharacter = /[^\d]$/.test(value)
  if (hasNonNumericCharacter) return value.slice(0, -1)

  if (value.length === 1) {
    let newArray = ['0', ',', '0', value]
    return newArray.join('')
  }

  if (value.length >= 2 && value.length <= 5) {
    let [int, dec] = value.replace('.', ',').split(',')

    if (Number(int) === 0 ) {
      dec = String(parseInt(dec))
    }
    if (dec.length === 3) {
      var i = int.split('')
      i.push(String(dec[0]))
      int = String(parseInt(i.join('')))
      dec = dec.substring(1)
    } else if (dec.length < 2){
      var i = int.split('')
      const removeLastFromI = i.pop() as string
      dec = dec = removeLastFromI + dec
      int = i.join('')
      if (int === '') int = '0'
    }
    return int + ',' + dec
  }
  if (value.length >= 6) {
    let [int, dec] = value.replace('.', '').split(',')
    var i = int.split('')
    if (dec.length < 2) {
      const removeLastFromI = i.pop() as string
      dec = dec = removeLastFromI + dec
    } else {
      i.push(String(dec[0]))
      dec = dec.substring(1)
    }
    int = String(parseInt(i.join('')))
    int = Number(int).toLocaleString('pt-BR')

    return int + ',' + dec
  }
}
