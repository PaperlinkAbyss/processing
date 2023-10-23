import ProcessingLayout, { ColorContext, colores } from 'components/ProcessingLayout'
import generateNormalGrid from 'components/generateNormalGrid'
import type { ReactElement } from 'react'
import { useContext, useRef } from 'react'
export default function Page() {
  const rootRef = useRef<HTMLDivElement>(null)
  const colorActual = useContext(ColorContext)
  const arrayPosiciones: { x: number; y: number }[] = generateNormalGrid()

  function changeColor(id: number) {
    const element = document.getElementById(id.toString())
    if (!element) return
    element.style.backgroundColor = colorActual.color
    element.setAttribute('data-color', colorActual.color)
  }

  function generateProcessing() {
    const colorsArr = colores.map(({ color }) => {
      const cells = Array.from(document.querySelectorAll(`[data-color="${color}"]`))

      const coordinates = cells.map((cell) => {
        const x = cell.getAttribute('data-x')
        const y = cell.getAttribute('data-y')
        return [x, y]
      })

      return { color, coordinates }
    })
    let text = ''
    colorsArr.forEach(({ color, coordinates }) => {
      if (color != 'rgb(255,255,255)') {
        text += `fill${color.slice(3)};\n`
        coordinates.forEach(([x, y]) => {
          text += `rect(${x}, ${y}, 20, 20);\n`
        })
      }
    })
    if (rootRef.current) {
      rootRef.current.textContent = text
    }
  }
  return (
    <div>
      <div
        ref={rootRef}
        className='whitespace-pre'
      ></div>
      <button
        className='mx-auto'
        onClick={() => generateProcessing()}
      >
        Click to generate processing
      </button>
      <br></br>
      <div className='content-left mx-auto flex h-[1250px] w-[1250px] flex-wrap'>
        {arrayPosiciones?.map(({ x, y }, indiceArrayPosiciones) => {
          return (
            <>
              <div
                key={indiceArrayPosiciones}
                className={'h-[50px] w-[50px] select-none border border-black text-center '}
                data-y={x}
                data-x={y}
                data-color='rgb(255,255,255)'
                id={`${indiceArrayPosiciones}`}
                onClick={() => {
                  // e.preventDefault()
                  changeColor(indiceArrayPosiciones)
                }}
                onDragStart={() => {
                  changeColor(indiceArrayPosiciones)
                }}
              >
                {indiceArrayPosiciones + 1}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <ProcessingLayout>{page}</ProcessingLayout>
}
