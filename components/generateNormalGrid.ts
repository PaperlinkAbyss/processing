export default function generateNormalGrid() {
  const arrayPosiciones = []
  for (let x = 0; x < 20 * 25; x += 20) {
    for (let y = 0; y < 20 * 25; y += 20) {
      arrayPosiciones.push({ x: x, y: y })
    }
  }
  return arrayPosiciones
}
